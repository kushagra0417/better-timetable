import './styles.scss';

export default function TextField({ title, type, placeholder = "", name, styles = {}, value = '', onChange = () => { }, disabled = false }) {
    return (
        <div className="text_field" style={styles}>
            <label htmlFor={name}>{title}</label>
            {value ?
                <input disabled={disabled} value={value} name={name} id={name} type={type} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
                : <input disabled={disabled} name={name} id={name} type={type} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
            }
        </div>
    )

}