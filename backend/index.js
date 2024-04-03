import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample districts data
const districts = [
  { name: "Ampara", id: 1 },
  { name: "Anuradhapura", id: 2 },
  { name: "Badulla", id: 3 },
  { name: "Batticaloa", id: 4 },
  { name: "Colombo", id: 5 },
  { name: "Galle", id: 6 },
  { name: "Gampaha", id: 7 },
  { name: "Hambantota", id: 8 },
  { name: "Jaffna", id: 9 },
  { name: "Kalutara", id: 10 },
  { name: "Kandy", id: 11 },
  { name: "Kegalle", id: 12 },
  { name: "Kilinochchi", id: 13 },
  { name: "Kurunegala", id: 14 },
  { name: "Mannar", id: 15 },
  { name: "Matale", id: 16 },
  { name: "Matara", id: 17 },
  { name: "Monaragala", id: 18 },
  { name: "Mullaitivu", id: 19 },
  { name: "Nuwara Eliya", id: 20 },
  { name: "Polonnaruwa", id: 21 },
  { name: "Puttalam", id: 22 },
  { name: "Ratnapura", id: 23 },
  { name: "Trincomalee", id: 24 },
  { name: "Vavuniya", id: 25 },
];

const generateWeatherData = (district) => {
  return {
    district: district.name,
    temperature: Math.floor(Math.random() * 30) + 15,
    humidity: Math.floor(Math.random() * 50) + 50,
    air_pressure: Math.floor(Math.random() * 200) + 900,
  };
};

app.get("/api/weather", (req, res) => {
  const weatherData = districts.map((district) =>
    generateWeatherData(district)
  );
  res.json(weatherData);
});

app.get("/api/weather/:district", (req, res) => {
  const districtName = req.params.district;
  const district = districts.find(
    (d) => d.name.toLowerCase() === districtName.toLowerCase()
  );

  if (!district) {
    return res.status(404).json({ message: "District not found" });
  }

  const weatherData = generateWeatherData(district);
  res.json(weatherData);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
