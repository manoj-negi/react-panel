import React from 'react';
import { Card, CardBody, CardHeader, Button, Form, Col, Row, FormGroup, Label, Input, Alert } from 'reactstrap';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { AddUser } from "../../requests/user";


class UserCreate extends React.Component {

  state = {
    email: '',
    password: '',
    cpassword: '',
    errors: [],
    status: '',
    success: false,
    fname: '',
    lname: ''
  }

  HandleSubmit = async () => {
    const { email, password, cpassword , status, fname, lname } = this.state
    const error = []
    if (!email) {
      error.push('Email is required')
    }

    if (!password) {
      error.push('Password is required')
    }

    if (!cpassword) {
      error.push('Confirm Password is required')
    }

    if (status === '') {
      error.push('Please select the status')
    }

    if (password !== cpassword) {
      error.push('Passwords Didn\'t matched ')
    }

    if (error.length > 0) {
      this.setState({
        errors: error
      })
    } else {
      const data = {
        email, password, status, fname, lname
      }
      const response = await AddUser(data)
      if (response.status === 201) {
        this.setState({
          success: true
        })
        setTimeout(() => {
          this.props.history.push('/user')
        }, 5000)
      }
    }

    setTimeout(() => {
      this.setState({
        errors: []
      })
    }, 5000)
  }

  HandleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  getErrors = () => {
    let jsx = []
    const { errors } = this.state
    if (errors) {
      jsx = errors.map((item, i) => <Alert color="danger" key={'error' + i}> {item} </Alert>)
    }
    return jsx
  }
  render () {
    const { email, password, cpassword, status, success, fname, lname } = this.state
    return (
      <Row className="m-2">
        <Col>
          <Card className="mb-3">
            <CardHeader> <BsFillPersonPlusFill className="mx-2" /> Add New Users</CardHeader>
            <CardBody>
            {
              success ? <Alert color="success" > Successfully added. </Alert> : ''
            }
              {
                this.getErrors()
              }
              <Form>

              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  First Name
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    bsSize="sm"
                    value={fname}
                    onChange={this.HandleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Last Name
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    bsSize="sm"
                    value={lname}
                    onChange={this.HandleChange}
                  />
                </Col>
              </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      bsSize="sm"
                      value={email}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    Password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      bsSize="sm"
                      value={password}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    Confirm Password
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="cpassword"
                      placeholder="Confirm Password"
                      bsSize="sm"
                      value={cpassword}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    Status
                  </Label>
                  <Col sm={10}>
                    <Input type="select" name="status" value={status} bsSize="sm"
                    onChange={this.HandleChange}
                    >
                      <option value="">select status</option>
                      <option value={true}>Active</option>
                      <option value={false}>Deactive</option>
                    </Input>
                  </Col>
                </FormGroup>
                <Button size="sm" className="float-right" onClick={this.HandleSubmit}>Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default UserCreate;
