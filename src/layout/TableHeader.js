
import React from "react";
import { Table } from "semantic-ui-react";
const TableHeader = ({ Headers }) => {

    return (
        <Table.Header>
            <Table.Row>
                {Headers.map(h => <Table.HeaderCell key={h}>{h}</Table.HeaderCell>)}
            </Table.Row>
        </Table.Header>

    )


}

export default TableHeader;