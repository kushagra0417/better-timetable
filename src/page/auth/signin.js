import { Link, useHistory } from 'react-router-dom';
import TextField from 'shared/textfield';
import { RiShieldUserLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import axios from 'axios';
import { useUser } from 'util/auth/useUser';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();

    const history = useHistory();

    const handleSignIn = (e) => {
        e.preventDefault();

        axios.post('./auth/signin', {
            email,
            password
        }).then((res) => {


            setUser(res.data);
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
                <p>Login with your email and password to get authorized</p>
            </div>
            <TextField value={email} onChange={setEmail} type='email' placeholder="itsme@some.org" title="email" name="login-email" />
            <TextField value={password} onChange={setPassword} styles={{ marginTop: '18px' }} type='password' placeholder="password" title="password" name="login-password" />
            <div className='form-options'>
                <div>
                    {/* <input id="remember-me" type='checkbox' /> */}
                    {/* <label htmlFor="remember-me">Remember me</label> */}
                </div>
                <Link to="/auth/reset">
                    <span>Reset password</span>
                </Link>
            </div>
            <button className='auth_button' disabled={!email || !password} onClick={handleSignIn}>Login</button>
            <p className='or'>or</p>
            <button className='auth_button auth_google_button'><FcGoogle /><span>Authorize with Google</span></button>
            <p className='bottom_link'>Don't have a student account yet? <Link to="/auth/signup">signup</Link></p>
        </form>
    )
}