import React from 'react';
import {updateActivePage} from "../../../store/action_creators";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import Spinner from "../../spinner/spinner";

SpcRowFoot.propTypes = {
	catalog: PropTypes.object,
	isLoadingGoods: PropTypes.bool,
	activePage: PropTypes.string,
	updateActivePage: PropTypes.func,
	viewListSelectedItem: PropTypes.number,
};

function SpcRowFoot(props) {

	const {
		catalog,
		isLoadingGoods,
		activePage,
		updateActivePage,
		viewListSelectedItem,
	} = props;

	let counter = 0;
	let pageArray = [];


	if(isLoadingGoods) {
		return (
			<Spinner />
		)
	};

	// определяем количество кнопок страниц
	for(let i=1; i<=(Math.ceil(Number(catalog.length))/Number(viewListSelectedItem))+1;i++){
		pageArray.push(i)
	};

	function pagesNumberHandler(e) {
		updateActivePage(e.currentTarget.getAttribute("name"))
	}

	function renderPageBy() {
		return(
			pageArray.map( (item) => {
				return(
					<li onClick={ pagesNumberHandler } name={ item } className={ Number(activePage)===item ? "page-item active" : "page-item" }>
						<div className="page-link">{ item }</div>
					</li>
				)
			})
		);
	};

	return (
		<div className="row">
			<div className="col-12">
				<nav aria-label="navigation">
					<ul className="pagination justify-content-end mt-50">
						{ renderPageBy() }
					</ul>
				</nav>
			</div>
		</div>
	);
}

const mapStateToProps = (store) => {
	return {
		catalog: store.app.goods.data,
		isLoadingGoods: store.app.isLoading.goods || false,
		activePage: store.app.activePage,
		viewListSelectedItem: store.app.viewListSelectedItem,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateActivePage: (param) => dispatch(updateActivePage(param)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SpcRowFoot);