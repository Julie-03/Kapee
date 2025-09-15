// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import './App.css';
import LoginPage from './components/login';
import RegistarationForm from './components/RegisterForm';
import ContactPage from './components/Contact';

// Dashboard
import Dashboard from './dashboardComponents/Dashboard';
import Orders from './dashboardComponents/Orders';
import Products from './dashboardComponents/Products';
import Customers from './dashboardComponents/Customers';
import Reports from './dashboardComponents/Reports';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public site layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<CategoryPage />} />
            <Route path="category/:category" element={<CategoryPage />} />
            <Route
              path="about"
              element={
                <div className="flex justify-center items-center min-h-screen">
                 <h1 className="text-2xl font-bold">About Us</h1>
                </div>
              }
            />
            <Route path="contact" element={<ContactPage />} />
            <Route
              path="blog"
              element={
                <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-2xl font-bold">Blog</h1>
                </div>
              }
            />
          </Route>

          {/* Auth pages (outside Layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistarationForm />} />

          {/* Admin dashboard (nested) */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<h2>Welcome to Kapee Admin</h2>} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
