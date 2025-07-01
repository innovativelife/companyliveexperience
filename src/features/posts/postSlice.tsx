import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface PostState {
 selectedPostId: string | null;
}

const initialState: PostState = {
  selectedPostId: null
};

const postSlice = createSlice({
  name: "postUI",
  initialState,
  reducers: {
    setSelectedPost(state, action: PayloadAction<string>) {
      state.selectedPostId = action.payload;
    },
    clearSelectedPost(state) {
      state.selectedPostId = null;
    }
  },
});

export const postSelector = (state: RootState) => state.post;
export default postSlice.reducer;
