import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaUserEdit } from 'react-icons/fa';
import { BsFillTrashFill } from "react-icons/bs";
import { Users } from '../../data.js'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { GetUsers } from "../../requests/user";


class UserList extends React.Component {

  state = {
    modal: false,
    users: [],
    active: null,
    gridApi: null,
    gridColumnApi: null
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
    gridApi.applyTransaction({ remove: selectedRowData });
    this.setState({
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

              <div className="ag-theme-alpine" style={ { height: 400, width: '100%' } }>

            {/*  <Button color="primary" size="sm">
               <FaUserEdit className="mr-1" />
                Edit
              </Button> */}
              <Button color="danger" size="sm" className="my-1" onClick={() => {
                this.toggle()
              }}>
              <BsFillTrashFill className="mr-1" />
                Delete
              </Button>

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
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default UserList;
