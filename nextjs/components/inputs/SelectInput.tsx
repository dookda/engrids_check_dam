import React from 'react'

interface Option {
    value: string
    label: string
}

interface SelectInputProps {
    label: string
    value: string
    onChange: (newValue: string) => void
    required?: boolean
    options: Option[]
}

const SelectInput = ({ label, value, onChange, required = false, options }: SelectInputProps) => {
    return (
        <div>
            <label className="block font-semibold">{label}</label>
            <select
                className="select input-bordered p-2 w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)}>
                {options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
            </select>
        </div>
    )
}

export default SelectInput