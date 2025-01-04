'use client'

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Extend LayerOptions to include the name property
declare module 'leaflet' {
    interface LayerOptions {
        name?: string;
    }
}

interface MapProps {
    onCoordinateSelect?: (lat: number, lng: number) => void;
}

const Map = ({ onCoordinateSelect }: MapProps) => {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // ถ้าไม่มี div หรือเคยสร้างแผนที่ไปแล้ว ให้ return ไม่ทำซ้ำ
        if (!mapRef.current) return
        if (mapRef.current.childElementCount > 0) return

        // สร้างแผนที่ Leaflet
        const map = L.map(mapRef.current).setView([13.736717, 100.523186], 12)

        // เพิ่ม Tile Layer ของ OpenStreetMap
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
        })

        // เพิ่ม Tile Layer ของ Google satellite
        const googleSat = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 22,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; Google',
        })

        // เพิ่ม Tile Layer ของ Google terrain
        const googleTerrain = L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
            maxZoom: 22,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; Google',
        })

        // เพิ่ม Tile Layer ของ Google hybrid
        const googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            maxZoom: 22,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; Google',
        })

        // เพิ่ม Tile Layer ของ Google roadmap
        const googleRoadmap = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 22,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; Google',
        })

        // add feature group
        const featureGroup = L.featureGroup()

        // add baseMaps layer 
        const baseMaps = {
            'OpenStreetMap': osm,
            'Google Satellite': googleSat,
            'Google Terrain': googleTerrain,
            'Google Hybrid': googleHybrid.addTo(map),
            'Google Roadmap': googleRoadmap,
        }

        // add overlay layer
        const overlayMaps = {
            'ตำแหน่งฝาย': featureGroup.addTo(map),
        }

        // add layer control to map
        L.control.layers(baseMaps, overlayMaps).addTo(map)

        // กำหนด custom icon สำหรับ marker
        const customIcon = L.icon({
            iconUrl: '/pin_red.png', // ตรวจสอบว่าไฟล์อยู่ใน public/pin_red.png
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        })

        // Event เมื่อพบพิกัด (success)
        function onLocationFound(e: L.LocationEvent) {
            const radius = e.accuracy // ความคลาดเคลื่อน (เมตร)

            // สร้าง marker ที่ตำแหน่งปัจจุบัน
            const marker = L.marker(e.latlng, { icon: customIcon }).addTo(map)
                .bindPopup(`คุณอยู่ห่างจากจุดนี้ประมาณ ${radius.toFixed(0)} เมตร`)
                .openPopup()

            featureGroup.addLayer(marker)
            if (onCoordinateSelect) {
                onCoordinateSelect(e.latlng.lat, e.latlng.lng)
            }

            // วาดวงกลมแสดงระยะ
            L.circle(e.latlng, { name: 'circle', radius }).addTo(map)
        }

        // Event เมื่อระบุตำแหน่งไม่ได้ (หรือ error)
        function onLocationError(e: L.ErrorEvent) {
            alert(e.message)
        }

        // ผูก event
        map.on('locationfound', onLocationFound)
        map.on('locationerror', onLocationError)

        // สั่ง Leaflet ให้ขอ geolocation จากเบราว์เซอร์
        // พร้อมเลื่อนไปยังตำแหน่งผู้ใช้ (setView: true)
        map.locate({
            setView: true,
            maxZoom: 20,         // ปรับซูมเมื่อหาพิกัดสำเร็จ
            watch: false,        // ถ้าอยาก track ตลอด ให้ตั้งเป็น true
            enableHighAccuracy: true, // ขอใช้ GPS แม่นยำสูง (ถ้าอุปกรณ์รองรับ)
        })

        // remove marker ทั้งหมด
        function removeAllMarkers() {
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    layer.remove()
                }
            })
        }

        // remove layer by name
        function removeLayerByName(name: string) {
            map.eachLayer((layer) => {
                if (layer instanceof L.Layer && layer.options.name === name) {
                    layer.remove()
                }
            })
        }

        // map on click event 
        function onMapClick(e: L.LeafletMouseEvent) {
            removeAllMarkers()
            removeLayerByName('circle')
            // สร้าง marker ที่ตำแหน่งที่คลิก
            const marker = L.marker(e.latlng, { icon: customIcon })
                .bindPopup(`You clicked the map at ${e.latlng.toString()}`)
                .openPopup()

            featureGroup.addLayer(marker)
            if (onCoordinateSelect) {
                onCoordinateSelect(e.latlng.lat, e.latlng.lng)
            }
        }

        // ผูก event
        map.on('click', onMapClick)

        // Cleanup เมื่อ component ถูก unmount
        return () => {
            map.remove()
        }
    }, [])

    return (
        <div
            ref={mapRef}
            style={{ width: '100%', height: '40vh', zIndex: 0, position: 'relative' }}
            className="rounded-lg overflow-hidden"
        />
    )
}

export default Map
