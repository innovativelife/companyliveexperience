import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface ReactionsState {
  selectedReactionId: string | null;
  showReactionEditor: boolean;
}

const initialState: ReactionsState = {
  selectedReactionId: null,
  showReactionEditor: false,
};

const reactionsSlice = createSlice({
  name: "reactionsUI",
  initialState,
  reducers: {
    setSelectedReaction(state, action: PayloadAction<string>) {
      state.selectedReactionId = action.payload;
    },
    clearSelectedReaction(state) {
      state.selectedReactionId = null;
    },
    toggleReactionEditor(state) {
      state.showReactionEditor = !state.showReactionEditor;
    },
    setReactionEditorVisible(state, action: PayloadAction<boolean>) {
      state.showReactionEditor = action.payload;
    },
  },
});

export const {
  setSelectedReaction,
  clearSelectedReaction,
  toggleReactionEditor,
  setReactionEditorVisible,
} = reactionsSlice.actions;

export const reactionUISelector = (state: RootState) => state.reactions;

export default reactionsSlice.reducer;
