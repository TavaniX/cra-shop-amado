import React from 'react';
import NavLogo from "./navLogo";
import NavBar from "./navBar";
import NavButtons from "./navButtons";
import NavSearch from "./navSearch";
import NavSocial from "./navSocial";

Navigation.propTypes = {

};

function Navigation() {
	return (
		<header className="header-area clearfix">
			<NavLogo />
			<NavBar />
			<NavButtons />
			<NavSearch />
			<NavSocial />
		</header>
	);
}

export default Navigation;
