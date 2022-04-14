import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Message, Table, Tab } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADD_PRODUCT, GET_BRAND_LIST, GET_CATEGORY_LIST, GET_COLOR_LIST, GET_OTHER_LIST, GET_SIZE_LIST, GET_SUPPLIER_LIST, GET_TYPE_LIST } from "../../redux/actions";
import DropdownSearchSelection from "../../layout/Dropdown";
import _ from "lodash";


const AddProduct = ({ addProduct, handleAddProduct, getCategories, categories, colors, getColors,
    sizes, getSizes, suppliers, getSuppliers, getBrands, brands, getOthers, getTypes, types, others }) => {

    const [formload, setFormLoad] = useState(false);
    const [formError, setFormError] = useState(false);
    const [inputs, setInputs] = useState({});
    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [colorOptions, setcolorOptions] = useState([])
    const [sizeOptions, setsizeOption] = useState([])
    const [supplierOptions, setSupplierOptions] = useState([])
    const [brandOptions, setBrandOptions] = useState([])
    const [seasonOption, setSeasonOption] = useState([])
    const [storeOption, setStoreOption] = useState([])
    const [typeOption, setTypeOption] = useState([])
    const [pricetypeOption, setPricetypeOption] = useState([{ key: 'flat', value: 'Flat' },{ key: 'discount', value: 'Discount On MRP' }])


    // initial apis

    useEffect(() => {
        getCategories(1, 100, '')
        getColors(1, 100, '')
        getSizes(1, 100, '')
        getSuppliers(1, 100, '')
        getBrands(1, 100, '')
        getTypes(1, 100, '')
        getOthers(1, 100, '')
    }, [])


    // initial value set
    useEffect(() => {
        // getCategories()

        const categoryOpt = _.map(categories, (data, index) => ({ key: data._id, value: data.categoryName }))
        setCategoriesOptions(categoryOpt)

    }, [categories])

    useEffect(() => {
        const colorOpt = _.map(colors, (data, index) => ({ key: data._id, value: data.colorName }))
        setcolorOptions(colorOpt)

    }, [colors])


    useEffect(() => {
        const sizeOpt = _.map(sizes, (data, index) => ({ key: data._id, value: data.sizeName }))
        setsizeOption(sizeOpt)

    }, [sizes])
    useEffect(() => {
        const sizeOpt = _.map(suppliers, (data, index) => ({ key: data._id, value: data.supplierName }))
        setSupplierOptions(sizeOpt)
    }, [suppliers])

    useEffect(() => {
        const brandOpt = _.map(brands, (data, index) => ({ key: data._id, value: data.brandName }))
        setBrandOptions(brandOpt)
    }, [brands])

    useEffect(() => {
        const seasonOpt = others.filter(data => data.keyName == 'season')
            .map((data) => ({ key: data._id, value: data.value }))
        setSeasonOption(seasonOpt)
    }, [others])


    useEffect(() => {
        const seasonOpt = others.filter(data => data.keyName == 'store')
            .map((data) => ({ key: data._id, value: data.value }))
        setStoreOption(seasonOpt)
    }, [others])

    useEffect(() => {
        const typesOpt = _.map(types, (data) => ({ key: data._id, value: data.typeName }))
        setTypeOption(typesOpt)
    }, [types])



    const handleChange = (event) => {
        event.preventDefault()

        let name = event.target.name;
        let value = event.target.value;
        // alert(name + '==========' + value)
        setInputs(values => { return { ...values, [name]: value } });

    }

    const handleCheckbox = (name, value) => {
        setInputs(values => { return { ...values, [name]: !value } });
    }


    const handleDropDownChanges = (name, value) => {
        // alert(JSON.stringify({name,value}))
        // setInputs(values => { return { ...values, [name]: value } });
        setInputs(values => { return { ...values, [name]: value } })
        console.log(inputs)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addProduct(inputs);
        // handleAddProduct(false)
    }


    return (

        <Form loading={formload} error={formError} onSubmit={handleSubmit}>
            <Message
                error
                header='Action Forbidden'
                content='You can only sign up for an account once with a given e-mail address.'
            />

            <Form.Group >
                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Table.Row>

                                    <Table.Cell>
                                        Product Name
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Form.Field
                                            id="form-input-control-product-name"
                                            control={Input}
                                            placeholder='Enter Product Name'
                                            onChange={handleChange}
                                            name={'productName'}
                                        />
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        Product Code
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Form.Field
                                            id="form-input-control-productCode-name"
                                            control={Input}
                                            placeholder='Enter Product Code'
                                            onChange={handleChange}
                                            name={'productCode'}
                                        />
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        Product Category
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DropdownSearchSelection placeholder={'Category'} ArrayofObj={categoriesOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productCategory'} value={inputs.productCategory}></DropdownSearchSelection>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Product Colors
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DropdownSearchSelection placeholder={'Colors'} ArrayofObj={colorOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productColor'} value={inputs.productColor}></DropdownSearchSelection>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Product Size
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DropdownSearchSelection placeholder={'Size'} ArrayofObj={sizeOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productSize'} value={inputs.productSize}></DropdownSearchSelection>
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        Product Supplier
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DropdownSearchSelection placeholder={'Supplier'} ArrayofObj={supplierOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productSupplier'} value={inputs.productSupplier}></DropdownSearchSelection>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        Product Type
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DropdownSearchSelection placeholder={'Product Type'} ArrayofObj={typeOption} handleDropDownChanges={handleDropDownChanges} dropdownName={'productType'} value={inputs.productType}></DropdownSearchSelection>

                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        Product Brand
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DropdownSearchSelection placeholder={'brand'} ArrayofObj={brandOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productBrand'} value={inputs.productBrand}></DropdownSearchSelection>

                                    </Table.Cell>
                                </Table.Row>

                            </Table.Cell>
                            <Table.Cell>
                                <Table.Row>
                                    <Table.Cell>
                                        Product MRP
                                    </Table.Cell>
                                    <Table.Cell>

                                        <Input
                                            labelPosition='right'
                                            placeholder='Enter Product MRP...'
                                            name={'productMrp'}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Price Type
                                    </Table.Cell>
                                    <Table.Cell>

                                    <DropdownSearchSelection placeholder={'Price type'} ArrayofObj={pricetypeOption} handleDropDownChanges={handleDropDownChanges} dropdownName={'priceType'} value={inputs.priceType}></DropdownSearchSelection>
                         
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        Product Price/Percent
                                    </Table.Cell>
                                    <Table.Cell>

                                        <Input
                                            placeholder='Enter Product Selling Price...'
                                            name={'productPrice'}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        Product Qty
                                    </Table.Cell>
                                    <Table.Cell>

                                        <Input
                                            placeholder='Enter Product qty...'
                                            name={'productQty'}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Table.Cell>
                                </Table.Row>




                                {/* <Table.Row>
                                    <Table.Cell>
                                        Product Status
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Checkbox
                                            toggle
                                            checked={inputs.status}
                                            label='is Active'
                                            onChange={() => handleCheckbox('status', (inputs.status ? inputs.status : false))}
                                        />
                                    </Table.Cell>
                                </Table.Row> */}
                                <Table.Row>
                                    <Table.Cell>
                                        Product Season
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DropdownSearchSelection placeholder={'Season'} ArrayofObj={seasonOption} handleDropDownChanges={handleDropDownChanges} dropdownName={'season'} value={inputs.season}></DropdownSearchSelection>
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        Product Store
                                    </Table.Cell>
                                    <Table.Cell>
                                        <DropdownSearchSelection placeholder={'Store'} ArrayofObj={storeOption} dropdownName={'store'} handleDropDownChanges={handleDropDownChanges} value={inputs.store}></DropdownSearchSelection>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Cell>

                        </Table.Row>

                        

                        <Table.Row>
                            <Table.Cell>
                                <Button type='submit'>Save</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>





            </Form.Group>
        </Form>

    )
}


const mapDispatchToProps = (dispatch) => ({


    addProduct: (data) => dispatch({ type: ADD_PRODUCT, payload: data }),
    getCategories: (page, count, searchText) => dispatch({ type: GET_CATEGORY_LIST, payload: { page, count, searchText } }),
    getColors: (page, count, searchText) => dispatch({ type: GET_COLOR_LIST, payload: { page, count, searchText } }),
    getSizes: (page, count, searchText) => dispatch({ type: GET_SIZE_LIST, payload: { page, count, searchText } }),
    getSuppliers: (page, count, searchText) => dispatch({ type: GET_SUPPLIER_LIST, payload: { page, count, searchText } }),
    getBrands: (page, count, searchText) => dispatch({ type: GET_BRAND_LIST, payload: { page, count, searchText } }),
    getTypes: (page, count, searchText) => dispatch({ type: GET_TYPE_LIST, payload: { page, count, searchText } }),
    getOthers: (page, count, searchText) => dispatch({ type: GET_OTHER_LIST, payload: { page, count, searchText } })



}
)


const mapStateToProps = (state) => ({
    categories: state.category.categories,
    colors: state.colors.colors,
    sizes: state.sizes.sizes,
    suppliers: state.suppliers.suppliers,
    brands: state.brand.brands,
    types: state.types.types,
    others: state.others.others,
    error: state.products.error
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);