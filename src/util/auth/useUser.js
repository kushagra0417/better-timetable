import { useState } from 'react';

// this file is to handel user related authentication and authorization.

export const useUser = () => {
    const [user, _setUser] = useState(() => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
        const id = localStorage.getItem('id')
        if (id && userDetails) {
            return ({ id, userDetails });
        } else {
            return (null);
        }
    });

    const setUser = ({ _id: id, userDetails }) => {
        localStorage.setItem('id', id);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        _setUser({ id, userDetails });
    }

    const removeUser = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('userDetails');

        _setUser(null);
    }

    return { user, setUser, removeUser };
}