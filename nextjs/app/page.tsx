// app/page.tsx
import pool, { testDBConnection } from '@/db'

export default async function Home() {
  // ทดสอบการเชื่อมต่อ (optional)
  await testDBConnection()

  // ลอง query ข้อมูล (สมมติว่าเรามีตาราง users)
  let users: any[] = []
  try {
    const result = await pool.query('SELECT id, name, email FROM users')
    users = result.rows
  } catch (error) {
    console.error('Error fetching users:', error)
  }

  return (
    <main>
      <h1>da + Docker Compose</h1>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </main>
  )
}
