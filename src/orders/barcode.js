import React, { useRef, useState } from "react";
import CreateBarcode from "./CreateBarcode";
import ReactToPrint from 'react-to-print';

function BarCodeApp() {
  const componentRef = useRef();

  return (
    <div>

      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <CreateBarcode ref={componentRef} ></CreateBarcode>

    </div>
  );
}

export default BarCodeApp;
