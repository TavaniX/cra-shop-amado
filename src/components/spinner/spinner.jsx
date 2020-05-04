import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
	return (
		<ClipLoader
			size={150}
			color={"#61dafb"}
			loading
		/>
	)
};
export default React.memo(Spinner);