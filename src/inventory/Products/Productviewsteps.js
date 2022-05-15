import React from "react";
import { useHistory } from "react-router-dom";
import { Icon, Step } from "semantic-ui-react";


const Productviewsteps = ({ productId,page }) => {

    const history = useHistory()
    const handleClick= (pagen)=>{
        history.push(`/${pagen}/${productId}`)
    }

    return (<Step.Group size='mini' >
        <Step active={ page =='product' } onClick={()=>handleClick('product')}>
            <Step.Content>
                <Step.Title> Product Details</Step.Title>

            </Step.Content>
        </Step>

        <Step active ={ page =='variant' } onClick={()=>handleClick('variant')}>
            {/* <Icon name='payment' /> */}
            <Step.Content>
                <Step.Title>Variants</Step.Title>
            </Step.Content>
        </Step>

    </Step.Group>)
}



export default Productviewsteps;