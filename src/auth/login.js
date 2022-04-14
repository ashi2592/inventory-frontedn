import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'




const LoginForm = () => {
  const history =  useHistory();
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('')

    
    useEffect(()=>{
        // console.log(username)
        // console.log(password)
    
        (username == 'ashish' && password == 'ashish')
        {
          localStorage.setItem('storeId',"thefashionhub");
          history.push('/order')
        }
    },[username,password])

    const submitForm = ()=>{
    
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