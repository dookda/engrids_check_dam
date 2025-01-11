'use client';

import Header from "@/components/Header";
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

export default function Home() {
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [creator, setCreator] = useState('')
    const [type, setType] = useState('')
    const [detail, setDetail] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(lat, lng, name)
    }

    return (
        <div className={`${notoSandThai.className} page-heading`} >
            <Header />
            <div className="container-fluid">

                <Map onGetLocation={(e: any) => {
                    setLat(e.lat)
                    setLng(e.lng)
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
                                            onChange={(val) => setLat(val)} />
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            label="ลองจิจูด"
                                            type="number"
                                            value={lng}
                                            onChange={(val) => setLng(val)} />
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            label="ชื่อฝาย"
                                            type="text"
                                            onChange={(val) => setName(val)} />
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            label="ผู้สร้าง/ผู้ดูแล"
                                            type="text"
                                            onChange={(val) => setCreator(val)} />
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            label="รูปแบบของฝาย"
                                            type="text"
                                            onChange={(val) => setType(val)} />
                                    </div>

                                    <div className="className">
                                        <Textarea
                                            label="รายละเอียด"
                                            rows={3}
                                            onChange={(val) => setDetail(val)}
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