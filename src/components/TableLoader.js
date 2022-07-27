import React, { useState } from "react";
import { Dimmer, Image, Loader, Segment, TableCell, TableRow, Transition } from "semantic-ui-react";

const TableLoaderPage = ({colSpan="5"}) => {

  const [animation, setAnimation] = useState('pulse')
  const [duration, setDuration] = useState(500)
  const [visible, setVisible] =useState(true)

        return (<TableRow >
            <TableCell colSpan={colSpan}>
            <Segment>
           
       
<Transition.Group animation={animation} duration={duration}>
                    {visible && (
                        <Image centered size='small' style={{zIndex:9999999, marginTop:150}} src='/assets/inventhooks-logo.png' />
                    )}
                         <Image src='/paragraph.png' />
                </Transition.Group>
        
     
          </Segment>
            </TableCell>
        </TableRow>)
    
   
    
}


export default TableLoaderPage;