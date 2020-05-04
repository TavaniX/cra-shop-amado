import React from 'react';
import CartSummary from "./cartSummary";
import {updateCart} from "../../store/action_creators";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {Link} from "react-router-dom";
import * as URL from '../../router/url';

Shoppingcart.propTypes = {
	cartSummary: PropTypes.array,
	updateCartSummary: PropTypes.func,
};

function Shoppingcart(props) {

	const {
		lsCart,
		updateCart,
	} = props;

	function renderCardItem() {

		function handlerQuantity(e) {

			let index = e.currentTarget.getAttribute("itemId"); // определяем индекс элем в массиве lsCart

			if (e.currentTarget.getAttribute("name") == "minus") { // если нажали на минус
				if (Number(lsCart[index].quantity) === 1) { // проверяем количество, если =1, то
					lsCart.splice(index, 1) // удаляем элемент из массива
				} else {
					lsCart[index].quantity--; // в противном случае -1
				};
			}
			else { // если нажали на плюч
				if (Number(lsCart[index].available) > Number(lsCart[index].quantity)) { // проверяем доступное количество на складе
					lsCart[index].quantity++; // если доступно, то увеличиваем
				} else {
					alert("На складе закончился товар, приходите завтра.") // в противном случае сообщаем
				}
			}
			updateCart(lsCart) // перезаписываем стор
			localStorage.setItem('ls', JSON.stringify(lsCart)) // обновляем лс, перезаписываем
		};

		return lsCart.map((item, index) => {
			return (
				<tr>
					<td className="cart_product_img">
						<Link to={ `${URL.DETAILS}/${ item.name }` }>
							<img src={`http://test-api.ipromote.ru/img/${ item.image }`} alt="Product"/>
						</Link>
					</td>
					<td className="cart_product_desc">
						<h5>{ item.title }</h5>
					</td>
					<td className="price">
						<span>${ item.price }</span>
					</td>
					<td className="qty">
						<div className="qty-btn d-flex">
							<p>Qty</p>

							<div className="quantity">

								<span onClick={ handlerQuantity } name="minus" itemId={ index } className="qty-minus">
									<i className="fa fa-minus" aria-hidden="true"></i>
								</span>

								<input type="number" className="qty-text" id="qty" step="1" min="1" max="300"
								       name="quantity" value={ item.quantity }/>

								<span onClick={ handlerQuantity } name="plus" itemId={ index } className="qty-plus">
									<i className="fa fa-plus" aria-hidden="true"></i>
								</span>

							</div>
						</div>
					</td>
				</tr>
			)
		})
	};

	return (
		<div className="cart-table-area section-padding-100">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-lg-8">
						<div className="cart-title mt-50">
							<h2>Shopping Cart</h2>
						</div>

						<div className="cart-table clearfix">
							<table className="table table-responsive" tabIndex="1"
							       style={{overflow: "hidden", outline: "none"}}>
								<thead>
								<tr>
									<th></th>
									<th>Name</th>
									<th>Price</th>
									<th>Quantity</th>
								</tr>
								</thead>
								<tbody>

								{renderCardItem()}

								</tbody>
							</table>
						</div>
					</div>

					<div className="col-12 col-lg-4">
						<CartSummary/>
					</div>

				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (store) => {
	return {
		lsCart: store.app.lsCart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateCart: (param) => dispatch(updateCart(param)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Shoppingcart);