import React from 'react'

interface TextAreaInputProps {
    label: string
    value: string
    onChange: (newValue: string) => void
    required?: boolean
    rows?: number
}
const TextAreaInput = ({ label, value, onChange, required = false, rows = 3 }: TextAreaInputProps) => {
    return (
        <div>
            <label className="block font-semibold">{label}</label>
            <textarea
                className="textarea p-2 w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                rows={rows}
            />
        </div>
    )
}

export default TextAreaInput