import * as ACT from './actions';
import { combineReducers } from 'redux';

const initialState = {
	goods: {}, // сфетченные данные для каталога всея Руси
	isLoading: {}, // объект, характеризующий состояние загрузки данных с бэка, внутри будут ключи для каждого из урлов АПИ
	activeCategoryFlag: "All",
	viewListSelectedItem: 4, // viewList количество отображаемых элементов на странице
	viewListDrop: false, // тру или фолз для выпадающего меню выбора цифр отображения страниц
	sortListSelectedItem: "Date", // sortBy текст
	sortByDrop: false,
	lsCart: [], // данные из корзины, которые приходят с localStorage - id, quantity, img, name, available
	cartSummary: [0, 0], // первое количество продуктов, второе расчетная сумма
	brandList: "All", // текущий выбранный бренд
	colorList: "All", // текущий выбранный бренд
	singleProductImg: {}, // сфетченные данные для одного продукта
	singleProductDesc: {}, // сфетченные данные для одного продукта
	lastRequestedProduct: "", // последний запрошенные товар
	currentCarouseleImage: "0", // активная картинка в карусели
	activePage: "1", // отображает активную страницу
};

function rootReducer(store=initialState, action) {
	switch (action.type) {
		case ACT.UPDATE_GOODS:
			return {
				...store,
				goods: { ...action.payload },
			};
		case ACT.UPDATE_LOADING:
			return {
				...store,
				isLoading: { ...store.isLoading, ...action.payload },
			};
		case ACT.UPDATE_ACTIVE_CATEGORY:
			return {
				...store,
				activeCategoryFlag: action.payload,
			};
		case ACT.VIEW_LIST_NUMBER:
			return {
				...store,
				viewListSelectedItem: action.payload,
			};
		case ACT.VIEW_LIST_ISOPEN:
			return {
				...store,
				viewListDrop: action.payload,
			};
		case ACT.SORT_BY_TITLE:
			return {
				...store,
				sortListSelectedItem: action.payload,
			};
		case ACT.SORT_BY_ISOPEN:
			return {
				...store,
				sortByDrop: action.payload,
			};
		case ACT.UPDATE_CART:
			return {
				...store,
				lsCart: [...action.payload],
			};
		case ACT.UPDATE_BRANDS:
			return {
				...store,
				brandList: action.payload,
			};
		case ACT.UPDATE_COLORS:
			return {
				...store,
				colorList: action.payload,
			};
		case ACT.SINGLE_PRODUCT_IMG:
			return {
				...store,
				singleProductImg: {...action.payload},
			};
		case ACT.SINGLE_PRODUCT_DESC:
			return {
				...store,
				singleProductDesc: {...action.payload},
			};
		case ACT.LAST_REQUESTED_PRODUCT:
			return {
				...store,
				lastRequestedProduct: action.payload,
			};
		case ACT.CURRENT_CAROUSELE_IMAGE:
			return {
				...store,
				currentCarouseleImage: action.payload,
			};
		case ACT.ACTIVE_PAGE:
			return {
				...store,
				activePage: action.payload,
			};
		default:
			return store;
	};
};

export default () => combineReducers({
	app: rootReducer
});
