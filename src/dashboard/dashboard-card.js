
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const DashboardCard = ({title,value,border}) =>{

    let [borderclass,setBordercolor]  = useState(`card  border-left-primary shadow h-100 py-2`);

    useEffect(()=>{
        setBordercolor(`card  border-left-${border?border:'primary'} shadow h-100 py-2`)
    },[border])

    return (<div className="col-xl-3 col-md-6 mb-4">
    <div className={borderclass}>
         <div className="card-body">
            <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                       {title}</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800"> {value}</div>
                </div>
                <div className="col-auto">
                    {/* <i className="fas fa-inr fa-2x text-gray-300"></i>
                     */}
                       {/* <FontAwesomeIcon icon={["far", "fa-inr"]} /> */}
                </div>
            </div>
        </div>
    </div>
</div>)
}



export default DashboardCard;