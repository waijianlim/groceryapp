import React from 'react'
import ButtonONLY from './buttonONLY';


export default function ProductListItem(props) {
    return <div className = 'product-list-item'>
        <h3> { props.name } </h3>
        <img
            height={80}
            title= { props.product.name }
            src={`/products/${props.product.image}`}
            alt= 'Item'
            />
        <div>{ props.product.name }</div>
        <div>{ props.product.brand }</div>
        <div>{`${props.product.currencyLabel}${props.product.price}`}</div>
        <div>
            <ButtonONLY product={props.product}/>
        </div>
    </div>

}

