interface TextareaProps {
    label?: string,
    rows?: number,
    onChange: (e: any) => void
}
export default function Textarea({
    label = "label",
    rows = 3,
    onChange
}: TextareaProps) {

    return (
        <div className="form-group mb-3">
            <label htmlFor="" className="form-label">{label}</label>
            <textarea
                className="form-control"
                rows={rows}
                onChange={(e) => onChange(e.target.value)}></textarea>
        </div>
    )

}