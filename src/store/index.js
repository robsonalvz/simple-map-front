import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root/sagas';
import createRootReducer from './root/reducer';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

// add reactotron for debug applications

const composer = applyMiddleware(...middlewares);

const store = createStore(createRootReducer(), composer);

sagaMiddleware.run(rootSaga);

export default store