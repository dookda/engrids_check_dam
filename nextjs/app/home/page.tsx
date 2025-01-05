'use client'

import React, { useState } from 'react'
import TextInput from '@/components/inputs/TextInput'
import TextAreaInput from '@/components/inputs/TextAreaInput'
import SelectInput from '@/components/inputs/SelectInput'
import Map from '@/components/Map'
import ImageUpload from '@/components/inputs/ImageUpload'

export default function Page() {
    const [name, setName] = useState('')
    const [creator, setCreator] = useState('')
    const [description, setDescription] = useState('')
    const [checkDamType, setCheckDamType] = useState('ฝายไม้')
    const [lat, setLat] = useState<number | null>(null)
    const [lng, setLng] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [imageBase64, setImageBase64] = useState('')

    // รับพิกัดเมื่อคลิกบน Map
    const handleMapClick = (newLat: number, newLng: number) => {
        try {
            setLat(newLat)
            setLng(newLng)
            console.log('Map clicked at', newLat, newLng)
        } catch (err) {
            console.log(err)
        }
    }

    // Submit ฟอร์มเพื่อ Insert ข้อมูล
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        try {
            const res = await fetch('/api/checkdams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    creator,
                    description,
                    checkDamType,
                    lat,
                    lng,
                    image: imageBase64
                }),
            })
            if (!res.ok) {
                throw new Error('Failed to insert data')
            }
            const data = await res.json()
            console.log('Insert success:', data)

            setShowModal(true) // เปิด Modal
            // เคลียร์ฟอร์ม
            setName('')
            setCreator('')
            setDescription('')
            setCheckDamType('ฝายไม้')
            setLat(null)
            setLng(null)
            setImageBase64('')

        } catch (err: any) {
            console.log(err)
            setError(err.message)
        }
    }

    const closeModal = () => {
        setShowModal(false)
    }

    // ตัวเลือกประเภทฝาย
    const checkDamList = [
        { value: 'ฝายไม้', label: 'ฝายไม้' },
        { value: 'ฝายไม้แกนดิน', label: 'ฝายไม้แกนดิน' },
        { value: 'ฝายคอกหมู', label: 'ฝายคอกหมู' },
        { value: 'ฝายหิน', label: 'ฝายหิน' },
        { value: 'ฝายปูนผสมดิน', label: 'ฝายปูนผสมดิน' },
        { value: 'ฝายคอนกรีต', label: 'ฝายคอนกรีต' },
    ]

    return (
        <div>
            <Map onCoordinateSelect={handleMapClick} />

            <form onSubmit={handleSubmit} className="mt-4">
                <TextInput
                    label="ชื่อฝาย"
                    value={name}
                    onChange={(val) => setName(val)}
                    required
                />

                <TextInput
                    label="ผู้สร้าง/ผู้ดูแล"
                    value={creator}
                    onChange={(val) => setCreator(val)}
                    required
                />

                <TextAreaInput
                    label="รายละเอียดเพิ่มเติม"
                    value={description}
                    onChange={(val) => setDescription(val)}
                    required={false}
                />

                <SelectInput
                    label="ประเภทของฝาย"
                    value={checkDamType}
                    onChange={(val) => setCheckDamType(val)}
                    options={checkDamList}
                    required
                />

                <ImageUpload
                    label="รูปภาพฝาย"
                    value={imageBase64}
                    onChange={(val) => setImageBase64(val)}
                />

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <button type="submit" className="btn btn-dash btn-success mt-2">
                    บันทึกข้อมูล
                </button>
            </form>

            <div className={`modal ${showModal ? 'modal-open' : ''}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">สำเร็จ!</h3>
                    <p className="py-4">ข้อมูลถูกบันทึกเรียบร้อย</p>
                    <div className="modal-action">
                        <button className="btn" onClick={closeModal}>
                            ปิด
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
