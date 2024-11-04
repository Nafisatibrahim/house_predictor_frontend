import React, { useEffect, useState, useCallback } from 'react';
import L from 'leaflet';

function Map({ location, setLocation }) {
    const [clusters, setClusters] = useState([]);
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [address, setAddress] = useState(null);

    // Function to find the nearest cluster (memoized with useCallback)
    const findNearestCluster = useCallback((lat, lng) => {
        let nearest = null;
        let minDistance = Infinity;

        clusters.forEach((cluster) => {
            const distance = getDistance(lat, lng, cluster.lat, cluster.long);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = cluster;
            }
        });

        return nearest;
    }, [clusters]); // Only re-calculate when clusters change

    // Fetch cluster data from backend
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}`)
            .then(response => response.json())
            .then(data => setClusters(data))
            .catch(error => console.error("Error fetching cluster data:", error));
    }, []);

    useEffect(() => {
        const map = L.map('map-container', { center: [47.6062, -122.3321], zoom: 10 }); // Center around Seattle, WA

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        const onMapClick = (e) => {
            const { lat, lng } = e.latlng;
            setLocation({ lat, lng });

            // Find the nearest cluster to the clicked location
            const nearestCluster = findNearestCluster(lat, lng);
            setSelectedCluster(nearestCluster);

            // Fetch address for selected location
            fetchAddress(lat, lng);

            // Clear previous markers
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
            // Add a new marker at the selected location
            L.marker([lat, lng]).addTo(map).bindPopup("Selected Location").openPopup();
        };

        map.on('click', onMapClick);

        map.whenReady(() => {
            map.invalidateSize();  // Ensures the map renders fully
        });

        return () => {
            map.off('click', onMapClick);
            map.remove();
        };
    }, [setLocation, clusters, findNearestCluster]); // Include findNearestCluster as a dependency

    // Function to calculate the distance between two coordinates (in km)
    const getDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    };

    // Function to fetch address using OpenStreetMap's Nominatim API
    const fetchAddress = async (lat, lng) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
            const data = await response.json();
            if (data && data.address) {
                setAddress({
                    city: data.address.city || data.address.town || data.address.village || 'Unknown',
                    state: data.address.state || 'Unknown',
                    country: data.address.country || 'Unknown'
                });
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            setAddress(null);
        }
    };

    return (
        <div>
            <div id="map-container" style={{ height: '400px', width: '100%', marginTop: '1em' }}></div>
            <div className="info-container">
                {selectedCluster && (
                    <div className="info-box">
                        <h3>Nearest Cluster Information</h3>
                        <p><strong>Average Price:</strong> ${selectedCluster.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p><strong>Avg Bedrooms:</strong> {selectedCluster.bedrooms.toFixed(1)}</p>
                        <p><strong>Avg Bathrooms:</strong> {selectedCluster.bathrooms.toFixed(1)}</p>
                        <p><strong>Avg Sqft Living:</strong> {selectedCluster.sqft_living.toLocaleString()} sq ft</p>
                    </div>
                )}
                {address && (
                    <div className="info-box">
                        <h3>Selected Location Address</h3>
                        <p><strong>City:</strong> {address.city}</p>
                        <p><strong>State:</strong> {address.state}</p>
                        <p><strong>Country:</strong> {address.country}</p>
                        <p><strong>Selected Location:</strong> Latitude: {location.lat}, Longitude: {location.lng}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Map;
