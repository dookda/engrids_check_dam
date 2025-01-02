'use client' // บังคับให้ไฟล์นี้เป็น client component (ถ้าใช้ Next.js 13+ App Router)

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'

export default function Map() {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // ป้องกันไม่ให้รันซ้ำ ถ้าเคยสร้าง map แล้ว
        if (mapRef.current && mapRef.current.childElementCount === 0) {
            // สร้างแผนที่ Leaflet
            const map = L.map(mapRef.current).setView([13.736717, 100.523186], 12)

            // tile layer ฟรี เช่น OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map)

            const customIcon = L.icon({
                iconUrl: '/pin_red.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            })

            // เพิ่ม marker ตำแหน่งตัวอย่าง (กรุงเทพ)
            L.marker([13.736717, 100.523186], { icon: customIcon }).addTo(map).bindPopup('Hello Bangkok!')
        }
    }, [])

    return (
        <div
            ref={mapRef}
            style={{ width: '100%', height: '500px' }}
            className="rounded-lg overflow-hidden"
        />
    )
}
