import React from 'react';
import {updateSortByList, sortByListDropUpdate} from "../../../../store/action_creators";
import {connect} from "react-redux";
import * as PropTypes from 'prop-types';

SpchSortingBy.propTypes = {
	sortListSelectedItem: PropTypes.string,
	updateSortByList: PropTypes.func,
	sortByDrop: PropTypes.bool,
	sortByListDropUpdate: PropTypes.func,
};

function SpchSortingBy(props) {

	const sortByListValues = ["Date", "Newest", "Popular"];

	const {
		sortListSelectedItem,
		updateSortByList,
		sortByDrop,
		sortByListDropUpdate,
	} = props;

	function handlerSetActive(e) {
		updateSortByList(e.currentTarget.getAttribute("name"))
	};

	function dropdownHandler() {
		sortByListDropUpdate(!sortByDrop)
	}

	function sortByRender() {
		return sortByListValues.map ( (item) => {
			return (
				<li onClick={ handlerSetActive }
				    key={ item }
				    data-value="value"
				    className= { sortListSelectedItem==item ? "option selected" : "option" } // если выбранный элем совпадает с элемом маппа, то selected для форматирования
				    name={ item } >
					{ item }
				</li>
			)

		});
	};

	return (
		<div className="sort-by-date d-flex align-items-center mr-15">
			<p>Sort by</p>
			<form action="#" method="get">
				<div onClick={ dropdownHandler } className={`nice-select ${sortByDrop && "open"}`} tabIndex="0">
					<span className="current">{ sortListSelectedItem }</span>
					<ul className="list">
						{ sortByRender() }
					</ul>
				</div>
			</form>
		</div>
	);
}

const mapStateToProps = (store) => {
	return {
		sortListSelectedItem: store.app.sortListSelectedItem,
		sortByDrop: store.app.sortByDrop,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateSortByList: (param) => dispatch(updateSortByList(param)),
		sortByListDropUpdate: (param) => dispatch(sortByListDropUpdate(param)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SpchSortingBy);