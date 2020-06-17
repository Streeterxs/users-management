import React from 'react';
import { Table, Button, Icon, Checkbox } from 'semantic-ui-react';
import { Usuario } from '../../../Store/Users/User';

export type UserTableProps = {
    userList: Usuario[]
}
const UserTable = ({userList}: UserTableProps) => {
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
                    <Table.Row>
                        <Table.Cell collapsing>
                        <Checkbox slider />
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
                >
                  <Icon name='user' /> Add User
                </Button>
                <Button size='small'>Approve</Button>
                <Button disabled size='small'>
                  Approve All
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
    );
};

export default UserTable;