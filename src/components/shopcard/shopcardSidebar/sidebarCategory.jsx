import React from 'react';
import {updateActiveCategory, loadCatalog, updateActivePage} from "../../../store/action_creators";
import {connect} from "react-redux";
import * as PropTypes from 'prop-types';

SidebarCategory.propTypes = {
	activeCategoryFlag: PropTypes.string,
	updateActiveCategory: PropTypes.func,
	loadCatalog: PropTypes.func,
	updateActivePage: PropTypes.func,
};

function SidebarCategory(props) {

	// деструктуризация, чтобы пропс каждый раз не приписывать, а сразу писать элементы
	const {
		activeCategoryFlag,
		updateActiveCategory,
		loadCatalog,
		updateActivePage,
	} = props;

	// list of categories retrieved from server
	const categoryList = [
		{
			key: "All",
			title: "All"
		},
		{
			key: "1",
			title: "Tables"
		},
		{
			key: "2",
			title: "Chairs"
		},
		{
			key: "3",
			title: "Seats"
		},
		{
			key: "4",
			title: "Coaches"
		},
		{
			key: "5",
			title: "Lamps"
		},
	];

	function categoryChangeHandler(e) {
		let category = e.currentTarget.getAttribute("name")
		console.log("category: ", category)
		if(category=="All"){
			updateActiveCategory(category)
			loadCatalog(`http://test-api.ipromote.ru/API/CATALOG/FIND`);
		} else {
			updateActiveCategory(category)
			loadCatalog(`http://test-api.ipromote.ru/API/CATALOG/FIND?category=${ category }`);
		};
		updateActivePage("1") // сбрасываем на первую страницу
	};

	function renderBrandsList() {
		return categoryList.map ((item) => {
			return (
				<li
					onClick= { (e) => categoryChangeHandler(e) }
					key = { item.key } // не рендерится, т.к. чисто ридаксовская фишка, чтобы передать значения
					name = { item.key }
					className= { activeCategoryFlag===item.key ? "active" : "" }>
					<a href="#"> { item.title } </a>
				</li>
			)
		})
	};

	return (
		<div className="widget catagory mb-50">
			<h6 className="widget-title mb-30">Catagories</h6>
			<div className="catagories-menu">
				<ul>
					{ renderBrandsList() }
				</ul>
			</div>
		</div>
	);
}

const mapStateToProps = (store) => {
	return {
		activeCategoryFlag: store.app.activeCategoryFlag,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateActiveCategory: (param) => dispatch(updateActiveCategory(param)),
		loadCatalog: (param) => dispatch(loadCatalog(param)),
		updateActivePage: (param) => dispatch(updateActivePage(param)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCategory);

