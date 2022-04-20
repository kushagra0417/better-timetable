import TextField from 'shared/textfield';
import { RiShieldUserLine } from 'react-icons/ri';
import { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

export default function Reset() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleReset = (e) => {
        e.preventDefault();

        axios.post('./auth/reset', {
            email,
            newPassword: password
        }).then((res) => {
            if (res.data.emailSent) {
                alert("Check your email");
            } else {
                alert('server error');
            }
            history.push('/');
        }).catch(e => {
            alert(e.response.data.error)
        })
    }


    return (
        <form>
            <div className='top'>
                <i><RiShieldUserLine /></i>
                <h2>Hello Again!</h2>
                <p>Enter your Email to receive the recovery Email</p>
            </div>
            <TextField value={email} onChange={setEmail} type='email' placeholder="itsme@some.org" title="email" name="recover-email" />
            <TextField value={password} onChange={setPassword} styles={{ marginTop: '18px' }} type='password' placeholder="***" title="password" name="recover-password" />
            <button className='auth_button' disabled={!email || !password} onClick={handleReset}>Set new Password</button>

            <p className='bottom_link'>Don't have an account? <Link to="/auth/signup">signup</Link></p>

        </form>
    )
}