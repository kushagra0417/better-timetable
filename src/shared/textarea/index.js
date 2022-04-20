import './styles.scss';

export default function TextArea({ title, rows = 12, placeholder = "", name, styles = {}, value = '', onChange = () => { }, disabled = false }) {
    return (
        <div className="text_area" style={styles}>
            <label htmlFor={name}>{title}</label>
            {value ?
                <textarea rows={rows} disabled={disabled} value={value} name={name} id={name} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
                : <textarea rows={rows} disabled={disabled} name={name} id={name} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
            }
        </div>
    )

}