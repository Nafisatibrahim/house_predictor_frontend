import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapClusters() {
    const [clusters, setClusters] = useState([]);

    // Fetch cluster data from backend
    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api/clusters"; // Fallback to localhost if env variable is missing

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Filter out clusters with missing or invalid coordinates
                const validClusters = data.filter(cluster => cluster.lat !== undefined && cluster.long !== undefined);
                setClusters(validClusters);
            })
            .catch(error => console.error("Error fetching cluster data:", error));
    }, []);

    return (
        <MapContainer center={[47.5, -122.3]} zoom={10} style={{ height: "500px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {clusters.map((cluster, index) => (
                <Circle
                    key={index}
                    center={[cluster.lat, cluster.long]} // Use "lat" and "long" for coordinates
                    radius={500} // Adjust radius based on your preference
                    color="blue"
                    fillColor="blue"
                    fillOpacity={0.4}
                >
                    <Popup>
                        <div>
                            <h3>Cluster {index + 1}</h3>
                            <p><strong>Average Price:</strong> ${cluster.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <p><strong>Avg Bedrooms:</strong> {cluster.bedrooms.toFixed(1)}</p>
                            <p><strong>Avg Bathrooms:</strong> {cluster.bathrooms.toFixed(1)}</p>
                            <p><strong>Avg Sqft Living:</strong> {cluster.sqft_living.toLocaleString()} sq ft</p>
                        </div>
                    </Popup>
                </Circle>
            ))}
        </MapContainer>
    );
}

export default MapClusters;
