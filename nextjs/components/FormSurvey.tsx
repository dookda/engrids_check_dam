"use client"
import React, { useState } from 'react'
import TextInput from './inputs/TextInput'
import TextAreaInput from './inputs/TextAreaInput'
import SelectInput from './inputs/SelectInput'
import Map from './Map'

const FormSurvey = () => {

    const [name, setName] = useState('')
    const [creator, setCreator] = useState('')
    const [description, setDescription] = useState('')
    const [checkDamType, setCheckDamType] = useState('ฝายไม้')
    const [lat, setLat] = useState<number | null>(null)
    const [lng, setLng] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleMapClick = (newLat: number, newLng: number) => {
        setLat(newLat)
        setLng(newLng)
        console.log('Map clicked at', newLat, newLng)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError(null)

        try {
            const res = await fetch('/api/checkdams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name, creator, description, checkDamType, lat, lng
                })
            })
            if (!res.ok) {
                throw new Error('Failed to fetch items')
            }
            const data = await res.json()
            console.log('submit')

        } catch (err: any) {
            console.log(err)
            setError(err.message)
        }

        console.log(name, creator, description, checkDamType, lat, lng)
        setName('')
        setCreator('')
        setDescription('')
        setCheckDamType('ฝายไม้')
    }

    const checkDamList = [{
        value: 'ฝายไม้',
        label: 'ฝายไม้'
    }, {
        value: 'ฝายไม้แกนดิน',
        label: 'ฝายไม้แกนดิน'
    }, {
        value: 'ฝายคอกหมู',
        label: 'ฝายคอกหมู'
    }, {
        value: 'ฝายหิน',
        label: 'ฝายหิน'
    }, {
        value: 'ฝายปูนผสมดิน',
        label: 'ฝายปูนผสมดิน'
    }, {
        value: 'ฝายคอนกรีต',
        label: 'ฝายคอนกรีต'
    }]

    return (
        <div>
            <Map onCoordinateSelect={handleMapClick} />
            <form onSubmit={handleSubmit} className='mt-4'>
                <TextInput
                    label="ชื่อฝาย"
                    value={name}
                    onChange={(val) => setName(val)}
                    required={true}
                />

                <TextInput
                    label="ผู้สร้าง/ผู้ดูแล"
                    value={creator}
                    onChange={(val) => setCreator(val)}
                    required={true}
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
                    required={true}
                />



                <button type='submit' className="btn btn-dash btn-success mt-2">บันทึกข้อมูล</button>
            </form>
        </div>
    )
}

export default FormSurvey