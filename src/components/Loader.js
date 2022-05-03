import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dimmer, Loader, Image, } from 'semantic-ui-react'

const LoaderExampleIndeterminate = ({ intercomm, dashboard,category,brands,colors,types,sizes,products
 }) => {

    const [activeload, setActiveloader] = useState(false)

    useEffect(()=>{
          
        setActiveloader(false)

    },[intercomm, dashboard,category,brands,colors,types,sizes,products])

    return (
        <Dimmer active={activeload}>
        <Loader indeterminate>Preparing Files</Loader>
        <Image src='/loader.gif' />
    </Dimmer>
       
    )
}


const mapStateToProps = (state) => ({
    intercomm: state.intercomm.loading,
    dashboard: state.dashboard.loading,
    category: state.category.loading,
    brands: state.brands.loading,
    colors: state.colors.loading,
    types: state.types.loading,
    sizes: state.sizes.loading,
    products: state.products.loading,


})

const mapDispatchToProps = () => {

}



export default connect(mapStateToProps, mapDispatchToProps)(LoaderExampleIndeterminate)