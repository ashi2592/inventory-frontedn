import React, { Component, useState } from 'react'
import Scanner from './Scanner'
import { Segment, TextArea } from 'semantic-ui-react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const  BarcodeScanner =  ()=> {
    const [data, setData] = useState("Not Found");
        return (
            <div>

                <span>Barcode Scanner</span>

                <Segment variant="outlined" style={{ marginTop: 30, width: 640, height: 320 }}>
                    <BarcodeScannerComponent
                       onUpdate={(err, result) => {
                            if (result) setData(result.text);
                        }}
                        onError={(err) => {
                            console.log(err)
                        }}
                    />
                    <p>{data}</p>
                </Segment>

                <TextArea
                    style={{ fontSize: 32, width: 320, height: 100, marginTop: 30 }}
                    rowsMax={4}
                    defaultValue={'No data scanned'}
                    value={data}
                />

            </div>
        )
    
}

export default BarcodeScanner