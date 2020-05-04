import React from 'react';
import { Link }  from "react-router-dom";
import * as URL from '../../router/url';
import CartSummator from "../sumIndicator/cartSummator";

function CartSummary() {
	return (
		<div className="cart-summary">

			<CartSummator />

			<div className="cart-btn mt-100">
				<Link to={ URL.CHECKOUT } className="btn amado-btn w-100">Checkout</Link>
			</div>
		</div>
	);
}

export default CartSummary;