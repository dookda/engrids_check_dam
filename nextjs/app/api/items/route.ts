import { NextResponse } from 'next/server'
import pool from '@/db'

// 1) GET: ดึงรายการทั้งหมดจากตาราง items
export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM items ORDER BY id ASC')
        return NextResponse.json({ items: result.rows }, { status: 200 })
    } catch (error) {
        console.error('Error fetching items:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

// 2) POST: รับ JSON (name, description) เพื่อ INSERT ลง DB
export async function POST(request: Request) {
    try {
        const data = await request.json()
        const { name, description } = data

        // Validate เบื้องต้น
        if (!name || !description) {
            return NextResponse.json(
                { error: 'Missing name or description' },
                { status: 400 },
            )
        }

        // INSERT
        const queryText = `
      INSERT INTO items (name, description)
      VALUES ($1, $2)
      RETURNING *
    `
        const values = [name, description]

        const client = await pool.connect()
        const result = await client.query(queryText, values)
        client.release()

        const insertedItem = result.rows[0]
        return NextResponse.json({ item: insertedItem }, { status: 201 })
    } catch (error) {
        console.error('Error inserting item:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

