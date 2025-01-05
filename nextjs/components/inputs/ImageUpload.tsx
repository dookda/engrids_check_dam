'use client'
import React, { useState, ChangeEvent, useEffect } from 'react'

interface ImageUploadProps {
    label?: string
    value?: string
    maxWidth?: number
    maxHeight?: number
    onChange: (base64: string) => void
}



export default function ImageUpload({
    label = 'Upload Image',
    maxWidth = 300,
    maxHeight = 300,
    onChange,
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string>('')
    useEffect(() => {
        if (value) {
            setPreview(value)
        }
    })
    // ฟังก์ชัน handle เมื่อผู้ใช้เลือกไฟล์
    async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        // อ่านไฟล์เป็น DataURL
        const reader = new FileReader()
        reader.onload = (ev: ProgressEvent<FileReader>) => {
            const imageSrc = ev.target?.result as string
            resizeImage(imageSrc, maxWidth, maxHeight).then((resizedBase64) => {
                setPreview(resizedBase64)
                onChange(resizedBase64) // ส่งค่าให้ parent
            })
        }
        reader.readAsDataURL(file)
    }

    // ฟังก์ชัน resize รูปภาพ
    function resizeImage(dataUrl: string, maxW: number, maxH: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.onload = () => {
                // คำนวณขนาดใหม่
                let width = image.width
                let height = image.height

                if (width > maxW) {
                    height = Math.round((height * maxW) / width)
                    width = maxW
                }
                if (height > maxH) {
                    width = Math.round((width * maxH) / height)
                    height = maxH
                }

                // สร้าง canvas เพื่อวาด
                const canvas = document.createElement('canvas')
                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext('2d')
                if (!ctx) return reject('Cannot get 2d context from canvas')

                // วาดรูปลง canvas
                ctx.drawImage(image, 0, 0, width, height)
                // ได้ base64 จาก canvas
                const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.8)
                // ปรับ compression 0.8 ตามต้องการ (0-1)
                resolve(resizedDataUrl)
            }
            image.onerror = (err) => reject(err)
            image.src = dataUrl
        })
    }

    return (
        <div className="mb-4">
            <label className="block font-semibold mb-1">{label}</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {/* แสดงตัวอย่างรูปที่อัปโหลด */}
            {preview && (
                <div className="mt-2">
                    <img
                        src={preview}
                        alt="preview"
                        style={{ maxWidth: '200px' }} />
                </div>
            )}
        </div>
    )
}
