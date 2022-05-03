import React from "react";
import { Dimmer, Image, Loader, Segment, TableCell, TableRow } from "semantic-ui-react";

const TableLoaderPage = ({colSpan="5"}) => {

        return (<TableRow >
            <TableCell colSpan={colSpan}>
            <Segment>
            <Dimmer active>
              <Loader   >
                  Hooks Loading
                  </Loader>
            </Dimmer>
            <Image src='/paragraph.png' />
          </Segment>
            </TableCell>
        </TableRow>)
    
   
    
}


export default TableLoaderPage;