const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.post('/submit', (req, res) => {
    const profileData = req.body;

    // Validate required fields
    if (!profileData.Name || !profileData.Title || !profileData.TargetedKeywords || !profileData.Education || !profileData.Certification || !profileData.Contact) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // File paths
    const jsonFilePath = path.join(__dirname, 'profiles.json');
    const csvFilePath = path.join(__dirname, 'profiles.csv');

    // Append data to JSON file
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        let profiles = [];
        if (!err && data) {
            profiles = JSON.parse(data);
        }
        profiles.push(profileData);

        fs.writeFile(jsonFilePath, JSON.stringify(profiles, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Could not save JSON data' });
        });
    });

    // Append data to CSV file
    const csvLine = `${profileData.Name},${profileData.Title},${profileData.TargetedKeywords},${profileData.Education},${profileData.Certification},${profileData.Contact}\n`;
    fs.appendFile(csvFilePath, csvLine, (err) => {
        if (err) return res.status(500).json({ error: 'Could not save CSV data' });
    });

    res.status(200).json({ message: 'Profile saved successfully' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
