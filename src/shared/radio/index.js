import React from 'react';
import './styles.scss';

function RadioBtn({ index, name = "", label = "", value = "", onChange, checked = false }) {
    return (
        <div className="radioBtn">
            <input
                type="radio"
                name={name}
                id={name + label}
                onChange={() => onChange(index)}
                value={value}
                defaultChecked={checked} />
            <label htmlFor={name + label}>{label}</label>
        </div>
    );
}

export default function Radio({ title = "", name, options, onChange = () => { }, defaultSelected = null, styles = {} }) {
    return (
        <div className='radio' style={styles}>
            {title &&
                <label htmlFor={name}>{title}</label>
            }
            <div className={"radioOptions"}>
                {options.map((option, i) => (
                    <RadioBtn
                        label={option.label}
                        value={option.value}
                        name={name}
                        index={i}
                        checked={i === defaultSelected}
                        onChange={onChange}
                    />
                )
                )}
            </div>
        </div>
    );
}