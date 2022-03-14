import React, { useEffect, useState } from 'react';
import CustomerDetails from './CustomerDetails'
import axios from 'axios'
import { Grid, Icon, Table } from 'semantic-ui-react';
import TableHeader from './layout/TableHeader';

const Customers = () => {

  const [selectedCustomer, setSelectedCustomer] = useState(1);
  const [customerList, setCustomerList] = useState([]);


  useEffect(() => {
    axios.get('assets/samplejson/customerlist.json').then(response => {
      console.log(response.data)
      setCustomerList(response.data)
    })
  }, [])
  return (
    <Grid className="addmargin" column={2}>
      <Grid.Column width={8}>
        <Table celled>
          <TableHeader Headers={['Name', 'Phone', 'Action']}></TableHeader>
          <Table.Body>
          {

            customerList.map(customer => {

              return (
               
                  <Table.Row key={customer.name}>
                    <Table.Cell>{customer.name}</Table.Cell>
                    <Table.Cell>{customer.phone}</Table.Cell>
                    <Table.Cell >
                      <Icon name='edit' onClick={() => { setSelectedCustomer(customer.id) }}></Icon>
                    </Table.Cell>
                  </Table.Row>
              )
            })
          }
           </Table.Body>
        </Table>

      </Grid.Column>
      <Grid.Column width={8}>
        <CustomerDetails val={selectedCustomer} />
      </Grid.Column>
    </Grid>
  )

}



export default Customers;