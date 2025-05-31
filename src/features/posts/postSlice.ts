import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

//Temporary Data -- Ask how to change
import temporaryData from "../../temporaryData.json";
const tenantid = temporaryData.tenantid;
const userUID= temporaryData.userUID;

export interface Post {
  postId: string,
  timeSent: string,
  status: string,
  sendTo: string,
  employeeUID: string,
  message: string
}

export interface PostState {
  loading: boolean;
  posts: Array<Post>;
  error: string | undefined;
}

const initialState: PostState = {
  loading: false,
  posts: [],
  error: undefined,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await fetch(`http://127.0.0.1:8080/post/${tenantid}`, {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        tenantid: "tenant1",
        uid: "tester",
      }),
    });
    const data = await response.json();
    return data["posts"];
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (messageString: string) => {
    const response = await fetch(`http://127.0.0.1:8080/post/${tenantid}`, {
      method: "POST",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        tenantid: "tenant1",
        uid: "localDev",
      }),
      body: JSON.stringify({
        postId: "Id2",
        message: messageString,
        timeSent: "9:30",
        employeeUID: userUID,
        status:"sent",
        sendTo:"all"
      })
    });

    const data = await response.json();

    if(!response.ok){
      console.log(data.desc)
      return;
    }
    // return data["posts"];
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Array<Post>>) => {
        state.loading = false;
        state.posts = action.payload;
      }
    );
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {},
});
export const postSelector = (state: RootState) => state.post;
export default postSlice.reducer;
