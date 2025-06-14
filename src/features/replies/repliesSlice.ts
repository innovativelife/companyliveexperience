import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

//Temporary Data -- Ask how to change
import temporaryData from "../../localData.json";
const tenantid = temporaryData.tenantid;
const userUID= temporaryData.userUID;
const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface Reply {
  tenantId: string,
  postId: string,
  timeSent: string,
  employeeUID: string,
  message: string
}

const anInitialState: Reply = {
  tenantId: "",
  postId: "",
  timeSent: "",
  employeeUID: "",
  message: ""
};

export interface ReplyState {
  loading: boolean;
  replies: Array<Reply>;
  singleReply: Reply;
  error: string | undefined;
}

const initialState: ReplyState = {
  loading: false,
  replies: [],
  singleReply: anInitialState,
  error: undefined,
};

export const fetchReplies = createAsyncThunk(
  "replies/fetchReplies",
  async (postId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/tenants/${tenantid}/${postId}/replies`,{
      method: "GET",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        tenantid: "tenant1",
        uid: "tester",
      }),
    });
    const data = await response.json();
    return data["replies"];
  }
);

export const createReply = createAsyncThunk(
  "replies/createReply",
  async ({ messageString, postId }: { messageString: string, postId: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/tenants/${tenantid}/${postId}/reply`, {
      method: "POST",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        tenantid: "tenant1",
        uid: "localDev",
      }),
      body: JSON.stringify({
        employeeUID: userUID,
        message: messageString
      })
    });

    const data = await response.json();

    if(!response.ok){
      console.log(data.desc)
      return;
    }
  }
);

const replySlice = createSlice({
  name: "replies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchReplies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchReplies.fulfilled,
      (state, action: PayloadAction<Array<Reply>>) => {
        state.loading = false;
        state.replies = action.payload;
      }
    );
    builder.addCase(fetchReplies.rejected, (state, action) => {
      state.loading = false;
      state.replies = [];
      state.error = action.error.message;
    });

    builder.addCase(createReply.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReply.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createReply.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {},
});
export const ReplySelector = (state: RootState) => state.replies;
export default replySlice.reducer;
