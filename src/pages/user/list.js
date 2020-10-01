import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaUserEdit } from 'react-icons/fa';
import { BsFillTrashFill } from "react-icons/bs";
import { Users } from '../../data.js'

class UserList extends React.Component {

  state = {
    modal: false,
    users: [],
    active: null
  }

  componentDidMount () {
    this.setState({
      users: Users
    })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  HandleDelete = () => {
    console.log(this.state.active)
    const { users, active } = this.state
    delete users[active]
    this.setState({
      users: users,
      active: null,
      modal: false
    })
  }
  render () {

    const { users } = this.state
    return (
      <Row className="m-2">
        <Col>
          <Card className="mb-3">
            <CardHeader>All Users</CardHeader>
            <CardBody>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Delete User</ModalHeader>
                <ModalBody>
                  Are you sure? you want to delete. <br />
                  This action is irreversible.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.HandleDelete} size="sm">
                    Delete
                  </Button>{' '}
                  <Button color="danger" onClick={this.toggle} size="sm">
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <Table responsive>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th> Email </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                {
                  users.map((item, index) =>
                    <tr key={'users' + item.fname}>
                      <td> {item.fname} </td>
                      <td> {item.lname} </td>
                      <td> {item.fname} </td>
                      <td> {item.email} </td>
                      <td>
                        <Button color="primary" size="sm">
                         <FaUserEdit className="mr-1" />
                          Edit
                        </Button>
                        <Button color="danger" size="sm" className="ml-1" onClick={() => {
                          this.setState({
                            active: index
                          })
                          this.toggle()
                        }}>
                        <BsFillTrashFill className="mr-1"  />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
                }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default UserList;
