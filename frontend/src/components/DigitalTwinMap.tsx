"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon issue with Next.js
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

const MOCK_ASSETS = [
  { id: "1", type: "Bridge", name: "Pamban Bridge", lat: 9.2783, lng: 79.2023, risk: 0.85, status: "Critical" },
  { id: "2", type: "Dam", name: "Bhakra Nangal", lat: 31.4111, lng: 76.4344, risk: 0.20, status: "Healthy" },
  { id: "3", type: "Hospital", name: "AIIMS Delhi", lat: 28.5672, lng: 77.2100, risk: 0.65, status: "Warning" },
  { id: "4", type: "PowerPlant", name: "Kudankulam", lat: 8.1691, lng: 77.7126, risk: 0.10, status: "Healthy" },
];

export default function DigitalTwinMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-[600px] w-full bg-slate-900 animate-pulse rounded-xl" />;

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative z-0">
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        style={{ height: "100%", width: "100%", background: "#0f172a" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {MOCK_ASSETS.map((asset) => (
          <CircleMarker
            key={asset.id}
            center={[asset.lat, asset.lng]}
            radius={asset.risk > 0.7 ? 12 : 8}
            pathOptions={{ 
              fillColor: asset.risk > 0.7 ? "#ef4444" : asset.risk > 0.5 ? "#f59e0b" : "#10b981", 
              color: asset.risk > 0.7 ? "#f87171" : asset.risk > 0.5 ? "#fbbf24" : "#34d399", 
              weight: 2, 
              fillOpacity: 0.7 
            }}
          >
            <Popup className="glass-popup">
              <div className="p-1">
                <h3 className="font-bold text-gray-900">{asset.name}</h3>
                <p className="text-sm font-medium text-gray-600 border-b pb-1 mb-1">{asset.type}</p>
                <div className="flex justify-between items-center text-sm">
                  <span>Risk Score:</span>
                  <span className={`font-bold ${asset.risk > 0.7 ? "text-red-600" : "text-green-600"}`}>
                    {(asset.risk * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
