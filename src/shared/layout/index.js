import Header from './header';
import SideNav from './nav';
import './styles.scss';
export default function Layout({ children }) {
    return (
        <div className="app">
            <Header />
            <SideNav />
            {children}
        </div>
    )
}