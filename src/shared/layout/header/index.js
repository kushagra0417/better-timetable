import React from 'react';
import './style.scss';
import profileImg from 'assets/sample_profile.jpg';
import { Link } from 'react-router-dom';
import config from './../../../bt.config.json';

export default function Header() {
    return (
        <>
            <header>
                <div className='brand'>
                    <img src={config.logo} alt="name" />
                    <h1>{config.name}</h1>
                </div>
                <div className='profile'>
                    <Link to="/auth">
                        <img src={profileImg} alt="name" />
                    </Link>
                </div>
            </header>
        </>
    )
}