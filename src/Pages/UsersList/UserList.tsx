import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { UserTable } from './Components';
import { RootState } from '../../Store/Store';
import { fetchUsers, fullTextSearchUsers } from '../../Store/Users';

let timing: NodeJS.Timeout | null = null;

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
    }, []);

    const handleSearchChange = (text: string, delay: number) => {

        if (!timing) {
            timing = setTimeout(() => {
                console.log('teste: ', text);
                (async () => await dispatch(await fullTextSearchUsers(text)))();
            }, delay);
            return;
        }

        clearInterval(timing);
        timing = setTimeout(() => {
            console.log('teste: ', text);
            (async () => await dispatch(await fullTextSearchUsers(text)))();
        }, delay);
    }

    return (
        <div>
            <UserTable
                addUserClick={() => history.push('/create')}
                userList={usersReducer.userList ? usersReducer.userList : []}
                onSearchChange={(text) => handleSearchChange(text, 600)}/>
        </div>
    );
};

export default UserList;