const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(express.static('public'));

// Use userRoutes for registration
app.use('/api/users', userRoutes);

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
