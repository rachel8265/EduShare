import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import FileSlice from './FileSlice';
// import UserReducer from './UserReducer';
import FolderSlice from './FolderSlice';
import TopicSlice from './TopicSlice';
// import FolderSlice from './FolderSlice';
const store = configureStore({
    reducer: {
        user: UserSlice, // ה-reducer של המשתמש
        // files: FileReducer, // ה-reducer של הקבצים
        // folders: FolderSlice,
        folders:FolderSlice,
        files: FileSlice,
         topics: TopicSlice
    },
  
  });
  
  
  export type RootStore = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;

export default store;
