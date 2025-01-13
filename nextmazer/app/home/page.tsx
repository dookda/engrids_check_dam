'use client';

import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input"
// import Map from "@/components/Map";
import Textarea from "@/components/Textarea";
import dynamic from "next/dynamic";
import { Noto_Sans_Thai } from 'next/font/google';
import { useState } from "react";

const notoSandThai = Noto_Sans_Thai({
    subsets: ['thai'],
    weight: ['400', '700'],
    display: 'swap'
})

const Map = dynamic(() => import('@/components/Map'), { ssr: false })


interface FormData {
    lat: string
    lng: string
    name: string
    creator: string
    type: string
    detail?: string
    image?: File
}

export default function Home() {
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    // const [name, setName] = useState('')
    // const [creator, setCreator] = useState('')
    // const [type, setType] = useState('')
    // const [detail, setDetail] = useState('')
    const [formData, setFormData] = useState<FormData>({
        lat: '',
        lng: '',
        name: '',
        creator: '',
        type: '',
        detail: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setSuccess(false)

        try {
            if (!formData.image) {
                throw new Error('กรุณาเลือกรูปภาพ')
            }

            const submitData = new FormData()
            submitData.append('lat', formData.lat)
            submitData.append('lng', formData.lng)
            submitData.append('name', formData.name)
            submitData.append('creator', formData.creator)
            submitData.append('type', formData.type)
            submitData.append('detail', formData.detail || '')
            submitData.append('image', formData.image)

            console.log("Data submitted:", submitData);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: submitData
            })

            const data = await response.json()
            console.log(data)

        } catch (error) {
            setError('เกิดข้อผิดพลาด')
            setIsLoading(false)
            console.error(error)
        }
    }

    return (
        <div className={`${notoSandThai.className} page-heading`} >
            <Header />
            <div className="container-fluid">

                <Map onGetLocation={(e: any) => {
                    setLat(e.lat)
                    setLng(e.lng)
                    setFormData(prev => ({ ...prev, lat: e.lat, lng: e.lng }))
                }} />

                <div className="card">
                    <div className="card-body">
                        <form className="form form-vertical" onSubmit={handleSubmit}>
                            <div className="form-body">
                                <div className="row">
                                    <div className="col-12">
                                        <Input
                                            label="ละติจูด"
                                            type="number"
                                            value={lat}
                                            onChange={(val) => setFormData(prev => ({ ...prev, lat: val }))} />
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            label="ลองจิจูด"
                                            type="number"
                                            value={lng}
                                            onChange={(val) => setFormData(prev => ({ ...prev, lng: val }))} />
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            label="ชื่อฝาย"
                                            type="text"
                                            onChange={(val) => setFormData(prev => ({ ...prev, name: val }))} />
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            label="ผู้สร้าง/ผู้ดูแล"
                                            type="text"
                                            onChange={(val) => setFormData(prev => ({ ...prev, creator: val }))} />
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            label="รูปแบบของฝาย"
                                            type="text"
                                            onChange={(val) => setFormData(prev => ({ ...prev, type: val }))} />
                                    </div>

                                    <div className="className">
                                        <Textarea
                                            label="รายละเอียด"
                                            rows={3}
                                            onChange={(val) => setFormData(prev => ({ ...prev, detail: val }))}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <ImageUpload
                                            onUpload={async (file: File) => setFormData(prev => ({ ...prev, image: file }))}
                                        />
                                    </div>
                                    <div className="col-12 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary me-1 mb-1">Submit</button>
                                        <button type="reset" className="btn btn-light-secondary me-1 mb-1">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}