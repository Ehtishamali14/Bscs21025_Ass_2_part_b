const express = require('express');
const app = express();
const profileRoutes = require('./routes/profileRoutes');
const helloRoute = require('./routes/HelloRoute');
const PORT = 3000;

app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files

// Route handlers
app.use('/profile', profileRoutes);
app.use('/', helloRoute);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
