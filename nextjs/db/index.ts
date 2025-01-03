import { Pool } from 'pg'

// ดึง environment variables มาจาก process.env
const host = process.env.DB_HOST || 'localhost'
const port = parseInt(process.env.DB_PORT || '5432', 10)
const user = process.env.DB_USER || 'myuser'
const password = process.env.DB_PASSWORD || 'mypassword'
const database = process.env.DB_NAME || 'mydatabase'

// สร้าง pool เพื่อจัดการ connection
const pool = new Pool({
    host,
    port,
    user,
    password,
    database,
    // สามารถกำหนด option อื่น ๆ เช่น max, idleTimeoutMillis ฯลฯ
})

export default pool