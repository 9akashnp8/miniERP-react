import { combineReducers } from "redux";
import authReducer from '../../features/auth/authSlice';

const rootReducer = combineReducers({
    auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>