import * as ACT from './actions'

export function updateCatalog(payload) {
	return {
		type: ACT.UPDATE_GOODS, // 'UPDATE_GOODS'
		payload, // json
	}
}

export function updateLoading(payload) {
	return {
		type: ACT.UPDATE_LOADING,
		payload,
	}
}

export function updateActiveCategory (payload) {
	return {
		type: ACT.UPDATE_ACTIVE_CATEGORY,
		payload,
	}
}

// кнопка viewList на странице Shop
export function updateViewList (payload) {
	return {
		type: ACT.VIEW_LIST_NUMBER,
		payload,
	}
}

export function viewListDropUpdate (payload) {
	return {
		type: ACT.VIEW_LIST_ISOPEN,
		payload,
	}
}

// кнопка SortBy на странице Shop
export function updateSortByList (payload) {
	return {
		type: ACT.SORT_BY_TITLE,
		payload,
	}
}

export function sortByListDropUpdate (payload) {
	return {
		type: ACT.SORT_BY_ISOPEN,
		payload,
	}
}

// работаем с ls cart
export function updateCart (payload) {
	return {
		type: ACT.UPDATE_CART,
		payload,
	}
}

// работаем с фильтрами брендов
export function updateBrands (payload) {
	return {
		type: ACT.UPDATE_BRANDS,
		payload,
	}
}

// работаем с фильтрами цветов
export function updateColors (payload) {
	return {
		type: ACT.UPDATE_COLORS,
		payload,
	}
}

// работаем с страницей продукта
export function updateSingleImage (payload) {
	return {
		type: ACT.SINGLE_PRODUCT_IMG,
		payload,
	}
}

export function updateSingleDesc (payload) {
	return {
		type: ACT.SINGLE_PRODUCT_DESC,
		payload,
	}
}

export function updateIdOfLastProduct (payload) {
	return {
		type: ACT.LAST_REQUESTED_PRODUCT,
		payload,
	}
}

// работа с каруселью
export function updateCarouseleImage (payload) {
	return {
		type: ACT.CURRENT_CAROUSELE_IMAGE,
		payload,
	}
}

// работа с пагинацией
export function updateActivePage (payload) {
	return {
		type: ACT.ACTIVE_PAGE,
		payload,
	}
}

// Получить список картинок для ОДНОГО ТОВАРА
// http://test-api.ipromote.ru/API/IMAGE/FIND
// 	Параметры: - cid - ID товара, для которого хотим получить картинки
//
// Получить список отзывов для ОДНОГО ТОВАРА
// http://test-api.ipromote.ru/API/REVIEW/FIND
// Параметры: - cid - ID товара, для которого хотим получить картинки

// загрузка данных одного товара, по которому кликнули
export const loadSingleProduct = (productId) => {

	// productID - айди продукта, на который кликнули
	// typeOfAction - что делаем, загружаем картинку если 0, и отзывы если пришла 1

	return (dispatch) => {

		// массив, по которому определим что фетчить - картинку или отзыв
		let linksArray = [
			{
				link: `http://test-api.ipromote.ru/API/IMAGE/FIND?cid=${ productId }`,
				action: updateSingleImage,
				flag: "singleProductImg",
			},
			{
				link: `http://test-api.ipromote.ru/API/REVIEW/FIND?cid=${ productId }`,
				action: updateSingleDesc,
				flag: "singleProductDesc",
			},
		];

		for(let i=0; i<2;i++) {

			dispatch(updateLoading( {[linksArray[i].flag]: true} )); // так как linkArray - это объект, то обязательно в []

			const data = fetch(linksArray[i].link);

			data.then((data) => {
				return data.json();
			}).then( (data) => {
				dispatch(linksArray[i].action(data));
				dispatch(updateLoading({ [linksArray[i].flag]: false }));
			}).
			catch((e) => {
				dispatch(updateLoading({ [linksArray[i].flag]: false }));
				console.log("ERROR while loading data from url: ", e);
			});
		};
	};
};

// загрузка данных в каталог
export const loadCatalog = (renderLink) => {

	return (dispatch) => {

		// породили action в сторону ридакса, под названием "поставь флаг загрузки товаров в тру"
		dispatch(updateLoading({ goods: true }));

		const data = fetch(renderLink);

		data.then((data) => {
			return data.json();
		}).then( (data) => {
			// экшн - обновить данные в каталоге (в ридаксе)
			dispatch(updateCatalog(data));
			// экшен - обновить флажок загрузки, сказать что = фолз, типа загрузка завешена
			dispatch(updateLoading({ goods: false }));

		}).
		catch((e) => {
			dispatch(updateLoading({ goods: false }));
			console.log("ERROR while loading data from url: ", e);
		});
	};
};


