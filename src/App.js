import React, { Suspense } from 'react';
import './App.css';
import MobileNav from "./components/mobile/mobileNav";
import Navigation from "./components/navigation/navigation";
import roots from './router/router';
import SubscribeForm from "./components/newsletters/subscribeForm";
import FooterMain from "./components/footer/footerMain";
import { BrowserRouter} from "react-router-dom";
import Spinner from "./components/spinner/spinner";
import { loadCatalog, updateCart } from "./store/action_creators";
import { connect } from 'react-redux';

function App(props) {

	props.loadCatalog('http://test-api.ipromote.ru/API/CATALOG/FIND');

	if (localStorage.length === 0) {
		localStorage.setItem('ls', JSON.stringify([]));
	} else {
		props.updateCart(JSON.parse(localStorage.getItem('ls')))
	};

	return (
		<BrowserRouter>
			<div className="main-content-wrapper d-flex clearfix">
				<MobileNav />
				<Navigation />
				<Suspense fallback={ <Spinner /> }>
					{
						roots
					}
				</Suspense>
			</div>
			<SubscribeForm />
			<FooterMain />
		</BrowserRouter>
	);
}

const mapStateToProps = (store) => {
	return {
		//
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadCatalog: (param) => dispatch(loadCatalog(param)),
		updateCart: (param) => dispatch(updateCart(param)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
