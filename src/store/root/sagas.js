import { all } from 'redux-saga/effects';
import { rootRouteSaga } from '../routes/sagas';


export default function* rootSaga() {
    yield all([
      rootRouteSaga()
    ])
}