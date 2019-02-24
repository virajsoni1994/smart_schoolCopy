import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { loginInsertUpdate } from "../../actions";
import { connect } from "react-redux";
import  { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:""
    }
  }

  onInputChange = e =>{
    this.setState({[e.target.name]: e.target.value});
    //console.log(e.target.value);
  }
  
  handleSubmit = event =>{
    event.preventDefault();
    const loginCredentials={
      Username: this.state.username,
      Password: this.state.password,
    }
    console.log(loginCredentials);
    this.props.loginInsertUpdate(loginCredentials, this.state.nodeId);
  }

  render() {
    //console.log(this.props.auth);
    if(this.props.auth.Id===1){
      return <Redirect to='/dashboard'/>
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" 
                        value={this.state.username || ""} id="username" onChange={this.onInputChange} name="username"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password"
                        value={this.state.password || ""} id="password" onChange={this.onInputChange} name="password"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
function mapStateToProps({
  auth
})
{
   return {auth};
}
export default connect (mapStateToProps, {
  loginInsertUpdate
}) (Login);
