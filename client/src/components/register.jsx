import React, {useState} from 'react';
import { Button, Checkbox, Form, Grid, Container } from 'semantic-ui-react';
import axios from 'axios';
import useForm from "./useForm";
import { Redirect } from 'react-router-dom';
import setToken from './setToken';

const Register = () => {
  const [status, setStatus] = useState(0);

  const register = async() => {
    let res = await axios.post('/authAPI/seedUser', values);
    setStatus(res.status);
    setToken(values.email, values.password);
    };
  const { values, handleChange, handleSubmit } = useForm(register);
  
  if (status === 200)  { return <Redirect to='/protectedTEST' />};
  
  return (
  <Container>
    <Grid>
      <Grid.Column>
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>First Name</label>
        <input name="firstName"  placeholder="First Name" onChange={handleChange} value={values.firstName} required/>
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input name="lastName" placeholder="Last Name" onChange={handleChange} value={values.lastName} required/>
      </Form.Field>
      <Form.Field>
        <label>Username</label>
        <input name="username" placeholder="Username" onChange={handleChange} value={values.username} required/>
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input name="email" placeholder="Email" onChange={handleChange} value={values.email} required/>
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={values.password} required/>
      </Form.Field>
      <Form.Field>
        <Checkbox label="I agree to the Terms and Conditions" />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
    </Grid.Column>
    </Grid>
  </Container>
  )
};

export default Register;
