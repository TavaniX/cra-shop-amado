import React, { lazy } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import * as URL from './url';

const Home = lazy(() => import ('../pages/home'));
const Shop = lazy(() => import ('../pages/shop') );
const Product = lazy(() => import ('../pages/details') );
const Cart = lazy(() => import ('../pages/cart') );
const Checkout = lazy(() => import ('../pages/checkout') );

export default (

		<Switch>
			<Route exact path={ URL.ROOT } component={ Home } />
			<Route exact path={ URL.SHOP } component={ Shop } />
			<Route exact path={ URL.DETAILS } component={ Product } />
			<Route exact path={ URL.DETAILS_CODE } component={ Product } />
			<Route exact path={ URL.CART } component={ Cart } />
			<Route exact path={ URL.CHECKOUT } component={ Checkout } />
		</Switch>

);
