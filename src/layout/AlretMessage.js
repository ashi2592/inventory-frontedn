import React from 'react'
import { Message } from 'semantic-ui-react'

const AlertMessage = ({title='',desc='',negative=false}) => (
  <Message  color='red' negative={negative}>
    <Message.Header>{title}</Message.Header>
    <p>{desc}</p>
  </Message>
)

export default AlertMessage