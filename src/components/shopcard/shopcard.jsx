import React from 'react';
import ShopcardSidebar from "./shopcardSidebar/shopcardSidebar";
import ShopcardProducts from "./shopcardProducts/shopcardProducts";

function Shopcard(props) {
	return (
		<>
			<ShopcardSidebar />
			<ShopcardProducts />
		</>
	);
}

export default Shopcard;