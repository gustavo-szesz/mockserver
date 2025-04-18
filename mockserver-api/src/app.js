const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve JSON data
app.get('/api/mockdata', (req, res) => {
    const mockDataPath = path.join(__dirname, 'data', 'mockData.json');
    fs.readFile(mockDataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read mock data' });
        }
        res.json(JSON.parse(data));
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Mock server is running on http://localhost:${PORT}`);
});