// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// import { FolderType } from '../../models/FolderType';
// import { FileType } from '../../models/FileType'; // Ensure you have this import
// // import { RootStore } from './Store';
// // import { setFiles } from './FileSlice';
// import axiosInstance from '../axiosInstance';
// import { setFiles } from './FileSlice';
// interface FolderContents {
//     folders: FolderType[];
//     files: FileType[];
// }
// interface FolderState {
//     folders: FolderType[];
//     files: FileType[];
//     currentPath: FolderType[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: FolderState = {
//     folders: [],
//     files: [],
//     currentPath: [],
//     loading: false,
//     error: null,
// };

// export const fetchRootFoldersByUserId = createAsyncThunk<FolderContents, number>(
//     'folders/fetchRootFoldersByUserId',
//     async (userId: number, { dispatch }) => {

//         const response = await axiosInstance.get(`http://localhost:5066/api/Folder/users/${userId}/root-folders`);
//         dispatch(setFiles(response.data.files));

//         return response.data;
//     }
// );

// export const fetchFoldersByParentId = createAsyncThunk<FolderContents, number>(
//     'folders/fetchFoldersAndFilesByFolderId',
//     async (folderId: number) => {
//         const response = await axios.get(`http://localhost:5066/api/Folder/${folderId}/contents`);
//         return response.data;
//     }
// );
// export const createFolder = createAsyncThunk<FolderType, Partial<FolderType>>(
//     'folders/create',
//     async (folderData: Partial<FolderType>) => {
//         const response = await axios.post('http://localhost:5066/api/Folder', folderData);
//         return response.data;
//     }
// );

// export const softDeleteFolder = createAsyncThunk<boolean, number>(
//     'folders/deleteFolder',
//     async (id: number) => {
        
//         const response = await axios.delete(`http://localhost:5066/api/Folder/${id}/recursive`);
//         return response.data;
//     }
// );

// // export const renameFolder = createAsyncThunk(
// //     'files/renameFile',
// //     async (
// //         { folderId, newName }: { folderId: number, newName: string }) => {
// //         const response = await axios.put(`http://localhost:5066/api/folder/${folderId}/rename`,
// //             JSON.stringify(newName), 
// //             {
// //                 headers: {
// //                     'Content-Type': 'application/json' 
// //                 }
// //             }
// //         );
// //         return response.data;
// //     }
// // );

// // export const deleteFolder = createAsyncThunk(
// //     'folders/deleteFolder',
// //     async (folderId: number, { dispatch, getState }) => {
// //         await axios.delete(`/api/folders/${folderId}`);

// //         // Get current state to determine how to refresh folders
// //         const state = getState() as RootStore;
// //         const currentPath = state.folders.currentPath;

// //         if (currentPath.length === 0) {
// //             // If at root, fetch root folders
// //             dispatch(fetchRootFoldersByUserId(1));
// //         } else {
// //             // Fetch subfolders of the current parent folder
// //             const parentFolderId = currentPath[currentPath.length - 1].id;
// //             dispatch(fetchFoldersByParentId(parentFolderId));
// //         }

// //         return folderId;
// //     }
// // );
// export const updateFolder = createAsyncThunk(
//     'folders/updateFolder',
//     async (
//         { folderId, updateData }: { folderId: number, updateData: Partial<FolderType> }) => {
//         const response = await axios.patch(`http://localhost:5066/api/Folder/${folderId}`,
//             updateData
//         );
//         return response.data;
//     }
// );
// const folderSlice = createSlice({
//     name: 'folders',
//     initialState,

//     reducers: {
//         updateCurrentPath: (state, action) => {
//             state.currentPath = action.payload;

//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchRootFoldersByUserId.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchRootFoldersByUserId.fulfilled, (state, action) => {
//                 state.folders = action.payload.folders;
//                 state.loading = false;
//             })
//             .addCase(fetchFoldersByParentId.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.folders = action.payload.folders;
//                 state.files = action.payload.files;

//             })
//             .addCase(createFolder.fulfilled, (state, action) => {
//                 state.folders.push(action.payload);
//             })
//             .addCase(softDeleteFolder.fulfilled, (state, action) => {
//                 if (action.payload) {
//                     state.folders = state.folders.filter(folder => folder.id !== action.meta.arg);
//                 } else {
//                     console.error("File deletion failed");
//                 }
//             })
//             // .addCase(renameFolder.fulfilled, (state, action) => {

//             //     const index = state.folders.findIndex(folder => folder.id === action.meta.arg.folderId);
//             //     if (index !== -1) {
//             //       state.folders[index].name = action.payload.name; 
//             //       state.folders[index].updatedAt = action.payload.updatedAt; 
//             //     }
//             //   });
//             .addCase(updateFolder.fulfilled, (state, action) => {
//                 const index = state.folders.findIndex(folder => folder.id === action.meta.arg.folderId);
//                 if (index !== -1) {
//                     state.folders[index].name = action.payload.name;
//                     state.folders[index].updatedAt = action.payload.updatedAt;
//                 }
//             })
//     }
// });

// export const { updateCurrentPath } = folderSlice.actions;
// export default folderSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { FolderType } from '../../models/FolderType';
import { FileType } from '../../models/FileType';
import axiosInstance from '../axiosInstance';
import { setFiles } from './FileSlice';

const API_URL = import.meta.env.VITE_API_URL;

interface FolderContents {
    folders: FolderType[];
    files: FileType[];
}
interface FolderState {
    folders: FolderType[];
    files: FileType[];
    currentPath: FolderType[];
    loading: boolean;
    error: string | null;
}

const initialState: FolderState = {
    folders: [],
    files: [],
    currentPath: [],
    loading: false,
    error: null,
};

export const fetchRootFoldersByUserId = createAsyncThunk<FolderContents, number>(
    'folders/fetchRootFoldersByUserId',
    async (userId: number, { dispatch }) => {
        const response = await axiosInstance.get(`${API_URL}/api/Folder/users/${userId}/root-folders`);
        dispatch(setFiles(response.data.files));
        return response.data;
    }
);

export const fetchFoldersByParentId = createAsyncThunk<FolderContents, number>(
    'folders/fetchFoldersAndFilesByFolderId',
    async (folderId: number) => {
        const response = await axios.get(`${API_URL}/api/Folder/${folderId}/contents`);
        return response.data;
    }
);

export const createFolder = createAsyncThunk<FolderType, Partial<FolderType>>(
    'folders/create',
    async (folderData: Partial<FolderType>) => {
        const response = await axios.post(`${API_URL}/api/Folder`, folderData);
        return response.data;
    }
);

export const softDeleteFolder = createAsyncThunk<boolean, number>(
    'folders/deleteFolder',
    async (id: number) => {
        const response = await axios.delete(`${API_URL}/api/Folder/${id}/recursive`);
        return response.data;
    }
);

export const updateFolder = createAsyncThunk(
    'folders/updateFolder',
    async (
        { folderId, updateData }: { folderId: number, updateData: Partial<FolderType> }) => {
        const response = await axios.patch(`${API_URL}/api/Folder/${folderId}`, updateData);
        return response.data;
    }
);

const folderSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        updateCurrentPath: (state, action) => {
            state.currentPath = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRootFoldersByUserId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRootFoldersByUserId.fulfilled, (state, action) => {
                state.folders = action.payload.folders;
                state.loading = false;
            })
            .addCase(fetchFoldersByParentId.fulfilled, (state, action) => {
                state.loading = false;
                state.folders = action.payload.folders;
                state.files = action.payload.files;
            })
            .addCase(createFolder.fulfilled, (state, action) => {
                state.folders.push(action.payload);
            })
            .addCase(softDeleteFolder.fulfilled, (state, action) => {
                if (action.payload) {
                    state.folders = state.folders.filter(folder => folder.id !== action.meta.arg);
                } else {
                    console.error("File deletion failed");
                }
            })
            .addCase(updateFolder.fulfilled, (state, action) => {
                const index = state.folders.findIndex(folder => folder.id === action.meta.arg.folderId);
                if (index !== -1) {
                    state.folders[index].name = action.payload.name;
                    state.folders[index].updatedAt = action.payload.updatedAt;
                }
            });
    }
});

export const { updateCurrentPath } = folderSlice.actions;
export default folderSlice.reducer;