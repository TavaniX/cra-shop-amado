import React from 'react';
import ProductCategoriesItems from "./productCategoriesItems";

function ProductCategories() {
	return (
		// <div className="amado-pro-catagory clearfix" style={ {position: "relative", height: 1024.78+"px"} }>
		<div className="amado-pro-catagory clearfix" style={ {display: "flex", flexWrap: "wrap"} }>
			<ProductCategoriesItems />
		</div>
	);
}

export default ProductCategories;