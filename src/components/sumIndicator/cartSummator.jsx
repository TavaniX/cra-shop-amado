import React from 'react';
import {connect} from "react-redux";
import * as PropTypes from "prop-types";


CartSummator.propTypes = {
	lsCart: PropTypes.array,
};

function CartSummator(props) {

	const {
		lsCart,
	} = props;

	let sum = 0;

	// считываем сумму товаров выбранных элементов и складываем в переменную для дальнейшего вывода
	lsCart.forEach( (item) => {
		let subtotal = Number(item.price) * Number(item.quantity);
		sum += subtotal;
	});

	return (

		<>
			<h5>Cart Total</h5>
			<ul className="summary-table">
				<li><span>subtotal:</span> <span>${ sum }</span></li>
				<li><span>delivery:</span> <span>Free</span></li>
				<li><span>total:</span> <span>${ sum }</span></li>
			</ul>
		</>

	);
}

const mapStateToProps = (store) => {
	return {
		lsCart: store.app.lsCart,
	};
};

export default connect(mapStateToProps)(CartSummator);