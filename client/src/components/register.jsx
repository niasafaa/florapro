import React, { useState } from 'react';
import axios from 'axios';
import useForm from './useForm';
import { Redirect } from 'react-router-dom';
import setToken from './setToken';

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Checkbox
} from 'semantic-ui-react';

const Register = () => {
  const [status, setStatus] = useState(0);

  const register = async () => {
    let res = await axios.post('/authAPI/seedUser', values);
    setStatus(res.status);
    await setToken(values.email, values.password);
  };
  const { values, handleChange, handleSubmit } = useForm(register);

  if (status === 200) {
    return <Redirect to="/protecteddash" />;
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image
            src={require('../img/logo.png')}
            style={{ width: '960px', height: 'auto' }}
          />{' '}
          Register
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Field>
              <label>First Name</label>
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={values.firstName}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={values.lastName}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={values.username}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={values.email}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                required
              />
            </Form.Field>

            <Button type="submit" color="teal" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
