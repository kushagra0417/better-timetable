// file to handle theme of the whole frontend
// it exposes APIs like setTheme and getTheme which makes it easy to use
export default function setTheme() {
    let theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        setDarkTheme();
    } else if (theme === 'light') {
        setLightTheme();
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkTheme();
        } else {
            setLightTheme();
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches === "dark") {
                setDarkTheme();
            } else {
                setLightTheme();
            }
        });
    }
}

function setLightTheme() {
    document.querySelector('html').setAttribute("data-theme", "light");
}

function setDarkTheme() {
    document.querySelector('html').setAttribute("data-theme", "dark");
}

export function changeTheme(value) {
    localStorage.setItem('theme', value);
    setTheme();
}

export function getTheme() {
    return localStorage.getItem('theme') || 'system';
}