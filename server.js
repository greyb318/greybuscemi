const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json()); // Parse incoming JSON data

// Endpoint to log geolocation data
app.post("/log-location", (req, res) => {
    const { city, region, country, ip } = req.body;
    const logEntry = `${new Date().toISOString()} - IP: ${ip}, City: ${city}, Region: ${region}, Country: ${country}\n`;

    // Append the data to a log file
    fs.appendFile("visitors.log", logEntry, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
            res.status(500).send("Failed to log data");
        } else {
            res.status(200).send("Data logged successfully");
        }
    });
});

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
