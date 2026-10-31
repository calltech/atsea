import React from 'react'
import { createRoot } from 'react-dom/client'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { thunk } from 'redux-thunk'
import reducer from './reducers'
import {
  fetchAllDummyItems,
  fetchContainerId,
} from './actions'
import App from './containers/App'
import CheckoutContainer from './containers/CheckoutContainer'

const store = createStore(
  reducer,
  applyMiddleware(thunk),
)

store.dispatch(fetchAllDummyItems())
store.dispatch(fetchContainerId())

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/checkout" element={<CheckoutContainer />} />
      </Routes>
    </HashRouter>
  </Provider>,
)
