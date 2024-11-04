import React, { useState } from 'react';
import Map from './Map';
import MapClusters from './Map_clusters';  // Importing the MapClusters component

function Simulation() {
    const [formData, setFormData] = useState({
        bedrooms: '',
        bathrooms: '',
        sqftLiving: '',
        grade: '',
        yrBuilt: '',
        yrRenovated: '',
        neighborhoodRank: '',
    });

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 
    const [location, setLocation] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { bedrooms, bathrooms, sqftLiving, grade, yrBuilt, yrRenovated, neighborhoodRank } = formData;

        // Front-end validation for realistic input ranges
        if (bedrooms < 0 || bedrooms > 10) {
            setError("Bedrooms should be between 0 and 10.");
            return;
        }
        if (bathrooms < 0 || bathrooms > 10) {
            setError("Bathrooms should be between 0 and 10.");
            return;
        }
        if (sqftLiving <= 0) {
            setError("Sqft Living should be greater than 0.");
            return;
        }
        if (grade < 1 || grade > 10) {
            setError("Grade should be between 1 and 10.");
            return;
        }
        if (yrBuilt < 1800 || yrBuilt > new Date().getFullYear()) {
            setError("Year Built should be a realistic historical year.");
            return;
        }
        if (neighborhoodRank < 1 || neighborhoodRank > 10) {
            setError("Neighborhood Rank should be between 1 and 10.");
            return;
        }

        setError(null); 
        setIsLoading(true);

        const payload = {
            bedrooms: parseInt(bedrooms, 10),
            bathrooms: parseFloat(bathrooms),
            sqft_living: parseInt(sqftLiving, 10),
            grade: parseInt(grade, 10),
            yr_built: parseInt(yrBuilt, 10),
            yr_renovated: yrRenovated ? parseInt(yrRenovated, 10) : 0,
            neighborhood_rank: parseInt(neighborhoodRank, 10),
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setPrediction(data.predicted_price);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to get prediction. Please try again later.');
        } finally {
            setIsLoading(false); 
        }
    };

    const getPredictionClass = () => {
        if (prediction < 500000) return 'prediction-affordable';
        if (prediction >= 500000) return 'prediction-expensive';
        return '';
    };

    return (
        <div className="container" id="simulation">
            <h2>Real Estate Price Prediction Simulation</h2>
            <form onSubmit={handleSubmit}>
                <label>Bedrooms:</label>
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />

                <label>Bathrooms:</label>
                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />

                <label>Sqft Living:</label>
                <input type="number" name="sqftLiving" value={formData.sqftLiving} onChange={handleChange} required />

                <label>Grade:</label>
                <input type="number" name="grade" value={formData.grade} onChange={handleChange} required />

                <label>Year Built:</label>
                <input type="number" name="yrBuilt" value={formData.yrBuilt} onChange={handleChange} required />

                <label>Year Renovated:</label>
                <input type="number" name="yrRenovated" value={formData.yrRenovated} onChange={handleChange} />

                <label>Neighborhood Rank:</label>
                <input type="number" name="neighborhoodRank" value={formData.neighborhoodRank} onChange={handleChange} required />

                <button type="submit">Get Prediction</button>
            </form>

            {error && <p className="error">{error}</p>} 

            {isLoading && <div className="loading-spinner"></div>}

            {prediction !== null && !isLoading && (
                <div className={`prediction-result ${getPredictionClass()}`}>
                    <h3>Predicted Price: ${prediction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
            )}

            <h3>Map Locator</h3>
            <p>Click on the map to set the location.</p>
            <Map location={location} setLocation={setLocation} />

            {location && (
                <p className="map-coordinates">
                    Selected Location: Latitude: {location.lat}, Longitude: {location.lng}
                </p>
            )}

            {/* Display the MapClusters component below the Map component */}
            <h3>Neighborhood Clusters</h3>
            <MapClusters />
        </div>
    );
}

export default Simulation;
