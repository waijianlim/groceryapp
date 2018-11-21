import React from 'react'
import ProductListItem from './product-list-item'


function ProductListing(props) {
    return <div className ='product-listing'>
        {
            props.products.map( product => 
                <ProductListItem 
                product={product}
                key = {product.id}
                 />)
        }
    </div>
}


export default ProductListing