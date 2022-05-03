
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Table } from 'semantic-ui-react';
import TableHeader from '../layout/TableHeader';

const DashboardTransaction = ({ title, value, border }) => {

    let [borderclass, setBordercolor] = useState(`card  border-left-primary shadow h-100 py-2`);

    useEffect(() => {
        setBordercolor(`card  border-left-${border ? border : 'primary'} shadow h-100 py-2`)
    }, [border])

    return (<div className="col-xl-3 col-md-6 mb-4">
        <div className='card'>
        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Last Visited Customer</h6>
                    </div>

            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    
                </div>  
            </div>
        </div>
    </div>
    )
}



export default DashboardTransaction;