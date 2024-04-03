import Districts from "@/constants/districts";
import MapSvg from "./map";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Map_Container() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/weather")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  return (
    <div className="h-screen">
      <div style={{ position: "relative" }}>
        <MapSvg />
        {Districts.map((district) => (
          <div
            key={district.id}
            style={{
              position: "absolute",
              top: district.top,
              left: district.left,
            }}
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                <span
                  className={`absolute text-[7px] font-medium cursor-pointer`}
                  style={{
                    transform: `translate(${district.x}px, ${district.y}px)`,
                  }}
                >
                  {district.name}
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="ease-in-out duration-0">
                <div>
                  <h3 className="text-xs font-bold ">{district.name}</h3>
                  {data
                    .filter(
                      (weather: { district: string }) =>
                        weather.district === district.name
                    )
                    .map(
                      (weather: {
                        district: string;
                        temperature: string;
                        humidity: string;
                        air_pressure: string;
                      }) => (
                        <div key={weather.district}>
                          <p className="text-xs">
                            Temperature: {weather.temperature}°C
                          </p>
                          <p className="text-xs">
                            Humidity: {weather.humidity}%
                          </p>
                          <p className="text-xs">
                            Air Pressure: {weather.air_pressure} hPa
                          </p>
                        </div>
                      )
                    )}
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </div>
    </div>
  );
}
