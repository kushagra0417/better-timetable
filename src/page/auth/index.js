import { Route, Switch } from 'react-router-dom';
import './styles.scss';
import logo from 'assets/logo.svg';
import appSs from 'assets/app-light.png';
import SignIn from './signin';
import SignUp from './signup';
import Reset from './reset';
export default function Auth() {
    return (
        <div className="auth">
            <div className='container'>
                <div className='promo'>
                    <img src={logo} className="logo" alt="name" />
                    <div className='text'>
                        <h2>Designed for Schools and Colleges</h2>
                        <p>The checkbox size can be set by using height and width property. The height</p>
                    </div>
                    <img src={appSs} alt="app"></img>
                </div>
                <Switch>
                    <Route path="/auth/signup" children={<SignUp />} />
                    <Route path="/auth/reset" children={<Reset />} />
                    <Route path="/auth" children={<SignIn />} />
                </Switch>
            </div>
        </div>
    )
}