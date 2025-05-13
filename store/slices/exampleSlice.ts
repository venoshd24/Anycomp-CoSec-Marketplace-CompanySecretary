import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of this slice's state.
interface ExampleState {
  value: number;
}

/**
 * Initial state for the slice.
 * Starts with `value` set to 0.
 */
const initialState: ExampleState = {
  value: 0,
};

/**
 * Create a slice of Redux state named "example".
 * This generates:
 *  - action creators (`increment`, `setValue`)
 *  - a reducer function to handle those actions
 */
const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    /**
     * increment: Increases `value` by 1.
     * Uses Immer under the hood, so it can "mutate" state safely.
     */
    increment(state) {
      state.value += 1;
    },

    
    // setValue: Sets `value` to the provided payload.
    setValue(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

// Export the auto-generated action creators
export const { increment, setValue } = exampleSlice.actions;

// Export the reducer to be added to the store
export default exampleSlice.reducer;
