const express = require('express');
const app = express();
const cron = require('node-cron');
const axios = require('axios');
const WeatherData = require('./WeatherData');

let generatedWeatherData = null;

cron.schedule('*/5 * * * *', () => {
    
    const temp = Math.floor(Math.random() * 26) + 15;

    const humidity = Math.floor(Math.random() * 21) + 70;

    const airPressure = Math.floor(Math.random() * 21) + 1000;

    const UpdatedDateTime = new Date()

    const districtsOfSriLanka = [
        "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
        "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy",
        "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale",
        "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa",
        "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
    ];

    const randomIndex = Math.floor(Math.random() * districtsOfSriLanka.length);
    const district = districtsOfSriLanka[randomIndex];

    generatedWeatherData = new WeatherData(temp, humidity, airPressure, UpdatedDateTime, district);
});

function generateWeatherData() {
    return generatedWeatherData;
}

async function insertWeatherData() {
    const weatherData = generateWeatherData();
    console.log(weatherData);
    try {
        if (weatherData !== null) {
            await axios.post('http://localhost:3000/api/weather', weatherData);
        }
        console.log(weatherData !== null ? 'Weather data inserted successfully.' : 'Not found weather data!');
    } catch (error) {
        console.error('Error inserting weather data:', error.message);
    }
}

cron.schedule('*/5 * * * *', () => {
    insertWeatherData();
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});