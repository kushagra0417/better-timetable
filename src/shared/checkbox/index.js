import './styles.scss';

function CBOption({ label }) {
    return (
        <label className='checkbox_option'>
            <input class="styled-checkbox" id="styled-checkbox-2" type="checkbox" value="value2" />
            <label for="styled-checkbox-2">{label}</label>
        </label>
    )
}

export default function Checkbox({ options = [], title, checked, setChecked, style = {} }) {
    return (
        <>
            {/* {title} */}
            < div className='checkbox' style={style} >
                <label>{title}</label>
                <div className='options'>
                    {
                        options.map(option =>
                            <CBOption label={option.label} checked={checked.includes(option.value)} onChange={setChecked} />
                        )
                    }
                </div>
            </ div>
        </>
    )
}