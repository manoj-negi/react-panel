import React from 'react';
import { Card, CardBody, CardHeader, Button, Form, Col, Row, FormGroup, Label, Input, Alert } from 'reactstrap';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { GetSettings } from "../requests/settings";
import { AddUser } from "../requests/user";


class Settings extends React.Component {

  state = {
    errors: [],
    success: false,
    data: {}
  }

  componentDidMount () {
    this.getData()
  }

  getData = async () => {
    const response = await GetSettings()
    const data = response.data
    console.log(data)
    this.setState({
      data: data
    })
  }

  HandleSubmit = async () => {
    const { logo, theame, admin_email, more_email, maintance_mode, version, limit, offset, title, tagline, facebook, google, instagram, twitter, linkedn, g_api_key, g_analytics_key, date_format, thumbnail } = this.state.data
    const error = []
    if (!logo) {
      error.push('Logo is required')
    }

    if (!theame) {
      error.push('Theame is required')
    }

    if (!admin_email) {
      error.push('Admin Email is required')
    }

    if (!admin_email) {
      error.push('Admin Email is required')
    }

    if (maintance_mode === '') {
      error.push('Please select the Maintaince Mode')
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
    const { data, success, errors } = this.state
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
                  Logo
                </Label>
                <Col sm={10}>
                  <Input
                    type="file"
                    name="logo"
                    placeholder="First Name"
                    bsSize="sm"
                    onChange={this.HandleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Theame
                </Label>
                <Col sm={10}>
                <Input type="select" name="theame" value={data.theame} bsSize="sm"
                onChange={this.HandleChange}
                >
                  <option value="" disabled>Select Theame</option>
                  <option value={true}>Primary</option>
                  <option value={false}>Secondary</option>
                </Input>
                </Col>
              </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Admin Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="email"
                      placeholder="Admin Email"
                      bsSize="sm"
                      value={data.admin_email}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    More Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      bsSize="sm"
                      value={""}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    Maintance Mode
                  </Label>
                  <Col sm={10}>
                    <Input type="select" name="maintance_mode" value={data.maintance_mode} bsSize="sm"
                    onChange={this.HandleChange}
                    >
                      <option value="" disabled>Select Maintance Mode</option>
                      <option value={true}>On</option>
                      <option value={false}>Off</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>
                    Version
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="number"
                      name="version"
                      placeholder="Version"
                      bsSize="sm"
                      value={data.version}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>
                    Limit
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="number"
                      name="limit"
                      placeholder="Limit"
                      bsSize="sm"
                      value={data.limit}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>
                    Offset
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="number"
                      name="offset"
                      placeholder="Offset"
                      bsSize="sm"
                      value={data.offset}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>
                    Title
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="title"
                      placeholder="Title"
                      bsSize="sm"
                      value={data.title}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>
                    Tagline
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="tagline"
                      placeholder="Tagline"
                      bsSize="sm"
                      value={data.tagline}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>
                    Facebook
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="url"
                      name="facebook"
                      placeholder="Facebook"
                      bsSize="sm"
                      value={data.facebook}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>
                    Google
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="url"
                      name="google"
                      placeholder="Google"
                      bsSize="sm"
                      value={data.google}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>
                    Twitter
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="url"
                      name="twitter"
                      placeholder="Twitter"
                      bsSize="sm"
                      value={data.twitter}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>
                    Instagram
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="url"
                      name="instagram"
                      placeholder="Instagram"
                      bsSize="sm"
                      value={data.instagram}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>
                    Google Api Key
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="g_api_key"
                      placeholder="Google Api Key"
                      bsSize="sm"
                      value={data.g_api_key}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2}>
                    Google Api Key
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="g_analytics_key"
                      placeholder="Google Analytics Key"
                      bsSize="sm"
                      value={data.g_analytics_key}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    Date Format
                  </Label>
                  <Col sm={10}>
                    <Input type="select" name="maintance_mode" value={data.date_format} bsSize="sm"
                    onChange={this.HandleChange}
                    >
                      <option value="" disabled>Select Date Format</option>
                      <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    Thumbnail
                  </Label>
                  <Col sm={5}>
                      <Input
                        type="text"
                        name="g_analytics_key"
                        placeholder="Thumbnail Width"
                        bsSize="sm"
                        value={data.g_analytics_key}
                        onChange={this.HandleChange}
                    />
                    </Col>
                    <Col sm={5}>
                      <Input
                        type="text"
                        name="g_analytics_key"
                        placeholder="Thumbnail Height"
                        bsSize="sm"
                        value={data.g_analytics_key}
                        onChange={this.HandleChange}
                    />
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

export default Settings;
