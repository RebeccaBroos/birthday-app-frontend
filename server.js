const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Frontend service is running' });
});

// Proxy endpoint to backend (optional - for debugging)
app.post('/api/submit', async (req, res) => {
    try {
        const response = await fetch(`${BACKEND_URL}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error forwarding request:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to communicate with backend service' 
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Frontend server running on port ${PORT}`);
    console.log(`Backend URL configured as: ${BACKEND_URL}`);
});
