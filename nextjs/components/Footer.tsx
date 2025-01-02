// components/Footer.tsx
import React from 'react'

export default function Footer() {
    return (
        <footer className="footer p-4 bg-base-200 text-base-content footer-center">
            <div>
                <p>Copyright © {new Date().getFullYear()} - All right reserved.</p>
            </div>
        </footer>
    )
}
