import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { UserTable } from './Components';
import { RootState } from '../../Store/Store';
import { fetchUsers, fullTextSearchUsers, optmisticSearch } from '../../Store/Users';

let timing: NodeJS.Timeout | null = null;

const UserList = () => {
    const {usersReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!usersReducer.userList) (async () => await dispatch(await fetchUsers()))();
    }, []);

    const handleSearchChange = (text: string, delay: number) => {
        dispatch(optmisticSearch(text))
        if (!timing) {
            timing = setTimeout(() => {
                (async () => await dispatch(await fullTextSearchUsers(text)))();
            }, delay);
            return;
        }

        clearInterval(timing);
        timing = setTimeout(() => {
            (async () => await dispatch(await fullTextSearchUsers(text)))();
        }, delay);
    }

    return (
        <div>
            <UserTable
                addUserClick={() => history.push('/create')}
                onDetailsClick={(userId) => history.push(`/edit/${userId}`)}
                userList={usersReducer.filteredUserList ? usersReducer.filteredUserList : []}
                onSearchChange={(text) => handleSearchChange(text, 600)}/>
        </div>
    );
};

export default UserList;