import Select2 from 'react-select';
import CreatableSelect from 'react-select/creatable';
import './styles.scss';

export default function Select({ options, value, onChange, styles = {}, name = '', title = '', creatable = false, multiple = false }) {



    return (
        <div className="select" style={styles}>
            <label htmlFor={name}>{title}</label>

            {creatable ?
                <CreatableSelect
                    isClearable
                    onChange={(e) => onChange(e)}
                    options={options}
                    classNamePrefix='btt' className='btt-container' theme={(theme) => ({
                        ...theme,
                        borderRadius: "4px",
                        colors: {
                            ...theme.colors,
                            primary50: "var(--light-gray)",
                            primary25: "var(--gray)",
                            primary: "var(--gray)",
                            neutral80: "var(--gray)",
                        },
                    })}
                />
                :
                <Select2 options={options}
                    value={value} classNamePrefix='btt' className='btt-container' theme={(theme) => ({
                        ...theme,
                        borderRadius: "4px",
                        colors: {
                            ...theme.colors,
                            primary50: "var(--light-gray)",
                            primary25: "var(--gray)",
                            primary: "var(--gray)",
                            neutral80: "var(--gray)",
                        },
                    })}
                    isMulti={multiple}
                    onChange={(e) => onChange(e)}
                />
            }
        </div>
    )
}