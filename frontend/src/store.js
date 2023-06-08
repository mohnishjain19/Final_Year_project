import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {forgotPasswordreducer, userReducer,profileReducer} from "./reducer/UserReducer"


const reducer=combineReducers({
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordreducer
});


let initialstate={
};
const middleware=[thunk];

const store=createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)));
 

export default store;
