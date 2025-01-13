'use client'

import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import { LocateControl } from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import L from "leaflet";
import { on } from 'events';

interface MapProps {
    onGetLocation: (latLng: object) => void
}

export default function Map({ onGetLocation }: MapProps) {
    const mapContainer = useRef(null);
    const mapDiv = useRef<L.Map | null>(null);
    const center = { lat: 17.341164, lng: 100.228534 };
    const [zoom] = useState(12);

    useEffect(() => {
        if (mapDiv.current) return;

        if (mapContainer.current) {
            mapDiv.current = new L.Map(mapContainer.current, {
                center: L.latLng(center.lat, center.lng),
                zoom: zoom
            });
        }

        if (mapDiv.current) {

            const map = mapDiv.current

            const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            })

            const googleSatellite = L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
                maxZoom: 22,
                attribution: 'Google Satellite'
            })

            const googleTerrain = L.tileLayer("https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}", {
                maxZoom: 22,
                attribution: 'Google Terrain'
            })

            const googleHybrid = L.tileLayer("https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
                maxZoom: 22,
                attribution: 'Google Hybrid'
            })

            const googleStreet = L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
                maxZoom: 22,
                attribution: 'Google Street'
            })

            const baseMaps = {
                "OSM": osm,
                "Google Satellite": googleSatellite,
                "Google Terrain": googleTerrain,
                "Google Hybrid": googleHybrid.addTo(map),
                "Google Street": googleStreet
            }

            const featureGroup = L.featureGroup();

            const overlayMaps = {
                "ตำแหน่งฝาย": featureGroup.addTo(map)
            }

            L.control.layers(baseMaps, overlayMaps).addTo(map);

            L.control.scale().addTo(map);

            const lc = new LocateControl().addTo(map);
            lc.start();

            map.on('locationfound', (e: any) => {
                featureGroup.clearLayers();
                onGetLocation(e.latlng);
            });

            const redIcon = L.icon({
                iconUrl: '/pin_red.png', //ไฟล์อยู่ใน public/pin_red.png
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                shadowAnchor: [11, 42],
                popupAnchor: [0, -32],
            })

            map.on('click', (e: any) => {
                featureGroup.clearLayers();
                onGetLocation(e.latlng);
                lc.stop();

                const marker = L.marker(e.latlng, { icon: redIcon }).bindPopup(`ตำแหน่งฝาย: <br>ละติจูด: ${e.latlng.lat} <br>ลองจิลูด: ${e.latlng.lng}`).addTo(map);
                featureGroup.addLayer(marker);
                marker.openPopup();

                map.flyTo(e.latlng);
            });
        }

    }, [center.lng, center.lat, zoom]);

    return (
        <div >
            <div
                ref={mapContainer}
                style={{ height: '50vh' }}
                className='card'
            />
        </div>
    )
}