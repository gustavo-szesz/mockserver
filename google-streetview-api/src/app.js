require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

// Endpoint to fetch mock data and use it with Google Street View
app.get('/api/streetview/:id', async (req, res) => {
    try {
        // Fetch mock data from the mock server
        const mockServerUrl = 'http://mockserver:3000/api/mockdata'; // Use Docker network name
        const mockDataResponse = await axios.get(mockServerUrl);

        // Extract the locations array from the mock server response
        const locations = mockDataResponse.data.locations;

        if (!locations || locations.length === 0) {
            return res.status(400).json({ error: 'No locations found in mock server response' });
        }

        // Get the location index from the route parameter
        const locationIndex = parseInt(req.params.id, 10) - 1;

        if (locationIndex < 0 || locationIndex >= locations.length) {
            return res.status(404).json({ error: 'Location not found' });
        }

        // Use the specified location's coordinates for the Street View API
        const { lat, lng } = locations[locationIndex].coordinates;

        if (!lat || !lng) {
            return res.status(400).json({ error: 'Coordinates are missing in the mock server response' });
        }

        // Generate Google Street View URL
        const googleStreetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`;

        res.json({ streetViewUrl: googleStreetViewUrl });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch data or generate Street View URL' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Google Street View API is running on http://localhost:${PORT}`);
});