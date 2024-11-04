// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Project from './components/Project';
import Links from './components/Links';
import Simulation from './components/Simulation';
import MapClusters from './components/Map_clusters';  // Importing the MapClusters component
import './App.css';

function App() {
    return (
        <Router>
            <div>
                {/* Navigation Bar */}
                <div className="navbar">
                    <div className="navbar-left">
                        <h2 className="navbar-name">Nafisat Ibrahim</h2>
                    </div>
                    <h1 className="navbar-title">Real Estate Prediction</h1>
                    <ul className="nav-links">
                        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
                        <li><NavLink to="/project" className={({ isActive }) => (isActive ? 'active' : '')}>Project</NavLink></li>
                        <li><NavLink to="/links" className={({ isActive }) => (isActive ? 'active' : '')}>Links</NavLink></li>
                        <li><NavLink to="/simulation" className={({ isActive }) => (isActive ? 'active' : '')}>Simulation</NavLink></li>
                        <li><NavLink to="/map-clusters" className={({ isActive }) => (isActive ? 'active' : '')}>Map Clusters</NavLink></li>
                    </ul>
                </div>

                {/* Route Handling with Container */}
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/project" element={<Project />} />
                        <Route path="/links" element={<Links />} />
                        <Route path="/simulation" element={<Simulation />} />
                        <Route path="/map-clusters" element={<MapClusters />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
