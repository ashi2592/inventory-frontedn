import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import Header from "./Header";
import Navigation from "./Navigation";

const Layout = ({ children }) => {

    return (
        <React.Fragment>
            <Header as='h3' textAlign='center' content='Container' />
            <Grid>
                <Grid.Column>
                    <Grid columns={2} doubling stackable>
                        <Grid.Column width={3}>
                            <Navigation></Navigation>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            {children}
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>

        </React.Fragment>
    )
}
export default Layout;