import React from 'react';
import { updateViewList, viewListDropUpdate, updateActivePage } from "../../../../store/action_creators";
import { connect } from "react-redux";
import * as PropTypes from 'prop-types';

SpchSortingViewProd.propTypes = {
	viewListSelectedItem: PropTypes.number,
	updateViewList: PropTypes.func,
	viewListDrop: PropTypes.bool,
	viewListDropUpdate: PropTypes.func,
	updateActivePage: PropTypes.func,
};

function SpchSortingViewProd(props) {

	const viewListValues = [4, 8, 16, 24];

	const {
		viewListSelectedItem,
		updateViewList,
		viewListDrop,
		viewListDropUpdate,
		updateActivePage,
	} = props;

	function handlerSetActive(e) {
		updateViewList(e.currentTarget.getAttribute("name"))
		updateActivePage("1") // сбрасываем на первую страницу
	};

	function dropdownHandler() {
		viewListDropUpdate(!viewListDrop)
	}

	// Поставь каунтер и прекращай рендер иф каунтер == кол-ву элементов в стейте.
	function viewListValuesRender() {
		return viewListValues.map ( (item) => {
			return (
					<li onClick={ handlerSetActive }
					    key={ item }
					    data-value="value"
					    className= { viewListSelectedItem==item ? "option selected" : "option" } // если выбранный элем совпадает с элемом маппа, то selected для форматирования
					    name={ item } >
						{ item }
					</li>
				)
			});
	};

	return (
		<div className="view-product d-flex align-items-center">
			<p>View</p>
			<form action="#" method="get">
				<div onClick={ dropdownHandler } className={`nice-select ${viewListDrop && "open"}`} tabIndex="0">
					<span className="current">{ viewListSelectedItem }</span>
					<ul className="list">
						{ viewListValuesRender() }
					</ul>
				</div>
			</form>
		</div>
	);
}

const mapStateToProps = (store) => {
	return {
		viewListSelectedItem: store.app.viewListSelectedItem,
		viewListDrop: store.app.viewListDrop,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateViewList: (param) => dispatch(updateViewList(param)),
		viewListDropUpdate: (param) => dispatch(viewListDropUpdate(param)),
		updateActivePage: (param) => dispatch(updateActivePage(param)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SpchSortingViewProd);