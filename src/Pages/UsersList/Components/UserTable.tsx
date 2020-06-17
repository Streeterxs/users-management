import React from 'react';
import { Table, Button, Icon, Checkbox, Input } from 'semantic-ui-react';
import { Usuario } from '../../../Store/Users/User';

export type UserTableProps = {
    userList: Usuario[],
    addUserClick: () => void,
    onSearchChange: (searchText: string) => void,
    onDetailsClick: (userId: number) => void
}
const UserTable = ({userList, addUserClick, onSearchChange, onDetailsClick}: UserTableProps) => {
    return (
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>CPF</Table.HeaderCell>
              <Table.HeaderCell>E-mail</Table.HeaderCell>
              <Table.HeaderCell>Cidade</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
      
          <Table.Body>
              {
                userList.map((user) => {
                    return (
                    <Table.Row key={user.id}>
                        <Table.Cell collapsing>
                          <Button
                            icon="search"
                            primary
                            circular
                            size='small'
                            onClick={() => {
                              onDetailsClick(user.id ? user.id : 0)
                            }}
                          />
                        </Table.Cell>
                        <Table.Cell>{user?.nome}</Table.Cell>
                        <Table.Cell>{user?.cpf}</Table.Cell>
                        <Table.Cell>{user?.email}</Table.Cell>
                        <Table.Cell>{user?.endereco?.cidade}</Table.Cell>
                    </Table.Row>
                    );
                })
              }
          </Table.Body>
      
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                <Button
                  floated='right'
                  icon
                  labelPosition='left'
                  primary
                  size='small'
                  onClick={addUserClick}
                >
                  <Icon name='user' /> Adicionar Usuário
                </Button>
                Buscar: <Input onChange={(e, {value}) => onSearchChange(value)} type="test" placeholder="Ex.: Joe Dohan" size='small'/>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
    );
};

export default UserTable;