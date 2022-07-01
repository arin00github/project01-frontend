import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOneFilter } from "Types/table-inteface";

export interface deplomacyState {
  selCountry?: IOneFilter;
}

const initialState: deplomacyState = {
  selCountry: undefined,
};

export const deplomacySlice = createSlice({
  name: "deplomacy",
  initialState,
  reducers: {
    putSelCountry: (state, action: PayloadAction<IOneFilter | undefined>) => {
      state.selCountry = action.payload;
    },
  },
});

export const { putSelCountry } = deplomacySlice.actions;

export default deplomacySlice.reducer;
