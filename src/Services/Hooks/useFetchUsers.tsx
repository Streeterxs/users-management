import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchUsers } from '../../Store/Users';

const useFetchUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('teste');
        (async () => await dispatch(await fetchUsers()))();
    }, []);
};

export default useFetchUsers;