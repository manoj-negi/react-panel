import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaUserEdit } from 'react-icons/fa';
import { BsFillTrashFill } from "react-icons/bs";

class UserList extends React.Component {

  state = {
    modal: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render () {
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
                  <Button color="primary" onClick={this.toggle}>
                    Delete
                  </Button>{' '}
                  <Button color="danger" onClick={this.toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th> Email </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td> Vikas@123.com </td>
                    <td>
                      <Button color="primary" size="sm">
                       <FaUserEdit className="mr-1" />
                        Edit
                      </Button>
                      <Button color="danger" size="sm" className="ml-1" onClick={this.toggle}>
                      <BsFillTrashFill className="mr-1"  />
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td> Vikas@123.com </td>
                    <td>
                      <Button color="primary" size="sm">
                       <FaUserEdit className="mr-1" />
                        Edit
                      </Button>
                      <Button color="danger" size="sm" className="ml-1">
                      <BsFillTrashFill className="mr-1" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td> Vikas@123.com </td>
                    <td>
                      <Button color="primary" size="sm">
                       <FaUserEdit className="mr-1" />
                        Edit
                      </Button>
                      <Button color="danger" size="sm" className="ml-1">
                      <BsFillTrashFill className="mr-1" />
                        Delete
                      </Button>
                    </td>
                  </tr>
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
