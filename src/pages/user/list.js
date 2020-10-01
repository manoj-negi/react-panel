import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaUserEdit } from 'react-icons/fa';
import { BsFillTrashFill } from "react-icons/bs";
import { Users } from '../../data.js'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class UserList extends React.Component {

  state = {
    modal: false,
    users: [],
    active: null,
    gridApi: null,
    gridColumnApi: null
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

  onGridReady = params => this.setState({
    gridApi: params.api,
    gridColumnApi: params.columnApi
  })

  HandleDelete = (e) => {
    const { gridApi } = this.state
    const selectedNodes = gridApi.getSelectedNodes()
    const { users, active } = this.state
    selectedNodes.forEach((item, i) => {
      delete users[item.childIndex]
    });

    this.setState({
      users: users,
      active: null,
      modal: false
    })
  }
  render () {

    const { users } = this.state
    console.log(users)
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

              <div className="ag-theme-alpine" style={ { height: 400, width: '100%' } }>

              <Button color="primary" size="sm">
               <FaUserEdit className="mr-1" />
                Edit
              </Button>
              <Button color="danger" size="sm" className="ml-1" onClick={() => {
                this.toggle()
              }}>
              <BsFillTrashFill className="mr-1" />
                Delete
              </Button>

                 <AgGridReact
                    onGridReady={this.onGridReady}
                    rowSelection="multiple"
                     rowData={users}>
                     <AgGridColumn field="fname" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                     <AgGridColumn field="lname" sortable={true} filter={true}></AgGridColumn>
                     <AgGridColumn field="email" sortable={true} filter={true}></AgGridColumn>
                 </AgGridReact>
             </div>

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
