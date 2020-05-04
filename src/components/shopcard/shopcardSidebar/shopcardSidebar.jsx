import React from 'react';
import SidebarCategory from "./sidebarCategory";
import SidebarBrands from "./sidebarBrands";
import SidebarColor from "./sidebarColor";
import SidebarPrice from "./sidebarPrice";

function ShopcardSidebar() {
	return (
		<div className="shop_sidebar_area">
			<SidebarCategory />
			<SidebarBrands />
			<SidebarColor />
			<SidebarPrice />
		</div>
	);
}

export default ShopcardSidebar;