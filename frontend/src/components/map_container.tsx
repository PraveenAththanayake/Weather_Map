import Districts from "@/constants/districts";
import MapSvg from "./map";

export default function Map_Container() {
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
            <span
              className={`absolute text-[7px] font-medium`}
              style={{
                transform: `translate(${district.x}px, ${district.y}px)`,
              }}
            >
              {district.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
