import React from 'react';
import { NavLink } from "react-router-dom";
import './styles.scss';
import { RiTableFill, RiAccountCircleFill } from 'react-icons/ri';
import { FaClipboardList } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { AiTwotoneSetting } from 'react-icons/ai';
const NAVLINKS = {
    dashboard: {
        icon: <MdDashboard />,
        label: 'Dashboard'
    },
    timetable: {
        icon: <RiTableFill />,
        label: 'Timetable'
    },
    notice: {
        icon: <FaClipboardList />,
        label: 'Notice Board'
    },
    account: {
        icon: <RiAccountCircleFill />,
        label: 'Account'
    },
    settings: {
        icon: <AiTwotoneSetting />,
        label: 'Settings'
    }

}

export default function SideNav() {
    return (
        <nav>
            {Object.keys(NAVLINKS).map(nl => (
                <NavLink to={'/' + nl} activeclassname="active" key={nl}>
                    <div className='navLink'>
                        {NAVLINKS[nl].icon}
                        <p>{NAVLINKS[nl].label}</p>
                    </div>
                </NavLink>
            ))}
        </nav>
    )
}