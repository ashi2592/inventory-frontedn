import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Message, Table, Header, Grid, GridRow, GridColumn, Icon, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADD_CATEGORY, ALERT_NOTIFY } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import SearchAndSelectCateory from "../../components/SearchAndSelectCateory";
import SettingSidebarPage from "../settingSidebar";

const AddCategoryPage = ({ add,alertMessage }) => {

    const history = useHistory()
    const [formload, setFormLoad] = useState(false);
    const [formError, setFormError] = useState(false);
    const [inputs, setInputs] = useState({})

    const handleChange = (event) => {
        event.preventDefault()
        let name = event.target.name;
        let value = event.target.value;
        setInputs(values => { return { ...values, [name]: value } });
    }

    const handleCheckbox = (name, value) => {
        setInputs(values => { return { ...values, [name]: !value } });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        add(inputs);
        setTimeout(() => {
            alertMessage('success', `Add successfully`)
            history.push('/category')
           
        }, 300);
        
    }

    const handleAdd = () => {
        history.push('/category')
    }

    const handleSearchDropDownChanges = (name, value, text) => {
        let values = { ...values, [name]: value, }
        setInputs(values)

        // console.log(text)
    }

    return (<Container>
        <Header textAlign="left">Category</Header>


        <Grid>
            <GridRow columns={2}>
                <GridColumn>
                    <SettingSidebarPage activeItem={'category'}></SettingSidebarPage>
                </GridColumn>
                <GridColumn textAlign="right">

                <Button color="orange" onClick={handleAdd}><Icon name="left arrow"></Icon> Back to Listing</Button>
                </GridColumn>
            </GridRow>
        </Grid>
        <Grid>
            <GridRow columns={1}>
                <GridColumn>
                    <Form loading={formload} error={formError} onSubmit={handleSubmit}>
                        <Form.Group >
                            <Table>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            Category Name
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field
                                                id="form-input-control-category-name"
                                                control={Input}
                                                placeholder='Enter Category Name'
                                                onChange={handleChange}
                                                name={'categoryName'}
                                                autoFocus={true}
                                            />
                                        </Table.Cell>

                                    </Table.Row>

                                   
                                    <Table.Row>
                                        <Table.Cell>
                                          Image Url
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Form.Field
                                                id="form-input-control-imageurl"
                                                control={Input}
                                                placeholder='Enter Image url'
                                                onChange={handleChange}
                                                name={'imageUrl'}
                                            />
                                        </Table.Cell>

                                    </Table.Row>

                                

                                    <Table.Row>
                                        <Table.Cell colSpan={2} textAlign="right">
                                            <Button type='submit' color="green"> <Icon name="add"></Icon>Create</Button>
                                        </Table.Cell>


                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Form.Group>
                    </Form>
                </GridColumn>
            </GridRow>
        </Grid>


    </Container>
    )
}


const mapDispatchToProps = (dispatch) => ({
    add: (data) => dispatch({ type: ADD_CATEGORY, payload: data }),
    alertMessage: (type, message) => dispatch({ type: ALERT_NOTIFY, payload: { type, message } }),

})


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryPage);