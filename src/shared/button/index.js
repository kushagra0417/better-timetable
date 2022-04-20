import './styles.scss';

export default function Button({ size = "small", label = '', onClick = () => { }, icon = null, disabled = false, styles = {} }) {
    return (
        <button className={size} onClick={onClick} style={styles} disabled={disabled}>{label}
            {icon &&
                <span className={label === '' ? 'noLabel' : ''}>
                    {icon}
                </span>
            }
        </button>
    )
}