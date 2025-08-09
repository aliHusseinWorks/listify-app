import { combineReducers } from 'redux';

import authReducer from './slices/auth.slice';
import homeReducer from './slices/home.slice';

export const rootReducer = combineReducers({
    auth: authReducer,
    home: homeReducer
});

export type RootState = ReturnType<typeof rootReducer>;
