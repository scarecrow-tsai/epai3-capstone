import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import landingReducer from '../features/landing/landingSlice';
import formReducer from "../features/form/formSlice"
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    landing: landingReducer,
    form: formReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
