
import React, { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';

const DashboardCard = ({ title, value, color,amount }) => {

    
    return (
        <Card color={color}  fluid>
            <Card.Content>
                <Card.Header>
                    {title}
                </Card.Header>
               <Card.Description>
                {amount}
                </Card.Description>

            </Card.Content>
        </Card>

    )
}



export default DashboardCard;