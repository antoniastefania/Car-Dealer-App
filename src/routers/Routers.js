import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from '../pages/Dashboard';
import ViewCars from "../pages/ViewCars";
import ViewCustomers from '../pages/ViewCustomers'; 
import ViewEmployees from '../pages/ViewEmployees'; 
import ViewSales from '../pages/ViewSales';
import AddCar from '../pages/AddCar';
import EditCar from '../pages/EditCar';
import AddSale from '../pages/AddSale';
import AddCustomer from '../pages/AddCustomer';
import AddEmployee from '../pages/AddEmployee';
import EditCustomer from '../pages/EditCustomer';
import EditEmployee from '../pages/EditEmployee';
import EditSale from '../pages/EditSale';
import StatisticiMasini from '../pages/StatisticiMasini';
import StatisticiClienti from '../pages/StatisticiClienti';
import StatisticiAngajati from '../pages/StatisticiAngajati';
import StatisticiVanzari from '../pages/StatisticiVanzari';






const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/view-cars" element={<ViewCars />} />  
      <Route path="/view-customers" element={<ViewCustomers />} />
      <Route path="/view-employees" element={<ViewEmployees />} />
      <Route path="/view-sales" element={<ViewSales />} />
      <Route path="/add-car" element={<AddCar />} />
      <Route path="/edit-car/:id" element={<EditCar />} />
      <Route path="/add-sale" element={<AddSale />} />
      <Route path="/add-customer" element={<AddCustomer />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/edit-customer/:id" element={<EditCustomer />} />
      <Route path="/edit-employee/:id" element={<EditEmployee />} />
      <Route path="/edit-sale/:id" element={<EditSale />} />
      <Route path="/statistici-masini" element={<StatisticiMasini />} />
      <Route path="/statistici-clienti" element={<StatisticiClienti />} />
      <Route path="/statistici-angajati" element={<StatisticiAngajati />} />
      <Route path="/statistici-vanzari" element={<StatisticiVanzari />} />
      
  

      
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;