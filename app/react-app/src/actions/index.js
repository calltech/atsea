import { getJwtToken } from './storage'
import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const API = '/api'
const UTILITY = '/utility'

const request = async (url, options = {}) => {
  const response = await fetch(url, options)
  const contentType = response.headers.get('content-type') || ''
  const body = contentType.includes('application/json') ? await response.json() : null
  if (!response.ok) {
    const message = (body && (body.errorMessage || body.message))
      || `Request failed with status ${response.status}`
    const error = new Error(message)
    error.status = response.status
    throw error
  }
  return body
}

const jsonOptions = (method, body) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify(body),
})

const asyncAction = (type, promiseFactory) => async (dispatch) => {
  dispatch({ type: `${type}_REQ` })
  try {
    const payload = await promiseFactory()
    dispatch({ type: `${type}_ACK`, payload })
    return payload
  } catch (error) {
    dispatch({ type: `${type}_ERR`, error: error.message })
    throw error
  }
}

export const createOrder = (values) => asyncAction(types.CREATE_ORDER, () => (
  request(`${API}/order/`, jsonOptions('POST', {
    // The backend cannot create an order without an id even though it generates one.
    orderId: 0,
    orderDate: values.orderDate,
    customerId: values.customerId,
    productsOrdered: values.quantityById,
  }))
))

export const purchaseOrder = () => asyncAction(types.PURCHASE, () => (
  request('/purchase/', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${getJwtToken()}`,
    },
  })
))

export const fetchAllItems = () => asyncAction(types.ITEMS_REQUEST, () => (
  request(`${API}/product/`, { headers: { Accept: 'application/json' } })
))

export const fetchAllCustomers = () => asyncAction(types.FETCH_CUSTOMERS, () => (
  request(`${API}/customer/`, { headers: { Accept: 'application/json' } })
))

export const createCustomer = (username, password) => asyncAction(types.CREATE_CUSTOMER, () => (
  request(`${API}/customer/`, jsonOptions('POST', {
    address: '144 Townsend Street',
    email: 'test@gmail.com',
    name: 'Jess',
    password,
    phone: '9999999999',
    username,
    customerId: 0,
    enabled: true,
    role: 'user',
  }))
))

export const getCustomer = (username) => asyncAction(types.LOGIN_CUSTOMER, () => (
  request(`${API}/customer/username=${encodeURIComponent(username)}`, {
    headers: { Accept: 'application/json' },
  })
))

export const loginCustomer = (username, password) => asyncAction(types.LOGIN_CUSTOMER, () => (
  request('/login/', jsonOptions('POST', { username, password }))
))

export const fetchContainerId = () => asyncAction(types.FETCH_CONTAINER_ID, () => (
  request(`${UTILITY}/containerid/`, { headers: { Accept: 'application/json' } })
))

export const logoutCustomer = () => (dispatch) => {
  dispatch({
    type: types.LOGOUT_CUSTOMER,
  })
}

export const addUser = (username) => (dispatch) => {
  dispatch({
    type: types.ADD_USER,
    username,
  })
}

const fetchDummyItems = products => ({
  type: types.DUMMY_ITEMS_REQUEST,
  products,
})

export const fetchAllDummyItems = () => (dispatch) => {
  shop.getProducts((products) => {
    dispatch(fetchDummyItems(products))
  })
}

// success message shows for 2.5 seconds
export const resetItemAdded = () => (dispatch) => {
  dispatch({
    type: types.RESET_ADD_TO_CART,
  })
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId,
})

export const showAddToCart = () => (dispatch) => {
  dispatch({
    type: types.SHOW_ADD_TO_CART,
  })
}

export const addToCart = productId => (dispatch) => {
  dispatch(addToCartUnsafe(productId))
  dispatch(showAddToCart())
  setTimeout(() => {
    dispatch(resetItemAdded())
  }, 2500)
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST,
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart,
    })
  })
}
