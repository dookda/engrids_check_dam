import Map from '@/components/Map'
import React from 'react'

const page = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>This is the dashboard page</p>

            <div className="grid grid-cols-2 gap-4">
                <div className="card shadow-lg bg-base-100">
                    <div className="card-body">
                        <h2>Card 1</h2>
                        <p>This is the first card</p>
                    </div>
                </div>
                <div className="card shadow-lg bg-base-100">
                    <div className="card-body">
                        <h2>Card 2</h2>
                        <p>This is the second card</p>
                    </div>
                </div>

                <Map />
            </div>

        </div>
    )
}

export default page