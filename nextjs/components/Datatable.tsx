'use client'

import React, { useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

interface ItemType {
    id: number
    name: string
    description: string
    created_at?: string
}

const DataTableComponent = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    async function fetchData() {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/items')
            if (!res.ok) {
                throw new Error('Failed to fetch items')
            }
            const data = await res.json()
            console.log('data:', data);

            setItems(data.items || [])
        } catch (err: any) {
            console.error(err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // กำหนด columns สำหรับ react-data-table-component
    const columns: TableColumn<ItemType>[] = [
        { name: 'ID', selector: (row) => row.id, width: '60px' },
        { name: 'Name', selector: (row) => row.name, sortable: true, grow: 2 },
        { name: 'Description', selector: (row) => row.description, sortable: true, grow: 3 },
        {
            name: 'Created At',
            selector: (row) => row.created_at ? new Date(row.created_at).toLocaleString() : '',
            sortable: true,
            grow: 2,
        },
    ]

    // ในกรณีมี error หรือ loading สามารถจัดการ UI ได้
    if (error) {
        return <p className="text-red-500">Error: {error}</p>
    }

    return (
        <DataTable
            title="Items"
            columns={columns}
            data={items}
            progressPending={loading}
            persistTableHead
        />
    )
}

export default DataTableComponent