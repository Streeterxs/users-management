import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { UserTable } from './Components';
import { RootState } from '../../Store/Store';
import { fetchUsers } from '../../Store/Users';

const UserList = () => {
    const {usersReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('use effect!!!!!!', usersReducer.userList);
        if (!usersReducer.userList) (async () => await dispatch(await fetchUsers()))();

        return () => {
            console.log('unmount')
        }
    }, []) 

    return (
        <div>
            <UserTable addUserClick={() => history.push('/create')} userList={usersReducer.userList ? usersReducer.userList : []}/>
        </div>
    );
};

export default UserList;