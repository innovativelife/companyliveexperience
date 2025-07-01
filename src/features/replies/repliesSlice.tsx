import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface RepliesState {
  selectedReplyId: string | null;
  showReplyEditor: boolean;
}

const initialState: RepliesState = {
  selectedReplyId: null,
  showReplyEditor: false,
};

const repliesSlice = createSlice({
  name: "repliesUI",
  initialState,
  reducers: {
    setSelectedReply(state, action: PayloadAction<string>) {
      state.selectedReplyId = action.payload;
    },
    clearSelectedReply(state) {
      state.selectedReplyId = null;
    },
    toggleReplyEditor(state) {
      state.showReplyEditor = !state.showReplyEditor;
    },
    setReplyEditorVisible(state, action: PayloadAction<boolean>) {
      state.showReplyEditor = action.payload;
    },
  },
});

export const {
  setSelectedReply,
  clearSelectedReply,
  toggleReplyEditor,
  setReplyEditorVisible,
} = repliesSlice.actions;

export const repliesUISelector = (state: RootState) => state.replies;

export default repliesSlice.reducer;
