import React, { Component } from 'react'
import BarcodeReader from 'react-barcode-reader';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
 
const BarcodeScannerComponentExmple = ()=>{
    const [ data, setData ] = React.useState('Not Found');
 
    return (
      <div>
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) setData(result.text)
            else setData('Not Found')
          }}
        />
        <p>{data}</p>
      </div>
    )
  }


  export default BarcodeScannerComponentExmple


