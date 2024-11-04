// PredictionForm.js
import React, { useState } from 'react';
import PriceDisplay from './PriceDisplay';

function PredictionForm() {
  // Define the initial state for each form input
  const [formData, setFormData] = useState({
    bedrooms: '',
    bathrooms: '',
    sqft_living: '',
    grade: '',
    yr_built: '',
    yr_renovated: '',
    neighborhood_rank: '',
  });
  
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState('');

  // Define allowed ranges for each field
  const ranges = {
    bedrooms: { min: 1, max: 10 },
    bathrooms: { min: 1, max: 10 },
    sqft_living: { min: 300, max: 10000 },
    grade: { min: 1, max: 10 },
    yr_built: { min: 1800, max: new Date().getFullYear() },
    yr_renovated: { min: 0, max: new Date().getFullYear() },
    neighborhood_rank: { min: 1, max: 10 },
  };

  // Update formData state and handle validation when an input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate if the input is within range
    const numValue = Number(value);
    if (numValue < ranges[name].min || numValue > ranges[name].max) {
      setError(`${name.replace('_', ' ')} must be between ${ranges[name].min} and ${ranges[name].max}`);
    } else {
      setError('');
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Function to send user input to the backend and get prediction
  const getPrediction = async () => {
    if (error) {
      alert("Please correct the input values before proceeding.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          sqft_living: Number(formData.sqft_living),
          grade: Number(formData.grade),
          yr_built: Number(formData.yr_built),
          yr_renovated: Number(formData.yr_renovated),
          neighborhood_rank: Number(formData.neighborhood_rank),
        }),
      });
      const data = await response.json();
      setPredictedPrice(data.predicted_price);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">House Price Prediction</h2>
      <div className="card p-4">
        <form>
          <div className="form-group">
            <label>Bedrooms:</label>
            <input
              type="number"
              name="bedrooms"
              min={ranges.bedrooms.min}
              max={ranges.bedrooms.max}
              value={formData.bedrooms}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Bathrooms:</label>
            <input
              type="number"
              name="bathrooms"
              min={ranges.bathrooms.min}
              max={ranges.bathrooms.max}
              value={formData.bathrooms}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Sqft Living:</label>
            <input
              type="number"
              name="sqft_living"
              min={ranges.sqft_living.min}
              max={ranges.sqft_living.max}
              value={formData.sqft_living}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Grade:</label>
            <input
              type="number"
              name="grade"
              min={ranges.grade.min}
              max={ranges.grade.max}
              value={formData.grade}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Year Built:</label>
            <input
              type="number"
              name="yr_built"
              min={ranges.yr_built.min}
              max={ranges.yr_built.max}
              value={formData.yr_built}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Year Renovated:</label>
            <input
              type="number"
              name="yr_renovated"
              min={ranges.yr_renovated.min}
              max={ranges.yr_renovated.max}
              value={formData.yr_renovated}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Neighborhood Rank:</label>
            <input
              type="number"
              name="neighborhood_rank"
              min={ranges.neighborhood_rank.min}
              max={ranges.neighborhood_rank.max}
              value={formData.neighborhood_rank}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button
            type="button"
            onClick={getPrediction}
            className="btn btn-success btn-block mt-4"
          >
            Get Prediction
          </button>
        </form>
        <PriceDisplay predictedPrice={predictedPrice} />
      </div>
    </div>
  );
}

export default PredictionForm;
