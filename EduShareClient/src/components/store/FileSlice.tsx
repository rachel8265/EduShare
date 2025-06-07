import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FileType } from '../../models/FileType';

interface FileState {
    userFiles: FileType[],
    sharedFiles: FileType[],
    uploadProgress: number,
    loading: boolean,
    error: string | null;
    fileViewUrl: string;
}
const initialState: FileState = {
    userFiles: [],
    sharedFiles: [],
    uploadProgress: 0,
    loading: false,
    error: null,
    fileViewUrl: '',
}

// export const uploadFile = createAsyncThunk(
//     'files/upload',
//     async (
//         { file, folderId, userId }: {
//             file: File,
//             folderId: number | null,
//             userId: number
//         },
//         { rejectWithValue }) => {
//         try {
//             // קבלת Presigned URL
//             const urlResponse = await axios.get('http://localhost:5066/api/File/presigned-url', {
//                 params: {  s3Key: `${file.name}`, fileType: file.type,  }
//             });

//             const presignedUrl = urlResponse.data.url;

//             // העלאה ישירה ל-S3
//             await axios.put(presignedUrl, file, {
//                 headers: { 'Content-Type': file.type }
//             });

//             const fileMetadata = {
//                 userId: userId,
//                 fileName: file.name,
//                 fileType: file.type,
//                 folderId: folderId,
//                 fileSize: file.size,
//                 FileUrl: `${file.name}` 
//             };

//             const response = await axios.post('http://localhost:5066/api/File', fileMetadata);
//             return response.data;

//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 return rejectWithValue(error.response.data);
//             }
//             return rejectWithValue('An unknown error occurred');
//         }
//     }
// );

// export const fetchFilesByFolder = createAsyncThunk<FileType[], number>(
//     'files/fetchByFolder',
//     async (folderId: number | null) => {
//         const response = await axios.get(`http://localhost:5066/api/File/folder/${folderId}`);
//         return response.data;
//     }
// );

// // פעולה גנרית לעדכון קובץ (כל שדה שתרצה)
// export const updateFile = createAsyncThunk(
//     'files/updateFile',
//     async (
//         { fileId, updateData }: { fileId: number, updateData: Partial<FileType> },
//         { rejectWithValue }
//     ) => {
//         try {
//             console.log(fileId);

//             const response = await axios.patch(`http://localhost:5066/api/File/${fileId}`, updateData)
//             return response.data
//         } catch (error) {
//             if (axios.isAxiosError(error) && error.response) {
//                 return rejectWithValue(error.response.data)
//             }
//             return rejectWithValue("שגיאה בעדכון הקובץ")
//         }
//     }
// )

// // מחיקת קובץ רכה
// export const softDeleteFile = createAsyncThunk(
//     'files/softDelete',
//     async (fileId: number) => {
//         const response = await axios.put(`http://localhost:5066/api/file/${fileId}/softDelete`);
//         return response.data;
//     }
// );

// // פעולה אסינכרונית להבאת קבצים משותפים
// export const fetchSharedFiles = createAsyncThunk("files/fetchShared", async (_, thunkAPI) => {
//   try {
//     const response = await axios.get(`http://localhost:5066/api/File/shared`)
//     return response.data
//   } catch (error) {
//     return thunkAPI.rejectWithValue("שגיאה בטעינת קבצים משותפים")
//   }
// })
// קח את הבסיס מהסביבה
const API_URL = import.meta.env.VITE_API_URL;

export const uploadFile = createAsyncThunk(
    'files/upload',
    async (
        { file, folderId, userId }: {
            file: File,
            folderId: number | null,
            userId: number
        },
        { rejectWithValue }) => {
        try {
            // קבלת Presigned URL
            const urlResponse = await axios.get(`${API_URL}/api/File/presigned-url`, {
                params: { s3Key: `${file.name}`, fileType: file.type }
            });

            const presignedUrl = urlResponse.data.url;

            // העלאה ישירה ל-S3
            await axios.put(presignedUrl, file, {
                headers: { 'Content-Type': file.type }
            });

            const fileMetadata = {
                userId: userId,
                fileName: file.name,
                fileType: file.type,
                folderId: folderId,
                fileSize: file.size,
                FileUrl: `${file.name}`
            };

            const response = await axios.post(`${API_URL}/api/File`, fileMetadata);
            return response.data;

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

export const fetchFilesByFolder = createAsyncThunk<FileType[], number>(
    'files/fetchByFolder',
    async (folderId: number | null) => {
        const response = await axios.get(`${API_URL}/api/File/folder/${folderId}`);
        return response.data;
    }
);

// פעולה גנרית לעדכון קובץ (כל שדה שתרצה)
export const updateFile = createAsyncThunk(
    'files/updateFile',
    async (
        { fileId, updateData }: { fileId: number, updateData: Partial<FileType> },
        { rejectWithValue }
    ) => {
        try {
            // console.log(fileId);
            const response = await axios.patch(`${API_URL}/api/File/${fileId}`, updateData)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data)
            }
            return rejectWithValue("שגיאה בעדכון הקובץ")
        }
    }
)

// מחיקת קובץ רכה
export const softDeleteFile = createAsyncThunk(
    'files/softDelete',
    async (fileId: number) => {
        const response = await axios.put(`${API_URL}/api/file/${fileId}/softDelete`);
        return response.data;
    }
);

// פעולה אסינכרונית להבאת קבצים משותפים
export const fetchSharedFiles = createAsyncThunk("files/fetchShared", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/api/File/shared`)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue("שגיאה בטעינת קבצים משותפים")
    }
})
export const getFileViewUrl = createAsyncThunk(
    'files/getFileViewUrl',
    async (fileUrl: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/File/download/${fileUrl}`);
            const viewUrl = response.data.url ?? response.data.Url ?? response.data;
            return viewUrl;
        } catch (error) {
            return rejectWithValue('Error loading file. The URL may have expired.');
        }
    }
);

// (אפשר לוותר על fetchSharedFiles אם אין לך endpoint כזה)
// export const fetchSharedFiles = createAsyncThunk(...)

const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload;
        },
        setFiles(state, action: PayloadAction<any[]>) {
            state.userFiles = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.loading = true;
                state.uploadProgress = 0;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.userFiles.push(action.payload);
                state.loading = false;
                state.uploadProgress = 100;
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchFilesByFolder.fulfilled, (state, action) => {
                state.userFiles = action.payload;
            })
            .addCase(softDeleteFile.fulfilled, (state, action) => {
                if (action.payload) {
                    state.userFiles = state.userFiles.filter(file => file.id !== action.meta.arg);
                } else {
                    console.error("File deletion failed");
                }
            })
            .addCase(updateFile.fulfilled, (state, action) => {
                const updatedFile = action.payload;
                // console.log(action.payload);


                const idx = state.userFiles.findIndex(f => f.id === updatedFile.id);
                if (idx !== -1) {
                    state.userFiles[idx] = updatedFile;
                }
            })




            .addCase(fetchSharedFiles.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSharedFiles.fulfilled, (state, action) => {
                state.loading = false
                state.sharedFiles = action.payload
            })
            .addCase(fetchSharedFiles.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            }).addCase(getFileViewUrl.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFileViewUrl.fulfilled, (state, action) => {
                state.loading = false;
                state.fileViewUrl = action.payload;
            })
            .addCase(getFileViewUrl.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

    }
});

export const { setUploadProgress, setFiles } = fileSlice.actions;
export default fileSlice.reducer;