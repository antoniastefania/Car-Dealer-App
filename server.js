const express = require("express");
const bcrypt = require("bcryptjs");
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


// Configurarea conexiunii la SQL Server
const dbConfig = {
    server: "ANTONIA\\SQLEXPRESS",
    database: "CarDealer",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        encrypt: false,
        trustServerCertificate: true,
    },
};

// Conectarea la baza de date
sql.connect(dbConfig)
    .then(() => console.log("Conectat la SQL Server"))
    .catch((err) => console.error("Eroare la conexiunea SQL Server", err));

// Ruta pentru înregistrare
app.post('/register', async (req, res) => {
    const { nume, prenume, telefon, email, adresa, parola } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(parola, 10);
        const pool = await sql.connect(dbConfig);

        await pool.request()
            .input('nume', sql.VarChar(50), nume)
            .input('prenume', sql.VarChar(50), prenume)
            .input('telefon', sql.VarChar(20), telefon)
            .input('email', sql.VarChar(100), email)
            .input('adresa', sql.VarChar(255), adresa)
            .input('parola', sql.VarChar(255), hashedPassword)
            .query(`INSERT INTO Clienti (nume, prenume, telefon, email, adresa, parola)
                    VALUES (@nume, @prenume, @telefon, @email, @adresa, @parola)`);

        res.status(201).json({ message: "Înregistrare reușită! Acum te poți autentifica." });
    } catch (error) {
        console.error("Eroare la înregistrare:", error.message || error);
        res.status(500).json({ message: "A apărut o eroare la înregistrare." });
    }
});

// Ruta pentru autentificare
app.post('/login', async (req, res) => {
    const { email, parola } = req.body;

    try {
        const pool = await sql.connect(dbConfig);

        // Verificare admin
        if (email === 'andreiantonia2003@gmail.com' && parola === 'Andreiantonia.2003') {
            return res.status(200).json({
                message: "Autentificare reușită! Redirecționare către dashboard...",
                redirectTo: "/dashboard"
            });
        }

        // Verificare utilizator obișnuit
        const userQuery = await pool.request()
            .input('email', sql.VarChar(100), email)
            .query('SELECT * FROM Clienti WHERE email = @email');

        if (userQuery.recordset.length === 0) {
            return res.status(404).json({ message: "Cont inexistent. Verifică email-ul sau parola." });
        }

        const user = userQuery.recordset[0];
        const isPasswordValid = await bcrypt.compare(parola, user.parola);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Email sau parolă incorectă." });
        }

        res.status(200).json({
            message: "Autentificare reușită! Redirecționare către home...",
            redirectTo: "/home"
        });
    } catch (error) {
        console.error("Eroare la autentificare:", error.message || error);
        res.status(500).json({ message: "A apărut o eroare la autentificare." });
    }
});
app.get('/view-cars', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(`
            SELECT 
                m.id_masina, 
                ma.denumire AS marca, 
                mo.denumire AS model, 
                m.an_fabricatie, 
                m.pret, 
                m.kilometraj, 
                m.status,
                m.descriere,
                f.calea_fisierului AS url
            FROM Masini m
            INNER JOIN Marca ma ON m.id_marca = ma.id_marca
            INNER JOIN Model mo ON m.id_model = mo.id_model
            LEFT JOIN Fotografii f ON f.id_masina = m.id_masina;
        `);

        const cars = result.recordset;
        console.log(cars);
        res.json(cars);

    } catch (error) {
        console.error("Eroare la încărcarea mașinilor:", error.message || error);
        res.status(500).json({ message: "A apărut o eroare la încărcarea mașinilor." });
    }
});
// Ruta pentru a obține datele clienților
app.get('/view-customers', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT TOP (1000) [id_client], [nume], [prenume], [telefon], [email], [adresa], [parola] FROM [CarDealer].[dbo].[Clienti]');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching customers:', err);
        res.status(500).send('Server Error');
    }
});


// Ruta pentru a obține datele angajaților
app.get('/view-employees', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT [id_angajat], [nume], [prenume], [functie], [parola] FROM [CarDealer].[dbo].[Angajati]');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).send('Server Error');
    }
});

// Ruta pentru a obține datele vânzărilor
app.get('/view-sales', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const query = `
            SELECT 
                v.id_vanzare,
                ma.denumire AS marca,
                mo.denumire AS model,
                c.nume AS nume_client,
                c.prenume AS prenume_client,
                a.nume AS nume_angajat,
                a.prenume AS prenume_angajat,
                v.data_vanzare,
                v.pret_final
            FROM Vanzari v
            INNER JOIN Masini m ON v.id_masina = m.id_masina
            INNER JOIN Marca ma ON m.id_marca = ma.id_marca
            INNER JOIN Model mo ON m.id_model = mo.id_model
            INNER JOIN Clienti c ON v.id_client = c.id_client
            INNER JOIN Angajati a ON v.id_angajat = a.id_angajat;
        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching sales:', err);
        res.status(500).send('Server Error');
    }
});




//Adauga masina
app.post('/add-car', async (req, res) => {
    const { marca, model, anFabricatie, pret, kilometraj, descriere, fotografii } = req.body;

    // Verificăm dacă toate câmpurile obligatorii sunt completate
    if (!marca || !model || !anFabricatie || !pret || !kilometraj || !descriere || !fotografii) {
        return res.status(400).json({ message: "Toate câmpurile sunt obligatorii!" });
    }

    // Transformăm string-ul de fotografii într-un array de URL-uri
    const photoPaths = fotografii.split(',').map(path => path.trim());

    if (!Array.isArray(photoPaths) || photoPaths.length === 0) {
        return res.status(400).json({ message: "Nu au fost furnizate fotografii valide." });
    }

    let idMarca, idModel, idMasina;

    try {
        const pool = await sql.connect(dbConfig);

        // Verificăm dacă marca există deja
        const marcaResult = await pool.request()
            .input('denumire', sql.VarChar(50), marca)
            .query(`SELECT id_marca FROM Marca WHERE denumire = @denumire`);

        if (marcaResult.recordset.length > 0) {
            idMarca = marcaResult.recordset[0].id_marca; // Folosim id_marca existent
        } else {
            // Adăugare marcă
            const insertMarcaResult = await pool.request()
                .input('denumire', sql.VarChar(50), marca)
                .query(`INSERT INTO Marca (denumire) OUTPUT INSERTED.id_marca VALUES (@denumire)`);
            idMarca = insertMarcaResult.recordset[0].id_marca; // Obținem id_marca nou
        }

        // Verificăm dacă modelul există deja
        const modelResult = await pool.request()
            .input('id_marca', sql.Int, idMarca)
            .input('denumire', sql.VarChar(50), model)
            .query(`SELECT id_model FROM Model WHERE id_marca = @id_marca AND denumire = @denumire`);

        if (modelResult.recordset.length > 0) {
            idModel = modelResult.recordset[0].id_model; // Folosim id_model existent
        } else {
            // Adăugare model
            const insertModelResult = await pool.request()
                .input('id_marca', sql.Int, idMarca)
                .input('denumire', sql.VarChar(50), model)
                .query(`INSERT INTO Model (id_marca, denumire) OUTPUT INSERTED.id_model VALUES (@id_marca, @denumire)`);
            idModel = insertModelResult.recordset[0].id_model; // Obținem id_model nou
        }

        // Adăugare mașină
        const masinaResult = await pool.request()
            .input('id_marca', sql.Int, idMarca)
            .input('id_model', sql.Int, idModel)
            .input('an_fabricatie', sql.Int, anFabricatie)
            .input('pret', sql.Decimal(10, 2), pret)
            .input('kilometraj', sql.Int, kilometraj)
            .input('status', sql.VarChar(50), 'disponibila')
            .input('descriere', sql.VarChar(4000), descriere)
            .query(`INSERT INTO Masini (id_marca, id_model, an_fabricatie, pret, kilometraj, status, descriere)
                    OUTPUT INSERTED.id_masina VALUES (@id_marca, @id_model, @an_fabricatie, @pret, @kilometraj, @status, @descriere)`);
        idMasina = masinaResult.recordset[0].id_masina;

        // Inserarea fotografiilor
        for (const url of photoPaths) {
            if (url) {
                try {
                    console.log(`Inserăm fotografia pentru URL-ul: ${url}`);
                    const result = await pool.request()
                        .input('id_masina', sql.Int, idMasina)
                        .input('calea_fisierului', sql.VarChar(4000), url)
                        .query(`
                            INSERT INTO Fotografii (id_masina, calea_fisierului) 
                            VALUES (@id_masina, @calea_fisierului)`);
                    
                    if (result.recordset && result.recordset.length > 0) {
                        console.log(`Fotografie adăugată cu succes: ${url}`);
                    } else {
                        console.error(`Eroare: ID-ul fotografiei nu a fost returnat pentru ${url}`);
                    }
                } catch (error) {
                    console.error(`Eroare la inserția fotografiei ${url}:`, error.message);
                    res.status(500).json({ message: `Eroare la inserția fotografiei ${url}: ${error.message}` });
                    return;
                }
            } else {
                console.log(`URL-ul fotografiei este invalid: ${url}`);
            }
        }

        res.status(201).json({ message: "Mașina și fotografiile au fost adăugate cu succes!", idMasina });
    } catch (error) {
        console.error("Eroare generală la adăugarea mașinii:", error.message || error);
        res.status(500).json({ message: `A apărut o eroare: ${error.message}` });
    }
});


//Sterge masina
app.delete('/delete-car/:id', async (req, res) => {
        const { id } = req.params;
    
        try {
            const pool = await sql.connect(dbConfig);
    
            // Începe o tranzacție
            const transaction = new sql.Transaction(pool);
            await transaction.begin();
    
            try {
                // Obține id_model și id_marca înainte de a șterge înregistrarea
                const masinaData = await transaction.request()
                    .input('id_masina', sql.Int, id)
                    .query('SELECT id_model, id_marca FROM Masini WHERE id_masina = @id_masina');
    
                if (masinaData.recordset.length === 0) {
                    await transaction.rollback();
                    return res.status(404).json({ message: 'Mașina nu a fost găsită.' });
                }
    
                const { id_model, id_marca } = masinaData.recordset[0];
    
                // Șterge fotografiile asociate
                await transaction.request()
                    .input('id_masina', sql.Int, id)
                    .query('DELETE FROM Fotografii WHERE id_masina = @id_masina');
    
                // Șterge vânzările asociate
                await transaction.request()
                    .input('id_masina', sql.Int, id)
                    .query('DELETE FROM Vanzari WHERE id_masina = @id_masina');
    
                // Șterge înregistrarea mașinii
                await transaction.request()
                    .input('id_masina', sql.Int, id)
                    .query('DELETE FROM Masini WHERE id_masina = @id_masina');
    
                // Verifică dacă modelul este asociat cu alte mașini
                const modelExists = await transaction.request()
                    .input('id_model', sql.Int, id_model)
                    .query('SELECT COUNT(*) as count FROM Masini WHERE id_model = @id_model');
                if (modelExists.recordset[0].count === 0) {
                    // Șterge modelul dacă nu mai este asociat cu nicio mașină
                    await transaction.request()
                        .input('id_model', sql.Int, id_model)
                        .query('DELETE FROM Model WHERE id_model = @id_model');
                }
    
                // Verifică dacă marca este asociată cu alte mașini
                const marcaExists = await transaction.request()
                    .input('id_marca', sql.Int, id_marca)
                    .query('SELECT COUNT(*) as count FROM Masini WHERE id_marca = @id_marca');
                if (marcaExists.recordset[0].count === 0) {
                    // Șterge marca dacă nu mai este asociată cu nicio mașină
                    await transaction.request()
                        .input('id_marca', sql.Int, id_marca)
                        .query('DELETE FROM Marca WHERE id_marca = @id_marca');
                }
    
                // Finalizează tranzacția
                await transaction.commit();
                res.status(200).json({ message: 'Mașina și toate referințele asociate au fost șterse cu succes.' });
    
            } catch (error) {
                // Dacă apare o eroare, face rollback la tranzacție
                await transaction.rollback();
                console.error('Eroare la ștergerea mașinii:', error);
                res.status(500).json({ message: 'Nu s-a putut șterge mașina.', error: error.message });
            }
        } catch (error) {
            console.error('Eroare la conectarea la baza de date:', error);
            res.status(500).json({ message: 'Eroare de conectare la baza de date.', error: error.message });
        }
    });
    




//Sterge client
    app.delete('/delete-customer/:id', async (req, res) => {
        const { id } = req.params;
        
        try {
            const pool = await sql.connect(dbConfig);
    
            // Începe o tranzacție
            const transaction = new sql.Transaction(pool);
            await transaction.begin();
    
            try {
    
                // Șterge clientul
                await transaction.request()
                    .input('id_client', sql.Int, id)
                    .query('DELETE FROM Clienti WHERE id_client = @id_client');
    
                // Finalizează tranzacția
                await transaction.commit();
                res.status(200).json({ message: 'Clientul și toate referințele asociate au fost șterse cu succes.' });
    
            } catch (error) {
                // Dacă apare o eroare, face rollback la tranzacție
                await transaction.rollback();
                console.error('Eroare la ștergerea clientului:', error);
                res.status(500).json({ message: 'Nu s-a putut șterge clientul.', error: error.message });
            }
    
        } catch (error) {
            console.error('Eroare la conectarea la baza de date:', error);
            res.status(500).json({ message: 'Eroare de conectare la baza de date.', error: error.message });
        }
    });
    



    //Sterge angajat
    app.delete('/delete-employee/:id', async (req, res) => {
        const { id } = req.params;
        
        try {
            const pool = await sql.connect(dbConfig);
    
            // Începe o tranzacție
            const transaction = new sql.Transaction(pool);
            await transaction.begin();
    
            try {
    
                // Șterge angajatul
                await transaction.request()
                    .input('id_angajat', sql.Int, id)
                    .query('DELETE FROM Angajati WHERE id_angajat = @id_angajat');
    
                // Finalizează tranzacția
                await transaction.commit();
                res.status(200).json({ message: 'Angajatul și toate referințele asociate au fost șterse cu succes.' });
    
            } catch (error) {
                // Dacă apare o eroare, face rollback la tranzacție
                await transaction.rollback();
                console.error('Eroare la ștergerea angajatului:', error);
                res.status(500).json({ message: 'Nu s-a putut șterge angajatul.', error: error.message });
            }
    
        } catch (error) {
            console.error('Eroare la conectarea la baza de date:', error);
            res.status(500).json({ message: 'Eroare de conectare la baza de date.', error: error.message });
        }
    });
    



   //Preia datele masinii
    app.get('/get-car/:id', async (req, res) => {
        const { id } = req.params;
    
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query(`
                    SELECT 
                        m.id_masina, 
                        ma.denumire AS marca, 
                        mo.denumire AS model, 
                        m.an_fabricatie, 
                        m.pret, 
                        m.kilometraj, 
                        m.status, 
                        m.descriere,
                        f.calea_fisierului AS url
                    FROM Masini m
                    INNER JOIN Marca ma ON m.id_marca = ma.id_marca
                    INNER JOIN Model mo ON m.id_model = mo.id_model
                    LEFT JOIN Fotografii f ON f.id_masina = m.id_masina
                    WHERE m.id_masina = @id;

                `);
    
            if (result.recordset.length === 0) {
                return res.status(404).json({ message: "Mașina nu a fost găsită." });
            }
    
            res.json(result.recordset[0]);
        } catch (error) {
            console.error("Eroare la preluarea mașinii:", error.message || error);
            res.status(500).json({ message: "A apărut o eroare la preluarea mașinii." });
        }
    });
    


    app.put('/edit-car/:id', async (req, res) => {
        const { id } = req.params;
        const {an_fabricatie, pret, kilometraj, status, descriere, url } = req.body;
    
        try {
            const pool = await sql.connect(dbConfig);
    
            // Începe tranzacția pentru a asigura consistența datelor
            const transaction = new sql.Transaction(pool);
            await transaction.begin();
    
            try {
    
                // Actualizează tabelul Masini
                await transaction.request()
                    .input('id_masina', sql.Int, id)
                    .input('an_fabricatie', sql.Int, an_fabricatie)
                    .input('pret', sql.Decimal(10, 2), pret)
                    .input('kilometraj', sql.Int, kilometraj)
                    .input('status', sql.NVarChar, status)
                    .input('descriere', sql.NVarChar, descriere)
                    .query(`
                        UPDATE Masini
                        SET 
                            an_fabricatie = @an_fabricatie,
                            pret = @pret,
                            kilometraj = @kilometraj,
                            status = @status,
                            descriere = @descriere
                        WHERE id_masina = @id_masina;
                    `);
    
                // Actualizează tabelul Fotografii (opțional, pentru URL)
                if (url) {
                    await transaction.request()
                        .input('id_masina', sql.Int, id)
                        .input('calea_fisierului', sql.NVarChar, url)
                        .query(`
                            UPDATE Fotografii
                            SET calea_fisierului = @calea_fisierului
                            WHERE id_masina = @id_masina;
                        `);
                }
    
                // Confirmă tranzacția
                await transaction.commit();
    
                res.status(200).json({ message: 'Mașina și detaliile asociate au fost actualizate cu succes!' });
            } catch (error) {
                await transaction.rollback();
                console.error('Eroare în tranzacție:', error.message || error);
                res.status(500).json({ message: 'A apărut o eroare la actualizarea mașinii și a detaliilor asociate.' });
            }
        } catch (error) {
            console.error('Eroare la conectarea cu baza de date:', error.message || error);
            res.status(500).json({ message: 'A apărut o eroare la conectarea cu baza de date.' });
        }
    });
    


// Ruta pentru a actualiza datele unui client
app.put('/edit-customer/:id', async (req, res) => {
    const { id } = req.params;
    const { nume, prenume, telefon, email, adresa, parola } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id_client', sql.Int, id)
            .input('nume', sql.NVarChar, nume)
            .input('prenume', sql.NVarChar, prenume)
            .input('telefon', sql.NVarChar, telefon)
            .input('email', sql.NVarChar, email)
            .input('adresa', sql.NVarChar, adresa)
            .input('parola', sql.NVarChar, parola)
            .query(`
                UPDATE [CarDealer].[dbo].[Clienti]
                SET 
                    [nume] = @nume,
                    [prenume] = @prenume,
                    [telefon] = @telefon,
                    [email] = @email,
                    [adresa] = @adresa,
                    [parola] = @parola
                WHERE [id_client] = @id_client
            `);
        
        res.status(200).json({ message: 'Client actualizat cu succes' });
    } catch (err) {
        console.error('Error updating customer:', err);
        res.status(500).send('Server Error');
    }
});


// Ruta pentru actualizarea datelor unui angajat
app.put('/edit-employee/:id', async (req, res) => {
    const { id } = req.params;
    const { nume, prenume, functie, parola } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('id_angajat', sql.Int, id)
            .input('nume', sql.NVarChar, nume)
            .input('prenume', sql.NVarChar, prenume)
            .input('functie', sql.NVarChar, functie)
            .input('parola', sql.NVarChar, parola)
            .query(`
                UPDATE [CarDealer].[dbo].[Angajati]
                SET nume = @nume, prenume = @prenume, functie = @functie, parola = @parola
                WHERE id_angajat = @id_angajat
            `);
        res.send('Angajat actualizat cu succes.');
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).send('Server Error');
    }
});


// Ruta pentru actualizarea datelor unei vânzări
app.put('/edit-sale/:id', async (req, res) => {
    const { id } = req.params; // ID-ul vânzării din URL
    const {
        marca,
        model,
        nume_client,
        prenume_client,
        nume_angajat,
        prenume_angajat,
        data_vanzare,
        pret_final,
    } = req.body;

    try {
        const pool = await sql.connect(dbConfig);

        // 1. Actualizează vânzarea în tabelul Vanzari
        await pool.request()
            .input('id_vanzare', sql.Int, id)  // ID-ul vânzării
            .input('data_vanzare', sql.Date, data_vanzare)  // Data vânzării
            .input('pret_final', sql.Decimal(10, 2), pret_final)  // Prețul final
            .query(`
                UPDATE [CarDealer].[dbo].[Vanzari]
                SET 
                    data_vanzare = @data_vanzare,
                    pret_final = @pret_final
                WHERE id_vanzare = @id_vanzare
            `);

        // 2. Actualizează clientul (dacă numele sau prenumele clientului au fost modificate)
        if (nume_client || prenume_client) {
            await pool.request()
                .input('id_vanzare', sql.Int, id)
                .input('nume_client', sql.NVarChar, nume_client)
                .input('prenume_client', sql.NVarChar, prenume_client)
                .query(`
                    UPDATE [CarDealer].[dbo].[Clienti]
                    SET 
                        nume = @nume_client,
                        prenume = @prenume_client
                    WHERE id_client IN (
                        SELECT id_client
                        FROM [CarDealer].[dbo].[Vanzari]
                        WHERE id_vanzare = @id_vanzare
                    )
                `);
        }

        // 3. Actualizează angajatul (dacă numele sau prenumele angajatului au fost modificate)
        if (nume_angajat || prenume_angajat) {
            await pool.request()
                .input('id_vanzare', sql.Int, id)
                .input('nume_angajat', sql.NVarChar, nume_angajat)
                .input('prenume_angajat', sql.NVarChar, prenume_angajat)
                .query(`
                    UPDATE [CarDealer].[dbo].[Angajati]
                    SET 
                        nume = @nume_angajat,
                        prenume = @prenume_angajat
                    WHERE id_angajat IN (
                        SELECT id_angajat
                        FROM [CarDealer].[dbo].[Vanzari]
                        WHERE id_vanzare = @id_vanzare
                    )
                `);
        }

        // 4. Actualizează mașina (dacă marca, modelul sau prețul final au fost modificate)
        if (marca || model || pret_final) {
            // Găsește id-ul mărcii
            const marcaResult = await pool.request()
                .input('marca', sql.NVarChar, marca)
                .query(`
                    SELECT id_marca
                    FROM [CarDealer].[dbo].[Marca]
                    WHERE denumire = @marca
                `);

            // Găsește id-ul modelului
            const modelResult = await pool.request()
                .input('model', sql.NVarChar, model)
                .query(`
                    SELECT id_model
                    FROM [CarDealer].[dbo].[Model]
                    WHERE denumire = @model
                `);

            if (marcaResult.recordset.length > 0 && modelResult.recordset.length > 0) {
                const idMarca = marcaResult.recordset[0].id_marca;
                const idModel = modelResult.recordset[0].id_model;

                await pool.request()
                    .input('id_vanzare', sql.Int, id)  // ID-ul vânzării
                    .input('id_marca', sql.Int, idMarca)  // ID-ul mărcii
                    .input('id_model', sql.Int, idModel)  // ID-ul modelului
                    .input('pret_final', sql.Decimal(10, 2), pret_final)  // Prețul final
                    .query(`
                        UPDATE [CarDealer].[dbo].[Masini]
                        SET 
                            id_marca = @id_marca,
                            id_model = @id_model,
                            pret = @pret_final
                        WHERE id_masina IN (
                            SELECT id_masina
                            FROM [CarDealer].[dbo].[Vanzari]
                            WHERE id_vanzare = @id_vanzare
                        )
                    `);
            }
        }

        res.send('Vânzare actualizată cu succes!');
    } catch (err) {
        console.error('Error updating sale:', err);
        res.status(500).send('Eroare la actualizarea vânzării.');
    }
});




//Adauga vanzare
app.post('/add-sale', async (req, res) => {
    const { marca, model, numeClient, prenumeClient, numeAngajat, prenumeAngajat, dataVanzare, pretFinal } = req.body;

    try {
        const pool = await sql.connect(dbConfig);

        // Verificăm dacă mașina există și este disponibilă
        const masinaQuery = `
            SELECT id_masina FROM Masini m
            INNER JOIN Marca ma ON m.id_marca = ma.id_marca
            INNER JOIN Model mo ON m.id_model = mo.id_model
            WHERE ma.denumire = @marca AND mo.denumire = @model AND m.status != 'vanduta';
        `;
        const masinaResult = await pool.request()
            .input('marca', sql.VarChar, marca)
            .input('model', sql.VarChar, model)
            .query(masinaQuery);

        if (masinaResult.recordset.length === 0) {
            return res.status(400).send('Mașina nu este disponibilă!');
        }

        const idMasina = masinaResult.recordset[0].id_masina;

        // Adăugăm vânzarea
        const addSaleQuery = `
            INSERT INTO Vanzari (id_masina, id_client, id_angajat, data_vanzare, pret_final)
            VALUES (
                @idMasina,
                (SELECT id_client FROM Clienti WHERE nume = @numeClient AND prenume = @prenumeClient),
                (SELECT id_angajat FROM Angajati WHERE nume = @numeAngajat AND prenume = @prenumeAngajat),
                @dataVanzare,
                @pretFinal
            );
        `;
        await pool.request()
            .input('idMasina', sql.Int, idMasina)
            .input('numeClient', sql.VarChar, numeClient)
            .input('prenumeClient', sql.VarChar, prenumeClient)
            .input('numeAngajat', sql.VarChar, numeAngajat)
            .input('prenumeAngajat', sql.VarChar, prenumeAngajat)
            .input('dataVanzare', sql.Date, dataVanzare)
            .input('pretFinal', sql.Money, pretFinal)
            .query(addSaleQuery);

        // Actualizăm statusul mașinii
        const updateMasinaQuery = `UPDATE Masini SET status = 'vanduta' WHERE id_masina = @idMasina;`;
        await pool.request().input('idMasina', sql.Int, idMasina).query(updateMasinaQuery);

        res.send('Vânzare adăugată cu succes!');
    } catch (err) {
        console.error('Error adding sale:', err);
        res.status(500).send('Server Error');
    }
});





// Ruta pentru ștergerea unei vânzări
app.delete('/delete-sale/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(dbConfig);

        // Găsim ID-ul mașinii asociat cu vânzarea
        const findCarQuery = `SELECT id_masina FROM Vanzari WHERE id_vanzare = @id_vanzare`;
        const carResult = await pool.request()
            .input('id_vanzare', sql.Int, id)
            .query(findCarQuery);

        if (carResult.recordset.length === 0) {
            return res.status(404).send('Vânzarea nu a fost găsită.');
        }

        const carId = carResult.recordset[0].id_masina;

        // Ștergem înregistrarea din tabelul Vanzari
        const deleteSaleQuery = `DELETE FROM Vanzari WHERE id_vanzare = @id_vanzare`;
        await pool.request()
            .input('id_vanzare', sql.Int, id)
            .query(deleteSaleQuery);

        // Actualizăm statusul mașinii
        const updateCarStatusQuery = `UPDATE Masini SET status = 'disponibila' WHERE id_masina = @id_masina`;
        await pool.request()
            .input('id_masina', sql.Int, carId)
            .query(updateCarStatusQuery);

        res.send('Vânzarea a fost ștearsă cu succes.');
    } catch (err) {
        console.error('Error deleting sale:', err);
        res.status(500).send('Server Error');
    }
});

//Adauga client
app.post('/add-customer', async (req, res) => {
    const { nume, prenume, telefon, email, adresa, parola } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('nume', sql.VarChar, nume)
            .input('prenume', sql.VarChar, prenume)
            .input('telefon', sql.VarChar, telefon)
            .input('email', sql.VarChar, email)
            .input('adresa', sql.VarChar, adresa)
            .input('parola', sql.VarChar, parola)
            .query(`INSERT INTO Clienti (nume, prenume, telefon, email, adresa, parola)
                    VALUES (@nume, @prenume, @telefon, @email, @adresa, @parola)`);

        res.status(200).send({ message: 'Client adăugat cu succes!' });
    } catch (err) {
        console.error('Error adding customer:', err);
        res.status(500).send({ message: 'Eroare la adăugarea clientului.' });
    }
});


//Adauga angajat
// Ruta pentru adăugarea unui angajat
app.post('/add-employee', async (req, res) => {
    const { nume, prenume, functie, parola } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        await pool
            .request()
            .input('nume', sql.VarChar, nume)
            .input('prenume', sql.VarChar, prenume)
            .input('functie', sql.VarChar, functie)
            .input('parola', sql.VarChar, parola)
            .query('INSERT INTO Angajati (nume, prenume, functie, parola) VALUES (@nume, @prenume, @functie, @parola)');
        res.status(201).send({ message: 'Angajat adăugat cu succes!' });
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).send({ message: 'Server Error' });
    }
});







//Statistici

// Ruta pentru a obține marca cu cele mai multe vânzări
app.get('/api/masina-populara', async (req, res) => {
    try {
        const pool = await sql.connect(/* Configurarea conexiunii tale */);
        const result = await pool.request().query(`
            SELECT Ma.denumire AS Marca, COUNT(V.id_vanzare) AS TotalVanzari
            FROM Marca Ma
            JOIN Masini M ON Ma.id_marca = M.id_marca
            JOIN Vanzari V ON M.id_masina = V.id_masina
            GROUP BY Ma.denumire
            HAVING COUNT(V.id_vanzare) = (
                SELECT MAX(TotalVanzari)
                FROM (
                    SELECT COUNT(V2.id_vanzare) AS TotalVanzari
                    FROM Marca Ma2
                    JOIN Masini M2 ON Ma2.id_marca = M2.id_marca
                    JOIN Vanzari V2 ON M2.id_masina = V2.id_masina
                    GROUP BY Ma2.denumire
                ) AS SubQuery
            )
        `);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).send('Error fetching data');
    }
});


app.get('/api/masini-disponibile', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(`
            SELECT M.id_masina, Ma.denumire AS Marca, Mo.denumire AS Model, M.an_fabricatie, M.pret, M.kilometraj
            FROM Masini M
            JOIN Marca Ma ON M.id_marca = Ma.id_marca
            JOIN Model Mo ON M.id_model = Mo.id_model
            WHERE M.status = 'disponibila'

        `);

        const cars = result.recordset;
        res.json(cars);
    } catch (error) {
        console.error("Eroare la încărcarea mașinilor:", error.message || error);
        res.status(500).json({ message: "A apărut o eroare la încărcarea mașinilor." });
    }
});




app.get('/api/masini-vandute', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(`
            SELECT M.id_masina, Ma.denumire AS Marca, Mo.denumire AS Model, M.an_fabricatie, M.pret, M.kilometraj
            FROM Masini M
            JOIN Marca Ma ON M.id_marca = Ma.id_marca
            JOIN Model Mo ON M.id_model = Mo.id_model
            WHERE M.status = 'vanduta'

        `);

        const cars = result.recordset;
        res.json(cars);
    } catch (error) {
        console.error("Eroare la încărcarea mașinilor:", error.message || error);
        res.status(500).json({ message: "A apărut o eroare la încărcarea mașinilor." });
    }
});


//Statistici angajati

app.get('/api/angajatii-care-au-vandut', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(`
            SELECT A.nume, A.prenume, COUNT(V.id_vanzare) AS TotalVanzari 
            FROM Angajati A 
            JOIN Vanzari V ON A.id_angajat = V.id_angajat 
            GROUP BY A.nume, A.prenume
            ORDER BY TotalVanzari desc
        `);

        console.log(result.recordset);  // Adăugăm un log pentru a verifica datele returnate
        res.json(result.recordset);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Server error');
    }
});

app.get('/api/angajatii-care-au-vandut-mai-mult-decat-media', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(`
            SELECT A.nume, A.prenume, Ma.denumire AS marca, Mo.denumire AS model, 
            AVG(V.pret_final) AS MediaPreturilor, V.pret_final
            FROM Angajati A 
            JOIN Vanzari V ON A.id_angajat = V.id_angajat
            JOIN Masini M ON V.id_masina = M.id_masina
            JOIN Marca Ma ON Ma.id_marca = M.id_marca
            JOIN Model Mo ON Mo.id_model = M.id_model
            GROUP BY A.nume, A.prenume, Ma.denumire, Mo.denumire, V.pret_final
            HAVING V.pret_final > (SELECT AVG(pret_final) FROM Vanzari)



        `);

        console.log(result.recordset);  // Adăugăm un log pentru a verifica datele returnate
        res.json(result.recordset);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Server error');
    }
});






//Statistici clienti

app.get('/client-stats', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const query = `
            SELECT 
                c.nume AS nume_client,
                c.prenume AS prenume_client,
                ma.denumire AS marca,
                mo.denumire AS model,
                v.pret_final
            FROM Vanzari v
            INNER JOIN Clienti c ON v.id_client = c.id_client
            INNER JOIN Masini m ON v.id_masina = m.id_masina
            INNER JOIN Marca ma ON m.id_marca = ma.id_marca
            INNER JOIN Model mo ON m.id_model = mo.id_model
            ORDER BY v.pret_final DESC; -- Sortăm descrescător după pret_final
        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching client stats:', err);
        res.status(500).send('Server Error');
    }
});


app.get('/api/statistici-clienti', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const query = `
            SELECT 
                C.nume, 
                C.prenume, 
                Mo.denumire AS model, 
                Ma.denumire AS marca, 
                V.pret_final, 
                (SELECT AVG(pret_final) FROM Vanzari) AS media_preturilor
            FROM Vanzari V
            JOIN Clienti C ON V.id_client = C.id_client
            JOIN Masini M ON V.id_masina = M.id_masina
            JOIN Marca Ma ON M.id_marca = Ma.id_marca
            JOIN Model Mo ON M.id_model = Mo.id_model
            WHERE V.pret_final > (SELECT AVG(pret_final) FROM Vanzari)
        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Server error');
    }
});


// Ruta pentru a obține clientul cu cele mai multe achiziții
app.get('/clientul-cu-cele-mai-multe-achizitii', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const query = `
        SELECT C.nume, C.prenume, Achizitii.TotalVanzari
        FROM Clienti C
        JOIN (
          SELECT id_client, COUNT(*) AS TotalVanzari
          FROM Vanzari
          GROUP BY id_client
          HAVING COUNT(*) = (
            SELECT MAX(NumarVanzari)
            FROM (
              SELECT COUNT(*) AS NumarVanzari
              FROM Vanzari
              GROUP BY id_client
            ) AS SubQuery
          )
        ) AS Achizitii
        ON C.id_client = Achizitii.id_client;
      `;
  
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (error) {
      console.error('Eroare la conectarea la baza de date:', error);
      res.status(500).json({ message: 'A apărut o eroare la procesarea cererii.' });
    }
  });





  // Cautari

  app.get('/marci', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const query = 'SELECT * FROM Marca';
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la preluarea mărcilor' });
    }
});






app.listen(5000, () => {
    console.log('Serverul rulează pe http://localhost:5000');
});