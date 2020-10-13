import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { FaUserEdit } from 'react-icons/fa';
import { BsFillTrashFill } from "react-icons/bs";
import { Users } from '../../data.js'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { GetUsers, DeleteUser } from "../../requests/user";


class UserList extends React.Component {

  state = {
    modal: false,
    users: [],
    active: null,
    gridApi: null,
    gridColumnApi: null,
    error: ''
  }

  componentDidMount () {
    this.getData()
  }

  getData = async () => {
    const response = await GetUsers()
    const users = response.data
    this.setState({
      users: users
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
    const selectedRowData = gridApi.getSelectedRows()
    selectedRowData.map(async (item, i) => {
      const response = await DeleteUser(item.id)
    })
    gridApi.applyTransaction({ remove: selectedRowData });
    this.setState({
      modal: false
    })
  }

  handleEdit = (e) => {
    const { gridApi } = this.state
    const selectedRowData = gridApi.getSelectedRows()
    if (selectedRowData.length === 0) {
      this.setState({
        error: 'Please select the user first'
      })
    } else {
      const list = selectedRowData[0]
      this.props.history.push('/user/create?id=' + list.id)
    }

    setTimeout(() => {
      this.setState({
        error: ''
      })
    }, 5000)
  }

  render () {

    const { users, error } = this.state
    console.log(error)
    return (
      <Row className="m-2">
        <Col>
          <Card className="mb-3">
            <CardHeader>All Users</CardHeader>
            <CardBody>
            {
              error ? <Alert color="danger"> {error} </Alert> : ''
            }
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

              <div className="ag-theme-alpine my-4 pb-4" style={ { height: 500, width: '100%' } }>

              <Button color="primary" size="sm" onClick={this.handleEdit}>
                 <FaUserEdit className="mr-1" />
                  Edit
              </Button>
              <Button color="danger" size="sm" className="my-1 mx-2" onClick={() => {
                this.toggle()
              }}>
              <BsFillTrashFill className="mr-1" />
                Delete
              </Button>
              <div className="h-100 py-2">
                <AgGridReact
                   onGridReady={this.onGridReady}
                   rowSelection="multiple"
                    rowData={users}>
                    <AgGridColumn headerName="First Name" field="fname" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                    <AgGridColumn headerName="Last Name" field="lname" sortable={true} filter={true}></AgGridColumn>
                    <AgGridColumn headerName="Email" field="email" sortable={true} filter={true}></AgGridColumn>
                    <AgGridColumn headerName="Status" field="status" sortable={true} filter={true}></AgGridColumn>
                </AgGridReact>
              </div>
             </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default UserList;
