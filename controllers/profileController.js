const fs = require('fs');
const path = require('path');
const validator = require('../utils/validator');
const profilesPath = path.join(__dirname, '../data/profiles.json');

exports.createProfile = (req, res) => {
    const profile = req.body;
    if (!validator.validateProfile(profile)) {
        return res.status(400).json({ error: 'Profile data is incomplete' });
    }
    
    const profiles = JSON.parse(fs.readFileSync(profilesPath, 'utf-8'));
    profiles.push(profile);
    fs.writeFileSync(profilesPath, JSON.stringify(profiles, null, 2));
    
    res.status(201).json({ message: 'Profile saved successfully' });
};

exports.getProfilesFromCSV = (req, res) => {
    const csvPath = path.join(__dirname, '../data/profiles.csv');
    fs.readFile(csvPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read profiles from CSV' });
        }
        const profiles = data.split('\n').map(line => line.split(','));
        res.json({ profiles });
    });
};
