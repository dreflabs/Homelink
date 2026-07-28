"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface PropertyMarker {
  id: string;
  title: string;
  price: number;
  latitude: number;
  longitude: number;
}

interface InteractiveMapProps {
  properties: PropertyMarker[];
  onBoundsChange?: (bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }) => void;
  center?: [number, number];
  zoom?: number;
}

// Component to handle map events
function MapEvents({ onBoundsChange }: { onBoundsChange?: InteractiveMapProps['onBoundsChange'] }) {
  const map = useMapEvents({
    moveend: () => {
      if (onBoundsChange) {
        const bounds = map.getBounds();
        onBoundsChange({
          minLat: bounds.getSouth(),
          maxLat: bounds.getNorth(),
          minLng: bounds.getWest(),
          maxLng: bounds.getEast(),
        });
      }
    },
  });
  return null;
}

export function InteractiveMap({ properties, onBoundsChange, center = [-6.2088, 106.8456], zoom = 12 }: InteractiveMapProps) {
  // To avoid hydration mismatch, only render map on client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400">Loading Map...</div>;
  }

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      scrollWheelZoom={true} 
      style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <MapEvents onBoundsChange={onBoundsChange} />
      
      {properties.map((prop) => (
        <Marker key={prop.id} position={[prop.latitude, prop.longitude]}>
          <Popup>
            <div className="text-sm font-sans">
              <p className="font-semibold">{prop.title}</p>
              <p className="text-primary font-bold mt-1">Rp {prop.price.toLocaleString("id-ID")}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
