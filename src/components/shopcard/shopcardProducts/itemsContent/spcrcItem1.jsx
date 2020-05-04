import React from 'react';
import imgCart from '../../../../assets/img/core-img/cart.png';
import * as PropTypes from "prop-types";
import {loadCatalog, updateCart} from "../../../../store/action_creators";
import {connect} from "react-redux";
import Spinner from "../../../spinner/spinner";
import {Link} from "react-router-dom";
import * as URL from '../../../../router/url';

SpcrcItem1.propTypes = {
	catalog: PropTypes.array,
	isLoading: PropTypes.bool,
	viewListSelectedItem: PropTypes.number,
	activeCategoryFlag: PropTypes.string,
	updateCart: PropTypes.func,
	lsCart: PropTypes.array,
	brandList: PropTypes.string,
	colorList: PropTypes.string,
	activePage: PropTypes.string,
};

function SpcrcItem1(props) {

	// деструктуризация, чтобы пропс каждый раз не приписывать, а сразу писать элементы
	const {
		catalog,
		isLoading,
		viewListSelectedItem,
		activeCategoryFlag,
		updateCart,
		lsCart,
		brandList,
		colorList,
		activePage,
	} = props;

	if (isLoading) {
		return <Spinner/>
	}
	;

	let itemStatus;

	function handlerAddToCart(e) {
		let name = e.currentTarget.getAttribute("name");
		let title = e.currentTarget.getAttribute("title");
		let image = e.currentTarget.getAttribute("image");
		let price = e.currentTarget.getAttribute("price");
		let available = e.currentTarget.getAttribute("available");
		let quantity = 1;

		if (!lsCart.find(elem => elem.name === e.currentTarget.getAttribute("name"))) { // проверяем, если НЕТ такого айди в массиве, то добавим
			lsCart.push({name, title, image, price, available, quantity});
			updateCart(lsCart); // если if не сработает, то не нужно обновлять ls
			localStorage.setItem('ls', JSON.stringify(lsCart)) // обновляем лс, перезаписываем
		}
		;
	};

	// пагинация
	let counter = 0;
	let startItem = (Number(activePage) - 1) * (Number(viewListSelectedItem)); // 0
	let endItem = startItem + Number(viewListSelectedItem); // 4
	let itemCounter = 0; // считает сколько товаров отрендерили

	return catalog.map((item) => {

		for (let i = 0; i < lsCart.length; i++) {
			if (lsCart.find(elem => elem.name === item.id)) {
				itemStatus = "ДОБАВЛЕНО" // если элемент совпа с ls, то добавлено
			} else {
				itemStatus = ""
			}
			;
		}

		if (item.brand === brandList || brandList === "All") { // проверка на нажатый бренд
			if (item.colors === colorList || colorList === "All") { // проверка на нажатый цвет
				itemCounter++;
				if (itemCounter > startItem && itemCounter <= endItem) {
					console.log("itemCounter: ", itemCounter)


					if (counter < viewListSelectedItem) { // фильтрация по кол-ву товаров на странице
						if (activeCategoryFlag == item.category || activeCategoryFlag == "All") {
							counter++; // считает товары на странице
							return (
								<div key={item.id} className="col-12 col-sm-6 col-md-12 col-xl-6">
									<div className="single-product-wrapper">
										<div className="product-img">
											<Link to={`${URL.DETAILS}/${item.id}`}>
												<img src={`http://test-api.ipromote.ru/img/${item.img_url}`} alt=""/>
											</Link>
										</div>

										<div
											className="product-description d-flex align-items-center justify-content-between">
											<div className="product-meta-data">
												<div className="line"></div>
												<p className="product-price">${item.price}</p>
												<a href="product-details.html">
													<h6>{item.title}</h6>
												</a>
											</div>
											<div className="ratings-cart text-right">
												<div className="ratings">
													<i className="fa fa-star" aria-hidden="true"></i>
													<i className="fa fa-star" aria-hidden="true"></i>
													<i className="fa fa-star" aria-hidden="true"></i>
													<i className="fa fa-star" aria-hidden="true"></i>
													<i className="fa fa-star" aria-hidden="true"></i>
												</div>
												<div className="cart">
													<img
														style={{cursor: "pointer"}}
														onClick={handlerAddToCart}
														src={imgCart}
														alt=""
														name={item.id}
														title={item.title}
														image={item.img_url}
														price={item.price}
														available={item.available}
													/>
													<p>{itemStatus}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						}
					}
				}
			}
		}
	})
}

const mapStateToProps = (store) => {
	return {
		catalog: store.app.goods.data || [], // подключили пропсы из редюсера
		isLoading: store.app.isLoading.goods || false,
		viewListSelectedItem: store.app.viewListSelectedItem,
		activeCategoryFlag: store.app.activeCategoryFlag,
		lsCart: store.app.lsCart,
		brandList: store.app.brandList,
		colorList: store.app.colorList,
		activePage: store.app.activePage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadCatalog: () => dispatch(loadCatalog()),
		updateCart: (param) => dispatch(updateCart(param)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SpcrcItem1);