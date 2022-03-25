import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Button, Container, Grid, Header, Icon, Image, Label,Segment,Table } from 'semantic-ui-react';
import SimmerEffect from './layout/simmer';
import TableHeader from './layout/TableHeader';

const CustomerDetails = ({ val }) => {

  const [customerDetails, setCustomerDetails] = useState({});
  const [orderHistory, setOrderHistory] = useState([])

  useEffect(() => {
    axios.get('assets/samplejson/customer' + val + '.json').then(response => {
      setCustomerDetails(response.data)
      setOrderHistory(response.data.transcations)

    })
  }, [val])

  // 

  //Function to Load the customerdetails data from json.


  return (
    <div className="customerdetails">
      {/* {customerDetails.transcations} */}
      <Container bsStyle="info" className="centeralign">
         <Segment className='header'>
          <div className='title' componentClass="h3">{customerDetails.name}</div>
        </Segment>
     
        

          <SimmerEffect enable={customerDetails ? false : true}> </SimmerEffect>
          <Table size='small'>
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.Cell>{customerDetails.name}</Table.Cell>
                <Table.Cell>
                  <Label>
                    <Icon name="edit"></Icon>
                  </Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.Cell>{customerDetails.phone}</Table.Cell>
                <Table.Cell>
                  <Label>
                    <Icon name="edit"></Icon>
                  </Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>City</Table.HeaderCell>
                <Table.Cell>{customerDetails.city}</Table.Cell>
                <Table.Cell>
                  <Label>
                    <Icon name="edit"></Icon>
                  </Label>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Grid>
            <Grid.Row>
              <Header>Order History</Header>
              <Header><Button>
                <Icon name="plus"></Icon>Add Order</Button></Header>
            </Grid.Row>
            <Grid celled>
              <Table celled>
                <TableHeader Headers={['Order Id', 'Amount', "Purchase Date", 'Status']}></TableHeader>


                <Table.Body>
                
                  
                  {orderHistory.map(or=>
                    <Table.Row>
                      <Table.Cell>{or.id}</Table.Cell>
                      <Table.Cell>{or.price}</Table.Cell>
                      <Table.Cell>{or.purchaseDate}</Table.Cell>
                      <Table.Cell>{or.stauts}</Table.Cell>

                    </Table.Row>
                  )}

                </Table.Body>
              </Table>

            </Grid>
          </Grid>
        
    </Container>
    </div>
  )
}

export default CustomerDetails;
