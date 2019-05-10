import   { createStore, combineReducers} from 'redux';
import fontsReducer from "./fonts-reducer";

const rootReducers = combineReducers({
	fontsReducer
})

 const store = createStore(rootReducers);

 export default store;