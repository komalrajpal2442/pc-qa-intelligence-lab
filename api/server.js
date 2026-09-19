const express = require('express');

const app = express();

app.use(express.json());

const PORT = 4000;

app.post('/api/submissions', (req, res) => {

    const {
        insuredName,
        propertyAddress,
        propertyType,
        yearBuilt
    } = req.body;

    const currentYear = new Date().getFullYear();

    // 1. Insured Name validation
    if (!insuredName) {
        return res.status(400).json({
            error: 'Insured Name is required.'
        });
    }

    // 2. Property Address validation
    if (!propertyAddress) {
        return res.status(400).json({
            error: 'Property Address is required.'
        });
    }

    // 3. Property Type validation
    if (!propertyType) {
        return res.status(400).json({
            error: 'Property Type is required.'
        });
    }

    // 4. Year Built required validation
    if (!yearBuilt) {
        return res.status(400).json({
            error: 'Year Built is required.'
        });
    }

    // 5. Future Year Built validation
    if (Number(yearBuilt) > currentYear) {
        return res.status(400).json({
            error: 'Year Built cannot be in the future.'
        });
    }

    // 6. Underwriting referral for old properties
    const propertyAge = currentYear - Number(yearBuilt);

    if (propertyAge > 50) {
        return res.status(201).json({
            status: 'Underwriting Referral Required',
            message: 'Property is over 50 years old.'
        });
    }

    // 7. Successful submission
    const submissionNumber =
        'SUB-' + Math.floor(10000 + Math.random() * 90000);

    res.status(201).json({
        submissionNumber: submissionNumber,
        status: 'Created'
    });
});

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});