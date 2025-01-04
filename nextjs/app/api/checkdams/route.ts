import React from 'react'
import pool from '@/db'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const result = await pool.query('SELECT * FROM checkdam ORDER BY gid ASC')

        return NextResponse.json({ items: result.rows }, { status: 200 })
    } catch (error) {
        console.error('Error fetching items:', error)
        return { error: 'Internal Server Error' }

    }
}

// insert checkdam
export const POST = async (request: Request) => {
    try {
        const data = await request.json()
        const { name, creator, description, checkDamType, lat, lng } = data

        // Validate เบื้องต้น
        if (!name || !creator || !description || !checkDamType) {
            return NextResponse.json(
                { error: 'Missing name or creator or description or checkDamType' },
                { status: 400 },
            )
        }

        // INSERT
        const queryText = `
        INSERT INTO checkdam (cdname, cdcreator, cddetail, cdtype, lat, lng)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `
        const values = [name, creator, description, checkDamType, lat, lng]
        console.log(values)
        const client = await pool.connect()
        const result = await client.query(queryText, values)
        client.release()

        const insertedItem = result.rows[0]
        return NextResponse.json({ item: insertedItem }, { status: 201 })
    } catch (error) {
        console.error('Error inserting item:', error)
        return { error: 'Internal Server Error' }
    }
}


