import React from 'react';
import imgCart from '../../assets/img/core-img/cart.png';
import imgFav from '../../assets/img/core-img/favorites.png';
import imgSearch from '../../assets/img/core-img/search.png';
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import { Link }  from "react-router-dom";
import * as URL from '../../router/url';

NavSearch.propTypes = {
	lsCart: PropTypes.array,
};

function NavSearch(props) {

	const {
		lsCart,
	} = props;

	let qty = 0;

	// считываем значение заданного количества и складываем в переменную для дальнейшего вывода
	lsCart.forEach( (item) => {
		qty += Number(item.quantity);
	});

	return (
		<div className="cart-fav-search mb-100">

			<Link to={ URL.CART } className="cart-nav"><img src={ imgCart } alt="" /> Cart <span>
				({ qty })
			</span></Link>

			<a href="#" className="fav-nav"><img src={ imgFav } alt="" /> Favourite</a>
			<a href="#" className="search-nav"><img src={ imgSearch } alt="" /> Search</a>

		</div>
	);
}

const mapStateToProps = (store) => {
	return {
		lsCart: store.app.lsCart,
	};
};

export default connect(mapStateToProps)(NavSearch);