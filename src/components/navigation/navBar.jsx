import React from 'react';
import { Link }  from "react-router-dom";
import * as URL from '../../router/url';
import { withRouter } from 'react-router';

function NavBar (props) {

	// (props.location.pathname) = показывает что в адресной строке после http://localhost:3000/ ????

	return (
		<nav className="amado-nav">
			<ul>
				<li className={ props.location.pathname == "/" ? "active" : "" }><Link to={ URL.ROOT }>Home</Link></li>
				<li className={ props.location.pathname == "/shop" ? "active" : "" }><Link to={ URL.SHOP }>Shop</Link></li>
				{/*<li><Link to={ URL.DETAILS }>Product</Link></li>*/}
				<li className={ props.location.pathname == "/cart" ? "active" : "" }><Link to={ URL.CART }>Cart</Link></li>
				<li className={ props.location.pathname == "/checkout" ? "active" : "" }><Link to={ URL.CHECKOUT }>Checkout</Link></li>
			</ul>
		</nav>
	)
}

export default withRouter(NavBar);