import React from 'react';
import {loadCatalog} from "../../../store/action_creators";
import {connect} from "react-redux";
import * as PropTypes from 'prop-types';
import Spinner from "../../spinner/spinner";
import {Link} from "react-router-dom";
import * as URL from '../../../router/url';

Item1.propTypes = {
	catalog: PropTypes.array,
	isLoading: PropTypes.bool,
};

function Item1(props) {

	// деструктуризация, чтобы пропс каждый раз не приписывать, а сразу писать элементы
	const {
		catalog,
		isLoading,
	} = props;

	if (isLoading) {
		return <Spinner />
	};

	return  (
		catalog.map( (item) => {
			return(
				<div key={ item.id } className="single-products-catagory clearfix" >
					<Link to={ `${URL.DETAILS}/${ item.id }` }>
						<img src={ `http://test-api.ipromote.ru/img/${item.img_url}` } alt="" style = { {marginTop: "200px"} }/>
						<div className="hover-content">
							<div className="line"></div>
							<p>From ${ item.price }</p>
							<h4>{ item.title }</h4>
						</div>
					</Link>
				</div>
			)
		})
	);
};

const mapStateToProps = (store) => {
	return {
		catalog: store.app.goods.data || {}, // подключили пропсы из редюсера
		isLoading: store.app.isLoading.goods || false,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadCatalog: () => dispatch(loadCatalog()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Item1);