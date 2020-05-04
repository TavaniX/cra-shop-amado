import React from 'react';
import { updateColors, updateActivePage } from "../../../store/action_creators";
import * as PropTypes from 'prop-types';
import {connect} from "react-redux";

SidebarColor.propTypes = {
	colorList: PropTypes.string,
	updateColors: PropTypes.func,
	updateActivePage: PropTypes.func,
};

function SidebarColor(props) {

	const {
		colorList,
		updateColors,
		updateActivePage,
	} = props;

	let colorNames = [
		{
			id: 1,
			color: "ff0000",
		},
		{
			id: 2,
			color: "ff9999",
		},
		{
			id: 3,
			color: "ffff00",
		},
		{
			id: 4,
			color: "999999",
		},
		{
			id: 5,
			color: "3399ff",
		},
		{
			id: 6,
			color: "000000",
		},
		{
			id: 7,
			color: "009933",
		},
		{
			id: 8,
			color: "ffffff",
		},
	];

	function colorListHandler(e) {
		let idElem = (e.currentTarget.getAttribute("idname"));

		updateColors(idElem);
		updateActivePage("1");
	};

	function renderColorsList() {
		return colorNames.map( (item) => {
			return (
				<li key={ item.id }>
					<a onClick={ colorListHandler } href="#" className={ `color${ item.id }` } idname={ item.id }></a>
				</li>
			)
		});
	}

	return (
		<div className="widget color mb-50">
			<h6 className="widget-title mb-30">Color</h6>
			<div className="widget-desc">
				<div
					onClick={ colorListHandler }
					idname="All"
					style={
						{
							width: "30px",
							height: "30px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
							fontSize: "12px",
							borderRadius: "50%",
							position: "relative",
							zIndex: "1",
							boxShadow: "0 0 3px rgba(0, 0, 0, 0.15)",
							border: `${colorList === "All" ? "1px solid black": "none"}`,
						}
					}
				>all</div>
				<br />
				<ul className="d-flex">

					{ renderColorsList() }

				</ul>
			</div>
		</div>
	);
}

const mapStateToProps = (store) => {
	return {
		colorList: store.app.colorList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateColors: (param) => dispatch(updateColors(param)),
		updateActivePage: (param) => dispatch(updateActivePage(param)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarColor);