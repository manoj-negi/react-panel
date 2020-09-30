import React from 'react';
import { Card, CardBody, CardHeader, Button, Form, Col, Row, FormGroup, Label, Input, Alert } from 'reactstrap';
import { BsFillPersonPlusFill } from "react-icons/bs";

class UserCreate extends React.Component {

  state = {
    email: '',
    password: '',
    cpassword: '',
    errors: [],
    status: ''
  }

  HandleSubmit = () => {
    const { email, password, cpassword , status} = this.state
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

    if (error) {
      this.setState({
        errors: error
      })

      setTimeout(() => {
        this.setState({
          errors: []
        })
      }, 5000)
    }
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
    const { email, password, cpassword, status } = this.state
    return (
      <Row className="m-2">
        <Col>
          <Card className="mb-3">
            <CardHeader> <BsFillPersonPlusFill className="mx-2" /> Add New Users</CardHeader>
            <CardBody>
              {
                this.getErrors()
              }
              <Form>
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
