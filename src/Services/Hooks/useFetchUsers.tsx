import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchUsers } from '../../Store/Users';

const useFetchUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => await dispatch(await fetchUsers()))();
    }, []);
};

export default useFetchUsers;