import { configureStore} from "@reduxjs/toolkit";
import defaultformReducer from "./defaultformstore";
import fooditemReducer from "./fooditemStore";

const store = configureStore({
    reducer :  {defForm : defaultformReducer , foodItem : fooditemReducer}
});


export default store;
