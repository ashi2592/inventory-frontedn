import React from "react";
import { Grid, Image } from "semantic-ui-react";

const SimmerEffect = ({enable}) =>{
    if(enable)
    {
        return(<Grid divided>
            <Grid.Row>
              <Grid.Column>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
              </Grid.Column>
            </Grid.Row>
          </Grid>)
    }else{
        return(<Grid></Grid>)
    }
    
}

export default SimmerEffect;