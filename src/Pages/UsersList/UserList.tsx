import React from 'react';
import { UserTable } from './Components';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';

const UserList = () => {
    const {usersReducer} = useSelector((state: RootState) => state);

    return (
        <div>
            <UserTable userList={usersReducer.userList}/>
        </div>
    );
};

export default UserList;