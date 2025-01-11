
interface InputProps {
    type?: string,
    label: string,
    value?: string,
    onChange: (e: any) => void
}

export default function Input({
    type = "text",
    label = "label",
    value,
    onChange
}: InputProps) {

    return (
        <div className="form-group">
            <label htmlFor="">{label}</label>
            <input
                type={type}
                className="form-control"
                value={value}
                onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}