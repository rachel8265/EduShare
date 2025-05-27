// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import axios from "axios"
// import { TopicType } from "../../models/TopicType"


// export const fetchTopics = createAsyncThunk<TopicType[]>(
//   "topics/fetchTopics",
//   async () => {
    
//     const response = await axios.get(`http://localhost:5066/api/Topic`)
    
//     return response.data
//   }
// )

// interface TopicsState {
//   topics: TopicType[]
//   loading: boolean
//   error: string | null
// }

// const initialState: TopicsState = {
//   topics: [],
//   loading: false,
//   error: null
// }

// const topicsSlice = createSlice({
//   name: "topics",
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchTopics.pending, state => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchTopics.fulfilled, (state, action) => {
//         state.topics = action.payload
//         state.loading = false
//       })
//       .addCase(fetchTopics.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.error.message || "Failed to load topics"
//       })
//   }
// })

// export default topicsSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { TopicType } from "../../models/TopicType"

const API_URL = import.meta.env.VITE_API_URL

export const fetchTopics = createAsyncThunk<TopicType[]>(
  "topics/fetchTopics",
  async () => {
    const response = await axios.get(`${API_URL}/api/Topic`)
    return response.data
  }
)

interface TopicsState {
  topics: TopicType[]
  loading: boolean
  error: string | null
}

const initialState: TopicsState = {
  topics: [],
  loading: false,
  error: null
}

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTopics.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.topics = action.payload
        state.loading = false
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load topics"
      })
  }
})

export default topicsSlice.reducer