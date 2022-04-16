import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { login } from '../redux/services/user-api';

const LoginForm = () => {
  const history =  useHistory();
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('')

    
    useEffect(()=>{        
    if(localStorage.getItem('store') !== null){
      history.push('/order')
    }
    },[username,password])

    const submitForm = ()=>{
    
      if(username && password)
      {
        console.log(username,password)
        login(username,password).then(response=>{
         
          Object.keys(response).map((x,i)=>{
            localStorage.setItem(x,response[x])
          })
          history.push('/order')

        }).catch((err)=>{
          console.log(err)
        })
        
      }
    }
    
    return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.jpg' />
      </Header>
      <Form size='large'  >
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={(e)=>{setUserName(e.target.value)}} />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={(e)=>{setPassword(e.target.value)}}
          />

          <Button color='black' fluid size='large' onClick={submitForm}>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='#'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
)}

export default LoginForm