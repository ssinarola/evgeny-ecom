import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export default configureStore({
  reducer: rootReducer,
  // middleware: () => new Tuple(thunk, logger),
});