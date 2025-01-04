'use client'
import React, { useState, useEffect } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

interface Item {
    id: number
    name: string
    description: string
    created_at?: string
}

export default function HomePage() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [items, setItems] = useState<Item[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    // 1) โหลดข้อมูล items จาก /api/items (GET)
    async function fetchItems() {
        setLoading(true)
        try {
            const res = await fetch('/api/items')
            if (!res.ok) {
                throw new Error('Failed to fetch items')
            }
            const data = await res.json()
            setItems(data.items || [])
        } catch (err: any) {
            console.error(err)
            setError('Failed to load items')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    // 2) ฟอร์มสำหรับ insert item
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        try {
            const res = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description }),
            })
            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || 'Failed to insert item')
            }
            // insert สำเร็จ
            const data = await res.json()
            // อัปเดตตาราง (append item ใหม่ หรือ fetch ใหม่)
            setItems((prev) => [...prev, data.item])
            // clear form
            setName('')
            setDescription('')
        } catch (err: any) {
            console.error(err)
            setError(err.message)
        }
    }

    // 3) กำหนด columns สำหรับ DataTable
    const columns: TableColumn<Item>[] = [
        { name: 'ID', selector: (row) => row.id, width: '60px' },
        { name: 'Name', selector: (row) => row.name, sortable: true, grow: 2 },
        {
            name: 'Description',
            selector: (row) => row.description,
            sortable: true,
            grow: 3,
        },
        {
            name: 'Created At',
            selector: (row) => row.created_at ? new Date(row.created_at).toLocaleString() : '',
            sortable: true,
            grow: 2,
        },
    ]

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Items</h1>

            {/* ฟอร์ม INSERT */}
            <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
                <div>
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        className="border p-2 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea
                        className="border p-2 w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Insert
                </button>
            </form>

            {/* แสดง error ถ้ามี */}
            {error && <p className="text-red-500 mb-4">Error: {error}</p>}

            {/* DataTable แสดงรายการ */}
            <DataTable
                columns={columns}
                data={items}
                progressPending={loading}
                persistTableHead
            />
        </main>
    )
}
