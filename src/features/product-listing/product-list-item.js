import React from 'react'
import { NavLink } from 'react-router-dom'


const EditNavigation = (props) => { 
    return <nav>
            <NavLink to={`/editItem/${props.id}`} >Edit</NavLink>
        </nav>
  }

export default function ProductListItem(props) {
    const thisItemInCart = props.cart.filter(item => item.id === props.product.id)[0]
    return <div className = 'product-list-item'>
        <h3> { props.name } </h3>
        <img
            height={100}
            title= { props.product.name }
            src={`/products/${props.product.image}`}
            />
        <div>{ props.product.description }</div>
        <div>{`${props.product.currencyLabel}${props.product.price}`}</div>
        <div>
            <EditNavigation id={props.product.id}/>
        </div>
    </div>

}