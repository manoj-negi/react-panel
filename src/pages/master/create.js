import React from 'react';
import { Card, CardBody, CardHeader, Button, Form, Col, Row, FormGroup, Label, Input, Alert } from 'reactstrap';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { AddMaster } from "../../requests/master.js";
import { withRouter } from 'react-router';

class UserCreate extends React.Component {

  state = {
    title: '',
    description: '',
    slug: '',
    thumbnail: null,
    errors: [],
    status: '',
    parent: '',
    success: false
  }

  HandleSubmit = async () => {
    const { title, description, slug, parent, thumbnail, status } = this.state
    const error = []
    if (!title) {
      error.push('Title is required')
    }

    if (!description) {
      error.push('Description is required')
    }

    if (!slug) {
      error.push('Slug is required')
    }

    if (status === '') {
      error.push('Please select the status')
    }

    if (!thumbnail) {
      error.push('Thumbnail is required')
    }

    if (error) {
      this.setState({
        errors: error
      })

    if (error.length === 0) {
      const formData = new FormData();
      formData.append('title', title)
      formData.append('description', description)
      formData.append('status', status)
      formData.append('thumbnail', thumbnail, thumbnail.name)
      formData.append('slug', slug)
      formData.append('parent', parent)
      const data = { title, description, slug, parent, thumbnail, status }
      const response = await AddMaster(data)
      if (response.status === 201) {
        this.setState({
          success: true
        })
        setTimeout(() => {
          this.props.history.push('/master')
        }, 5000)
      }
    }
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

  HandleFileChange = event => {
    const file = event.target.files[0]
    this.setState({
      thumbnail: file
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
    const { title, description, slug, parent, thumbnail, status, success } = this.state
    return (
      <Row className="m-2">
        <Col>
          <Card className="mb-3">
            <CardHeader> <BsFillPersonPlusFill className="mx-2" /> Add New Master</CardHeader>
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
                    Title
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="title"
                      placeholder="title"
                      bsSize="sm"
                      value={title}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    Description
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="description"
                      placeholder="description"
                      bsSize="sm"
                      value={description}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    Slug
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="slug"
                      placeholder="slug"
                      bsSize="sm"
                      value={slug}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    Parent
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="parent"
                      placeholder="parent"
                      bsSize="sm"
                      value={parent}
                      onChange={this.HandleChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    Thumbnail
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="file"
                      name="thumbnail"
                      bsSize="sm"
                      onChange={this.HandleFileChange}
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

export default withRouter(UserCreate);
