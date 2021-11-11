import { configureStore} from "@reduxjs/toolkit";
import defaultformReducer from "./defaultformstore";
import fooditemReducer from "./fooditemStore";
import averageDataStore from "./averageDataStore";

const store = configureStore({
    reducer :  {defForm : defaultformReducer , foodItem : fooditemReducer , avgData  : averageDataStore}
});


export default store;
