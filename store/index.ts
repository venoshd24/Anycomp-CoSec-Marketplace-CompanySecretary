import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './slices/exampleSlice';

/**
 * Create and configure the Redux store.
 * - `reducer`: an object whose keys define top-level state field names,
 *   and whose values are the slice reducers that update those fields.
 */
export const store = configureStore({
  reducer: {
    // Mounts your `example` slice under `state.example`
    example: exampleReducer,
  },
});

/**
 * Infer the `RootState` type from the store itself.
 * This represents the entire Redux state tree.
 * Use this type when selecting state in components:
 *   const value = useSelector((state: RootState) => state.example.value);
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Extract the `AppDispatch` type from the store.
 * This is the type signature for `dispatch` and is handy
 * when using `useDispatch` with TypeScript:
 *   const dispatch = useDispatch<AppDispatch>();
 */
export type AppDispatch = typeof store.dispatch;
