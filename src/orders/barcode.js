import React, { useRef, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import CreateBarcode from "./CreateBarcode";
import ReactToPrint from 'react-to-print';
import "./print-component.css";

function BarCodeApp() {
  const componentRef = useRef();

  return (
    <div>

      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
     {/* <BarcodeScannerComponent
        width={500}
        height={500}
        torch={torchOn}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
        }}
        onError={(err)=>{
          console.log(err)
        }}
      />
      <p>{data}</p>
      <button onClick={() => setTorchOn(!torchOn)}>
        Switch Torch {torchOn ? "Off" : "On"}
      </button> */}
      <CreateBarcode ref={componentRef} ></CreateBarcode>

    </div>
  );
}

export default BarCodeApp;
