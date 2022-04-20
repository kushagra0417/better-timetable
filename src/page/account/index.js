import axios from "axios";
import Button from "shared/button";
import TextField from "shared/textfield";
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles.scss';
import { useUser } from 'util/auth/useUser';

export default function Account() {
    const { removeUser } = useUser()
    const history = useHistory()
    const handleSignOut = () => {
        axios.get('./auth/signout').then(() => {
            removeUser();
            history.push('/timetable');
        }).catch(e => {
            alert(e.response.data);
        });
    }

    const { user } = useUser();

    const [name, setName] = useState(user.userDetails.name);
    const [designation, setDesignation] = useState(user.userDetails.role === 0 ? 'Admin' : user.userDetails.role === 1 ? 'Teacher' : user.userDetails.role === 2 ? 'visiting' : 'viewer');
    const [email, setEmail] = useState(user.userDetails.email);
    const [contactNumber, setContactNumber] = useState(user.userDetails.contactNumber || 'not set');

    useEffect(() => {
        if (email) {
            axios.get(`/staff/details?email=${email}`).then(r => {
                setContactNumber(r?.data?.contactNumber || 'xxx-xxx-xxxx');
            }).catch(() => {
                setContactNumber('error in fetching');
            });
        }
    }, [email]);

    return (
        <main>
            <div className='top'>
                <div className='meta'>
                    {/* <p>Wednesday, 24 June</p> */}
                    <h2>Account</h2>
                </div>
                <Button label="Sign Out" onClick={handleSignOut} />
            </div>
            <div className="account">
                <TextField value={name} onChange={setName} type='text' placeholder="itsme@some.org" title="name" name="account-name" styles={{ marginBottom: '12px' }} />
                <TextField value={designation} onChange={setDesignation} disabled type='text' placeholder="professor" title="role" name="account-role" styles={{ marginBottom: '12px' }} />
                <TextField value={email} onChange={setEmail} type='email' disabled={true} placeholder="itsme@some.org" title="email" name="account-email" styles={{ marginBottom: '12px' }} />
                <TextField value={contactNumber} onChange={setContactNumber} type='text' placeholder="0000000000" title="contact number" name="account-contact-number" styles={{ marginBottom: '36px' }} />
                <Button size="medium" label='Update Changes' />
            </div>
        </main>
    )
}