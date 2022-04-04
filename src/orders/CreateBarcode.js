import _ from "lodash"
import React, { useCallback } from "react"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Table, TableBody, TableCell, TableRow } from "semantic-ui-react"
import { SEARCH_PRODUCT } from "../redux/actions"
import Barcode from "react-barcode";



const BarcodeColoms = ({ rowCode }) => {

    console.log(rowCode)
    useEffect(() => {
        console.log(rowCode)
    }, [rowCode])

    return (rowCode.map(x => (<TableCell><Barcode height={64} value={x}></Barcode></TableCell>)))
}
const CreateBarCode = React.forwardRef((props, ref) => {

    const [addedProducts, setAddedproduct] = useState([]);
    var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    useEffect(() => {

        let codes = [];
        let codeArr = []
        for (let i = 0; i < 65; i++) {
            let x = 'F'+getRandomInt(10, 99)+'A'+getRandomInt(1, 20)
            codes.push(x)
            if (codes.length == 5) {

                codeArr.push(codes)
                codes = [];

            }
        }

        setAddedproduct(codeArr)



    }, [])

    useEffect(() => {
        console.log(addedProducts)
    }, [addedProducts])



    return (
        <div ref={ref}>
            <Table celled>
                <TableBody>
                    {addedProducts.map((rowCode, i) => {
                        return (<TableRow key={`barcode-table-row-${i}`}>
                            <BarcodeColoms rowCode={rowCode}></BarcodeColoms>
                        </TableRow>)

                    })}
                </TableBody>
            </Table>
        </div>
        // 
    )


})


export default CreateBarCode