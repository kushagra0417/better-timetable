import { useState } from 'react';
import { changeTheme, getTheme } from 'util/theme';
import Select from 'shared/select';
import './styles.scss';
import Radio from 'shared/radio';

function ThemeSetting() {
    const options = [
        { value: 'dark', label: '🌙 Dark' },
        { value: 'light', label: '☀️ Light' },
        { value: 'system', label: '💻 System' },
    ];
    const [theme, setTheme] = useState(getTheme());
    return (
        <div className='setting'>
            <p>theme</p>
            <Select options={options}
                value={options[theme === 'light' ? 1 : theme === 'dark' ? 0 : 2]}
                onChange={(e) => {
                    setTheme(e.value);
                    changeTheme(e.value);
                }}
            />
        </div>
    )
}

function ClockTypeSetting() {
    const options = [
        { value: '24', label: '24 hour' },
        { value: '12', label: '12 hour' },
    ];
    return (
        <div className='setting'>
            <p>clock type</p>
            <Select options={options}
                value={options[0]}
                onChange={(e) => {
                    console.log(e.value);
                }}
            />
        </div>
    )
}

function NotificationSetting() {
    const options = [
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' },
    ];
    return (
        <div className='setting'>
            <p>do you want to get push notifications?</p>
            <Radio options={options} name="noti" defaultSelected={2} onChange={(e) => { console.log(e) }} />
        </div>
    )
}

function ShowClockSetting() {
    const options = [
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' },
    ];
    return (
        <div className='setting'>
            <p>show clock</p>
            <Radio options={options} name="show-clock" defaultSelected={2} onChange={(e) => { console.log(e) }} />
        </div>
    )
}

export default function Settings() {
    return (
        <main>
            <div className='top'>
                <div className='meta'>
                    <h2>Settings</h2>
                </div>
            </div>
            <div className='settings'>
                <ThemeSetting />
                <ClockTypeSetting />
                <NotificationSetting />
                <ShowClockSetting />
            </div>
            {/**
             * theme
             * default timetable
             * time type
             * notification
             * show clock
             * clock type  
             **/}
        </main>
    )
}