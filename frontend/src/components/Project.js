// src/components/Project.js
import React from 'react';

function Project() {
    return (
        <div className="container" id="project">
            <h2>Real Estate Analysis: Unveiling Trends and Predicting Prices</h2>
            <p>Welcome to my real estate analysis project! This project dives into the world of property trends and pricing predictions to help individuals and businesses make smarter real estate decisions.</p>

            <h2>About the Project</h2>

            <h3>Objectives</h3>
            <p>This project aims to analyze real estate trends and predict property prices using a comprehensive dataset. By uncovering key insights, the project provides valuable information for property investment decisions, pricing strategies, and market timing.</p>

            <h3>Dataset Overview</h3>
            <p>The dataset used for this project was sourced from <a href="https://www.kaggle.com/datasets/sukhmandeepsinghbrar/housing-price-dataset" target="_blank" rel="noopener noreferrer">Kaggle's Housing Price Dataset</a>. It contains <strong>21,613 rows</strong> and <strong>21 columns</strong>, with attributes including price, square footage, number of bedrooms and bathrooms, location coordinates, and more.</p>
            <p>Key attributes in the dataset:</p>
            <ul>
                <li><strong>Price</strong>: Property price</li>
                <li><strong>Bedrooms</strong>: Number of bedrooms</li>
                <li><strong>Bathrooms</strong>: Number of bathrooms</li>
                <li><strong>Sqft Living</strong>: Living area size in square feet</li>
                <li><strong>Grade</strong>: Quality grade based on a rating system</li>
                <li><strong>Year Built</strong>: Year the property was built</li>
                <li><strong>Latitude and Longitude</strong>: Location coordinates</li>
            </ul>

            <h3>Data Processing</h3>
            <p>Before model development, the data underwent several preprocessing steps to ensure accuracy and consistency:</p>
            <ul>
                <li>Data Cleaning: Removal of duplicates, handling of missing values, and data type conversions.</li>
                <li>Feature Engineering: Creation of new features, such as the age of the property and neighborhood ranking, to enhance model performance.</li>
                <li>Outlier Detection: Identification and handling of outliers in key variables like price and square footage.</li>
            </ul>

            <h3>Exploratory Data Analysis (EDA)</h3>
            <p>EDA was conducted to uncover patterns and relationships in the data:</p>
            <ul>
                <li><strong>Outliers</strong>: Visualized using box plots and histograms.</li>
                <li><strong>Correlation Analysis</strong>: Assessed relationships between features, particularly the correlation between price and other attributes like square footage and grade.</li>
                <li><strong>Geospatial Analysis</strong>: Analyzed the impact of location on property prices using latitude and longitude data.</li>
                <li><strong>Temporal Analysis</strong>: Explored seasonal price variations over time.</li>
            </ul>

            <h3>Model Development</h3>
            <p>For predictive modeling, a <strong>Random Forest Regressor</strong> was implemented due to its ability to handle high-dimensional data and capture non-linear relationships.</p>
            <p>The model was trained on 80% of the dataset, with 20% reserved for testing. Key features such as living area, grade, and location coordinates were included in the model to predict property prices.</p>

            <h3>Conclusion</h3>
            <p>This project demonstrates how data analysis and machine learning can provide insights into real estate trends and predict property prices with reasonable accuracy. The findings are valuable for stakeholders seeking data-driven guidance in the real estate market.</p>
        </div>
    );
}

export default Project;
