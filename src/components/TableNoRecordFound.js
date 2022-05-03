import React from "react";
import { Header, Image, TableCell, TableRow } from "semantic-ui-react";

const TableNoRecordFound = ({colSpan="5"}) => {

        return (<TableRow >
            <TableCell colSpan={"5"}>
                <Header>No Record Found</Header>
            </TableCell>
        </TableRow>)
    
   
    
}


export default TableNoRecordFound;