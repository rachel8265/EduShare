// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { FileType } from '../../models/FileType';

// interface FileState {
//     userFiles: FileType[],
//     sharedFiles:  FileType[],
//     uploadProgress: number,
//     loading: boolean,
//     error: string | null;
// }
// const initialState: FileState = {
//     userFiles: [],
//     sharedFiles: [],
//     uploadProgress: 0,
//     loading: false,
//     error: null
// }
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
//                 params: { userId,
//                     fileName: file.name,
//                     fileType: file.type,
//                     folderId,
//                     fileSize: file.size
                   

//                 }
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
//                 FileUrl: presignedUrl // ה-URL שהוחזר מהשרת
//             };
//             // שמירת פרטי הקובץ בשרת
//             // const fileMetadata = await axios.post('http://localhost:5066/api/file', {
//                 // name: file.name,
//                 // url: presignedUrl, // URL שהוחזר מהשרת
//                 // folderId,
//                 // userId,
//                 // fileSize: file.size
               
//             // });
//             try {
//                 const response = await axios.post('http://localhost:5066/api/File', fileMetadata);
//                 console.log('File uploaded successfully:', response.data);
//             return response.data;

//             } catch (error) {
//                 console.error('Error uploading file:', error);
//             }
//         } catch (error) {
//             console.log(error,"fileSlice1");
            
//             if (axios.isAxiosError(error) && error.response) {
//                 console.log(error,"fileSlice2");

//                 return rejectWithValue(error.response.data);
//             }
//             return rejectWithValue('An unknown error occurred');
//         }
//     }
// );

// export const fetchFilesByFolder = createAsyncThunk<FileType[], number>(
    
//     'files/fetchByFolder',
//     async (folderId: number | null) => {
//         const response = await axios.get(`http://localhost:5066/api/file/folder/${folderId}`);
        
//         return response.data;
//     }
// );
// // // פעולה אסינכרונית להבאת קבצים משותפים
// export const fetchSharedFiles = createAsyncThunk("files/fetchShared", async (_, thunkAPI) => {
//   try {
//     const response = await axios.get(`http://localhost:5066/api/files/shared`)
//     return response.data
//   } catch (error) {
//     return thunkAPI.rejectWithValue("שגיאה בטעינת קבצים משותפים")
//   }
// })

// // // פעולה אסינכרונית לעדכון קובץ (כולל שיתוף)
// // export const updateFile = createAsyncThunk(
// //   "files/update",
// //   async (fileData: { id: string; isSharedWithForum?: boolean }, thunkAPI) => {
// //     try {
// //       const response = await axios.put(`http://localhost:5066/api/files/${fileData.id}`, fileData)
// //       return response.data
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue("שגיאה בעדכון הקובץ")
// //     }
// //   },
// // )

// // export const shareFileWithForum = 
// // createAsyncThunk("file/shareWithForum", async (fileId: number, thunkAPI) => {
// //   try {
// //     // משתמש בפונקציית העדכון הקיימת עם הפרמטר isSharedWithForum=true
// //     const response = await axios.put(`http://localhost:5066/api/files/${fileId}`, {
// //       id: fileId,
// //       isSharedWithForum: true,
// //     })
// //     return response.data
// //   } catch (error) {
// //     return thunkAPI.rejectWithValue("שגיאה בשיתוף הקובץ")
// //   }
// // })

// // // פעולה אסינכרונית לביטול שיתוף קובץ עם הפורום
// // export const unshareFileWithForum = createAsyncThunk("files/unshareWithForum", async (fileId: number, thunkAPI) => {
// //   try {
// //     // משתמש בפונקציית העדכון הקיימת עם הפרמטר isSharedWithForum=false
// //     const response = await axios.put(`http://localhost:5066/api/files/${fileId}`, {
// //       id: fileId,
// //       isSharedWithForum: false,
// //     })
// //     return response.data
// //   } catch (error) {
// //     return thunkAPI.rejectWithValue("שגיאה בביטול שיתוף הקובץ")
// //   }
// // })

// export const renameFile = createAsyncThunk(
//     'files/renameFile',
//     async ({ fileId, newName }: { fileId: number, newName: string }) => {
//         const response = await axios.put(`http://localhost:5066/api/file/${fileId}/rename`, 
//             JSON.stringify(newName), // Stringify the string
//             {
//                 headers: {
//                     'Content-Type': 'application/json' // Change content type to JSON
//                 }
//             }
//         );
//         return response.data;
//     }
// );

// export const softDeleteFile = createAsyncThunk(
//     'files/softDelete',  
//     async (fileId: number) => {
//        const response= await axios.put(`http://localhost:5066/api/file/${fileId}/softDelete`);
//         return response.data;
//     }
// );

// export const updateFileShareStatus = createAsyncThunk(
//   'files/updateFileShareStatus',
//   async ({ fileId, isShared }: { fileId: string | number, isShared: boolean }) => {
//     // קריאה ל-API לשינוי הסטטוס
//     const response = await axios.put(`http://localhost:5066/api/file/${fileId}/updateFileShareStatus`,{ isPublic: isShared })
//     return response.data;
//   }
// );
// // export const fetchFilesByFolderId= createAsyncThunk(
// //     'files/fetchFilesByFolderId',
// //     async ( FolderId :   number ) => {
// //         const response = await axios.get(`/api/file/user/folder/${FolderId}`);
// //         return response.data;
// //     }
// // );


// const fileSlice = createSlice({
//     name: 'files',
//     initialState,
//     reducers: {
//         setUploadProgress: (state, action) => {
//             state.uploadProgress = action.payload;
//         }, setFiles(state, action: PayloadAction<any[]>) {
            
//             state.userFiles = action.payload;
            
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(uploadFile.pending, (state) => {
//                 state.loading = true;
//                 state.uploadProgress = 0;
//             })
//             .addCase(uploadFile.fulfilled, (state, action) => {
                
//                 state.userFiles.push(action.payload);
//                 console.log("seccesful");
                
//                 state.loading = false;
//                 state.uploadProgress = 100;
//             })
//             .addCase(uploadFile.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             .addCase(fetchFilesByFolder.fulfilled, (state, action) => {
//                 state.userFiles = action.payload;
//             }).addCase(softDeleteFile.fulfilled, (state, action) => {
//                 if (action.payload) {
//                     // אם המחיקה הצליחה, מסנן את הקובץ מהרשימה
//                     state.userFiles = state.userFiles.filter(file => file.id !== action.meta.arg); // משתמש ב-fileId
//                 } else {
//                     // טיפול במקרה שהמחיקה לא הצליחה
//                     console.error("File deletion failed");
//                 }
//             }) .addCase(renameFile.fulfilled, (state, action) => {
//                 console.log(action.payload);
                
//                 const newName = action.payload.fileName; 
//                 const updatedAt=action.payload.updatedAt; 
//                 const index = state.userFiles.findIndex(file => file.id === action.meta.arg.fileId);
                

//                 if (index !== -1) {
//                     state.userFiles[index].fileName = newName; // עדכון הקובץ ברשימה
//                     state.userFiles[index].updatedAt=updatedAt
//                 }

//             }).addCase(fetchSharedFiles.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//     //   .addCase(fetchSharedFiles.fulfilled, (state, action) => {
//     //     state.loading = false
//     //     state.sharedFiles = action.payload
//     //   })
//     //   .addCase(fetchSharedFiles.rejected, (state, action) => {
//     //     state.loading = false
//     //     state.error = action.payload as string
//     //   }).addCase(unshareFileWithForum.fulfilled, (state, action) => {
//     //     const updatedFile = action.payload

//     //     // עדכון הקובץ ברשימת הקבצים של המשתמש
//     //     state.userFiles = state.userFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file))

//     //     // הסר את הקובץ מרשימת הקבצים המשותפים
//     //     state.sharedFiles = state.sharedFiles.filter((f) => f.id !== updatedFile.id)
//     //   })
//       .addCase(updateFileShareStatus.fulfilled, (state, action) => {
//     // נניח שהשרת מחזיר את הקובץ המעודכן
//     const updatedFile = action.payload;
//     const idx = state.userFiles.findIndex(f => f.id === updatedFile.id);
//     if (idx !== -1) {
//       state.userFiles[idx] = updatedFile;
//     }
//   });


//     }
// });

// export const { setUploadProgress ,setFiles} = fileSlice.actions;
// export default fileSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FileType } from '../../models/FileType';

interface FileState {
    userFiles: FileType[],
    sharedFiles: FileType[],
    uploadProgress: number,
    loading: boolean,
    error: string | null;
}
const initialState: FileState = {
    userFiles: [],
    sharedFiles: [],
    uploadProgress: 0,
    loading: false,
    error: null
}

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
            const urlResponse = await axios.get('http://localhost:5066/api/File/presigned-url', {
                params: {  s3Key: `${file.name}`, fileType: file.type,  }
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

            const response = await axios.post('http://localhost:5066/api/File', fileMetadata);
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
        const response = await axios.get(`http://localhost:5066/api/File/folder/${folderId}`);
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
            console.log(fileId);
            
            const response = await axios.patch(`http://localhost:5066/api/File/${fileId}`, updateData)
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
        const response = await axios.put(`http://localhost:5066/api/file/${fileId}/softDelete`);
        return response.data;
    }
);

// פעולה אסינכרונית להבאת קבצים משותפים
export const fetchSharedFiles = createAsyncThunk("files/fetchShared", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:5066/api/File/shared`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue("שגיאה בטעינת קבצים משותפים")
  }
})

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
                console.log(action.payload);
                
                debugger;
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
      })
    }
});

export const { setUploadProgress, setFiles } = fileSlice.actions;
export default fileSlice.reducer;