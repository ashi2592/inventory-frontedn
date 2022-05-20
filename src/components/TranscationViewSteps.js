import React from "react";
import { useHistory } from "react-router-dom";
import { Icon, Step } from "semantic-ui-react";


const TranscationViewSteps = ({ variantId,page }) => {

    const history = useHistory()
    const handleClick= (pagen)=>{
        history.push(`/${pagen}/variant/${variantId}`)
    }

    return (<Step.Group size='mini' >
        <Step active={ page =='purchase' } onClick={()=>handleClick('purchase')}>
            <Step.Content>
                <Step.Title> Purchase</Step.Title>

            </Step.Content>
        </Step>

        <Step active ={ page =='sell' } onClick={()=>handleClick('transaction')}>
            {/* <Icon name='payment' /> */}
            <Step.Content>
                <Step.Title>Sell</Step.Title>
            </Step.Content>
        </Step>

    </Step.Group>)
}



export default TranscationViewSteps;