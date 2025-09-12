// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<CategoryPage />} />
            <Route path="category/:category" element={<CategoryPage />} />
            <Route
              path="about"
              element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold">About Us</h1>
                  <p>Coming soon...</p>
                </div>
              }
            />
            <Route
              path="contact"
              element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Contact</h1>
                  <p>Coming soon...</p>
                </div>
              }
            />
            <Route
              path="blog"
              element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Blog</h1>
                  <p>Coming soon...</p>
                </div>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
