// src/components/Links.js
import React from 'react';

function Links() {
    return (
        <div className="container" id="links">
            <h2>Useful Links</h2>
            <ul>
                <li>
                    <a href="https://www.kaggle.com/datasets/sukhmandeepsinghbrar/housing-price-dataset" target="_blank" rel="noopener noreferrer">
                        Housing Price Dataset on Kaggle
                    </a> - Source of the dataset used in this analysis.
                </li>
                <li>
                    <a href="https://scikit-learn.org/stable/" target="_blank" rel="noopener noreferrer">
                        Scikit-Learn
                    </a> - A Python library for machine learning.
                </li>
                <li>
                    <a href="https://geopandas.org/" target="_blank" rel="noopener noreferrer">
                        GeoPandas
                    </a> - A Python library for geospatial data.
                </li>
                <li>
                    <a href="https://matplotlib.org/" target="_blank" rel="noopener noreferrer">
                        Matplotlib
                    </a> - A visualization library in Python.
                </li>
                <li>
                    <a href="https://seaborn.pydata.org/" target="_blank" rel="noopener noreferrer">
                        Seaborn
                    </a> - A data visualization library based on Matplotlib.
                </li>
                <li>
                    <a href="https://www.realestate.com.au/advice/" target="_blank" rel="noopener noreferrer">
                        Real Estate Advice
                    </a> - Resources for general real estate knowledge.
                </li>
            </ul>
        </div>
    );
}

export default Links;
