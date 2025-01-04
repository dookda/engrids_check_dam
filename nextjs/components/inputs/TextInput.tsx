"use client"
import React from 'react'

interface TextInputProps {
    label: string
    value: string
    onChange: (newValue: string) => void
    required?: boolean
}

const TextInput = ({ label, value, onChange, required = false }: TextInputProps) => {
    return (
        <div>
            <label className="block font-semibold">{label}</label>
            <input
                type="text"
                className="input p-2 w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
            />
        </div>
    )
}

export default TextInput