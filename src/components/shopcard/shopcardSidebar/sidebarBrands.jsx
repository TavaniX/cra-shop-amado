import React from 'react';
import { updateBrands, updateActivePage } from "../../../store/action_creators";
import {connect} from "react-redux";
import * as PropTypes from 'prop-types';

SidebarBrands.propTypes = {
	updateBrands: PropTypes.func,
	updateActivePage: PropTypes.func,
};

function SidebarBrands(props) {

	const {
		updateBrands,
		updateActivePage,
	} = props;

	let brandNames = [
		{
			id: 1,
			name: "Porto",
		},
		{
			id: 2,
			name: "boco-boco",
		},
		{
			id: 3,
			name: "Floran",
		},
		{
			id: 4,
			name: "Pagany",
		},
		{
			id: 5,
			name: "Ducu",
		},
		{
			id: 6,
			name: "Gramm",
		},
		{
			id: 7,
			name: "Rubiny",
		},
		{
			id: 8,
			name: "Tamana",
		},
	];

	function brandListHandler(e) {
		let idElem = (e.currentTarget.getAttribute("id"));
		let idElemRefactor = idElem.replace("num", "");

		updateBrands(idElemRefactor);
		updateActivePage("1"); // сбрасываем на первую страницу
	};

	function renderBrandsList() {
		return brandNames.map( (item) => {
			return (
				<div className="widget-desc" key={ item.id }>
					<div className="form-check">
						<input onClick={ brandListHandler } className="form-check-input" type="radio" value="" id={ `num${item.id}` } name="b" />
						<label className="form-check-label" htmlFor={ `num${item.id}` }>{ item.name }</label>
					</div>
				</div>
			)
		});
	}

	return (
		<div className="widget brands mb-50">
			<h6 className="widget-title mb-30">Brands</h6>
			<div className="widget-desc">
				<div className="form-check">
					<input onClick={ brandListHandler } className="form-check-input" type="radio" defaultChecked="true" value="" id="All" name="b" />
					<label className="form-check-label" htmlFor="All">All</label>
				</div>
			</div>
			{ renderBrandsList() }
		</div>
	)
}

const mapStateToProps = (store) => {
	return {
		//
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateBrands: (param) => dispatch(updateBrands(param)),
		updateActivePage: (param) => dispatch(updateActivePage(param)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarBrands);