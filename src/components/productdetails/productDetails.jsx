import React from 'react';
import { loadSingleProduct,
		updateIdOfLastProduct,
		updateCarouseleImage,
		loadCatalog,
		updateCart } from "../../store/action_creators";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import Spinner from "../spinner/spinner";
import { withRouter } from 'react-router';
import {Link} from "react-router-dom";
import * as URL from '../../router/url';

ProductDetails.propTypes = {
	singleProductImg: PropTypes.object,
	singleProductDesc: PropTypes.object,
	loadSingleProduct: PropTypes.func,
	isLoadingImg: PropTypes.bool,
	isLoadingDesc: PropTypes.bool,
	lastRequestedProduct: PropTypes.string,
	updateIdOfLastProduct: PropTypes.func,
	match: PropTypes.object,
	currentCarouseleImage: PropTypes.string,
	updateCarouseleImage: PropTypes.func,
	goods: PropTypes.object,
	isLoadingGoods: PropTypes.bool,
	updateCart: PropTypes.func,
	lsCart: PropTypes.array,
};

function ProductDetails(props) {

	const {
		singleProductImg,
		singleProductDesc,
		loadSingleProduct,
		isLoadingImg,
		isLoadingDesc,
		lastRequestedProduct,
		updateIdOfLastProduct,
		match,
		currentCarouseleImage,
		updateCarouseleImage,
		goods,
		isLoadingGoods,
		updateCart,
		lsCart,
	} = props;

	let category;
	let title;
	let price;
	let massiv = ["столы", "стулья", "кресла", "диваны", "лампы"];
	let image;
	let available;
	let name;
	let itemStatus = "Add to cart";

	// если гудз не загружен, то прогружаем в стор
	if(goods===undefined){
		loadCatalog("http://test-api.ipromote.ru/API/CATALOG/FIND")
	}

	// если айди кликнутого продукта отличатся, то изменится в стейте айди продукта на новый, и запустится рендер
	if(lastRequestedProduct!==match.params.code){ // match.params.code - это штука из withRouter, помогает отследить айди кликнутого продукта
		loadSingleProduct(match.params.code); // загружаем данные кликнутого продукта
		updateIdOfLastProduct(match.params.code); // обновляем стейт последнего кликнутого продукта
	};

	if(isLoadingImg || isLoadingDesc || isLoadingGoods){ // если один из этих методово грузится, то отображаем спиннер
		return (
			<Spinner />
		)
	};

	// пробегаемся массивом по каталогу, чтобы вытянуть категорию, название, и цену последнего кличнутого продукта
	for(let i=0; i<goods.length; i++){
		if(goods[i].id===match.params.code){
			category = massiv[goods[i].category-1]; // костыль в общем
			title = goods[i].title;
			price = goods[i].price;
			image = goods[i].img_url;
			available = goods[i].available;
			name = goods[i].id;
		}
	};

	if(singleProductImg===undefined){
		loadSingleProduct(match.params.code);
	};

	if(singleProductDesc===undefined){
		loadSingleProduct(match.params.code);
	};

	function handlerAddToCart(e) {

		let quantity = 1;

		if (!lsCart.find(elem => elem.name === name)) { // проверяем, если НЕТ такого айди в массиве, то добавим
			// console.log("elem.name - " elem.name)
			lsCart.push({name, title, image, price, available, quantity});
			updateCart(lsCart); // если if не сработает, то не нужно обновлять ls
			localStorage.setItem('ls', JSON.stringify(lsCart)) // обновляем лс, перезаписываем
		}
		;
	};

	for (let i = 0; i < lsCart.length; i++) {
		if (lsCart.find(elem => elem.name === name)) {
			itemStatus = "Added" // если элемент совпа с ls, то добавлено
		} else {
			itemStatus = "Add to cart"
		}
		;
	}

	function carouseleHandler(e) {
		updateCarouseleImage(e.currentTarget.getAttribute("name"))
	};

	function renderBigImage(){
		if(singleProductImg!==undefined && singleProductImg!==null){
			return(
				singleProductImg.map( (item, index) => {
					if(index===Number(currentCarouseleImage)){
						return (
							<img className="d-block w-100" src= { `http://test-api.ipromote.ru/img/${ item.url }` } alt="Third slide" />
						)
					}
				})
			)
		};
	};

	function renderCarouselImgs(){
		if(singleProductImg!==undefined && singleProductImg!==null){
			return(
				singleProductImg.map( (item, index) => {
					return (
						<li name={ index} onClick={ carouseleHandler } className={ index===Number(currentCarouseleImage) ? "active" : "" } data-target="#product_details_slider" data-slide-to="0"
						    style={ {backgroundImage: `url(http://test-api.ipromote.ru/img/${ item.url })`} }>
						</li>
					)
				})
			)
		}
	};

	function renderDesc(){
		if(singleProductDesc!==undefined && singleProductDesc!==null) {
			return (
				singleProductDesc.map( (item) => {
					return (
						<div className="short_overview my-5">
							<p>{ item.title }</p>
						</div>
					)
				})
			)
		}
	};

	return (

		<div className="single-product-area section-padding-100 clearfix">

			<div className="container-fluid">
				<div className="row">

					{/*хлебные крошки */}
					<div className="row">
						<div className="col-12">
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb mt-50">
									<li className="breadcrumb-item"><Link to={URL.ROOT}>HOME</Link></li>
									<li className="breadcrumb-item"><Link to={URL.SHOP}>SHOP</Link></li>
									<li className="breadcrumb-item"><Link to={URL.SHOP}>{ category }</Link></li>
									<li className="breadcrumb-item active" aria-current="page">{ title }</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>

				{/*CONTENT*/}
				<div className="row">

					{/*THUMB*/}
					<div className="col-12 col-lg-7">
						<div className="single_product_thumb">
							<div id="product_details_slider" className="carousel slide" data-ride="carousel">

								{/* carousel-indicators*/}
								<ol className="carousel-indicators">

									{ renderCarouselImgs() }

								</ol>

								{/*carousel-inner*/}
								<div className="carousel-inner">

									<div className="carousel-item active">

										{ renderBigImage() }

									</div>

								</div>

							</div>
						</div>
					</div>

					{/*DESCRIPTION*/}
					<div className="col-12 col-lg-5">
						<div className="single_product_desc">
							<div className="product-meta-data">
								<div className="line"></div>
								<p className="product-price">${ price }</p>
								<a href="product-details.html">
									<h6>{ title }</h6>
								</a>
								<div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
									<div className="ratings">
										<i className="fa fa-star" aria-hidden="true"></i>
										<i className="fa fa-star" aria-hidden="true"></i>
										<i className="fa fa-star" aria-hidden="true"></i>
										<i className="fa fa-star" aria-hidden="true"></i>
										<i className="fa fa-star" aria-hidden="true"></i>
									</div>
									<div className="review">
										<a href="#">Write A Review</a>
									</div>
								</div>
								<p className="avaibility"><i className="fa fa-circle"></i> In Stock</p>
							</div>

							{ renderDesc() }

							{/*<form className="cart clearfix" method="post">*/}

								{/*<div className="cart-btn d-flex mb-50">*/}
								{/*	<p>Qty</p>*/}
								{/*	<div className="quantity">*/}
								{/*		<span className="qty-minus" onClick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty > 1 ) effect.value--;return false;">*/}
								{/*			<i className="fa fa-caret-down" aria-hidden="true"></i>*/}
								{/*		</span>*/}

								{/*		<input type="number" className="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1" />*/}

								{/*		<span className="qty-plus" onClick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;">*/}
								{/*			<i className="fa fa-caret-up" aria-hidden="true"></i>*/}
								{/*		</span>*/}
								{/*	</div>*/}
								{/*</div>*/}



								<button onClick={ handlerAddToCart } name="addtocart" value="5" className="btn amado-btn">{ itemStatus }</button>


							{/*</form>*/}

						</div>
					</div>
				</div>

			</div>
		</div>

	);
}

const mapStateToProps = (store) => {
	return {
		singleProductImg: store.app.singleProductImg.data, // объекты картинок
		singleProductDesc: store.app.singleProductDesc.data, // объекты описаний
		isLoadingImg: store.app.isLoading.singleProductImg || false, // флаг загрузки картинки
		isLoadingDesc: store.app.isLoading.singleProductDesc || false, // флаг загрузки отзывов
		lastRequestedProduct: store.app.lastRequestedProduct, // последний выбранный продукт
		currentCarouseleImage: store.app.currentCarouseleImage, // текущее изображение
		goods: store.app.goods.data,
		isLoadingGoods: store.app.isLoading.goods || false, // флаг загрузки отзывов
		lsCart: store.app.lsCart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadSingleProduct: (param) => dispatch(loadSingleProduct(param)),
		updateIdOfLastProduct: (param) => dispatch(updateIdOfLastProduct(param)),
		updateCarouseleImage: (param) => dispatch(updateCarouseleImage(param)),
		loadCatalog: (param) => dispatch(loadCatalog(param)),
		updateCart: (param) => dispatch(updateCart(param)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));