import React from 'react';
import {connect} from "react-redux";

function SpchTotalProducts(props) {

	let startItem = (Number(props.activePage) - 1) * (Number(props.viewListSelectedItem)); // 0
	let endItem = startItem + Number(props.viewListSelectedItem); // 4

	return (
		<div className="total-products">
			<p>Showing { startItem+1 } - { endItem }</p>
			<div className="view d-flex">
				<a href="#"><i className="fa fa-th-large" aria-hidden="true"></i></a>
				<a href="#"><i className="fa fa-bars" aria-hidden="true"></i></a>
			</div>
		</div>
	);
}

const mapStateToProps = (store) => {
	return {
		viewListSelectedItem: store.app.viewListSelectedItem,
		activePage: store.app.activePage,
	};
};

export default connect(mapStateToProps)(SpchTotalProducts);