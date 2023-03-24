import { takeLatest, all, call, put } from "redux-saga/effects"
import { fetchTicketMasterEvents } from "../../utils/api/api.utils"

import {
  fetchProductsFailure,
  fetchProductsSuccess,
} from "./products.action"

import { PRODUCTS_ACTION_TYPES } from "./products.types"

export function* fetchProductsStartAsync() {
  try {
    const productsArray = yield call(fetchTicketMasterEvents, "products")
    yield put(fetchProductsSuccess(productsArray))
  } catch (error) {
    yield put(fetchProductsFailure(error))
  }
}

export function* onFetchProducts() {
  yield takeLatest(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START, fetchProductsStartAsync)
}

export function* productsSaga() {
  yield all([call(onFetchProducts)])
}
