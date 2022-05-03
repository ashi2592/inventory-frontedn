import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'react-pro-sidebar/dist/css/styles.css';
import 'semantic-ui-css/semantic.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './redux/reducers';
import rootSaga from './redux/sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)))
sagaMiddleware.run(rootSaga);
ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>, document.getElementById('root'));

if (module.hot) { module.hot.accept(App); }