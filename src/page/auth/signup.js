import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextField from 'shared/textfield';
import { RiShieldUserLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleSignUp = (e) => {
        e.preventDefault();

        axios.post('./auth/signup', {
            email,
            password
        }).then(() => {
            history.push('/auth');
        }).catch(e => {
            alert(e.response.data.error)
        })
    }


    return (
        <form>
            <div className='top'>
                <i><RiShieldUserLine /></i>
                <h2>Welcome!</h2>
                <p>Enter your email and password to get authorized</p>
            </div>
            <TextField value={email} onChange={setEmail} type='email' placeholder="itsme@some.org" title="email" name="login-email" />
            <TextField value={password} onChange={setPassword} styles={{ marginTop: '18px' }} type='password' placeholder="password" title="password" name="login-password" />
            <div className='form-options'>
                <div>
                    {/* <input id="remember-me" type='checkbox' /> */}
                    {/* <label htmlFor="remember-me">Remember me</label> */}
                </div>
            </div>
            <button className='auth_button' disabled={!email || !password} onClick={handleSignUp}>SignUp</button>
            <p className='or'>or</p>
            <button className='auth_button auth_google_button'><FcGoogle /><span>Authorize with Google</span></button>
            <p className='bottom_link'>Already have an account? <Link to="/auth">login</Link></p>
        </form>
    );
}