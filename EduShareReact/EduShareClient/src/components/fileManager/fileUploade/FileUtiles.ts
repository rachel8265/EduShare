// /**
//  * שירותים ופונקציות עזר לטיפול בקבצים
//  */

// /**
//  * מחזיר את סוג הקובץ על פי שם הקובץ
//  * @param fileName שם הקובץ
//  * @returns סוג הקובץ בעברית
//  */
// export const getFileType = (fileName: string): string => {
//     const extension = fileName.split('.').pop()?.toLowerCase();
//     switch (extension) {
//       case 'pdf':
//         return 'PDF';
//       case 'docx':
//         return 'DOCX';
//       case 'jpg':
//       case 'jpeg':
//       case 'png':
//         return 'תמונה';
//       default:
//         return 'קובץ';
//     }
//   };
  
//   /**
//    * מחזיר קוד צבע עבור אייקון בהתאם לסוג הקובץ
//    * @param fileName שם הקובץ
//    * @returns קוד צבע hex
//    */
//   export const getIconColor = (fileName: string): string => {
//     const extension = fileName.split('.').pop()?.toLowerCase();
//     switch (extension) {
//       case 'pdf':
//         return '#f44336'; // אדום
//       case 'docx':
//         return '#2196f3'; // כחול
//       case 'jpg':
//       case 'jpeg':
//       case 'png':
//         return '#4caf50'; // ירוק
//       default:
//         return '#9e9e9e'; // אפור
//     }
//   };
  
//   /**
//    * בודק אם הקובץ תקין להעלאה
//    * @param file קובץ לבדיקה
//    * @returns אובייקט עם תוצאות הבדיקה
//    */
//   export const validateFile = (file: File): { valid: boolean; errorMessage?: string } => {
//     const maxSize = 10 * 1024 * 1024; // 10MB
//     const allowedTypes = [
//       'application/pdf', 
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
//       'image/jpeg', 
//       'image/png'
//     ];
  
//     if (file.size > maxSize) {
//       return { 
//         valid: false, 
//         errorMessage: 'הקובץ גדול מדי. הגודל המרבי הוא 10MB' 
//       };
//     }
  
//     if (!allowedTypes.includes(file.type)) {
//       return { 
//         valid: false, 
//         errorMessage: 'סוג קובץ לא נתמך'
//       };
//     }
  
//     return { valid: true };
//   };

"use client"
import {
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Description as DocIcon,
  TableChart as SpreadsheetIcon,
} from "@mui/icons-material"

// export const getFileTypeIcon = (fileName: string) => {
//   const extension = fileName.split(".").pop()?.toLowerCase()
//   switch (extension) {
//     case "pdf":
//       return <PdfIcon sx={{ color: "#f44336" }} />
//     case "jpg":
//     case "jpeg":
//     case "png":
//     case "gif":
//       return <ImageIcon sx={{ color: "#4caf50" }} />
//     case "doc":
//     case "docx":
//       return <DocIcon sx={{ color: "#2196f3" }} />
//     case "xls":
//     case "xlsx":
//     case "ppt":
//     case "pptx":
//       return <SpreadsheetIcon sx={{ color: "#9c27b0" }} />
//     default:
//       return <FileIcon sx={{ color: "#9e9e9e" }} />
//   }
// }

// export const formatDate = (dateString: string) => {
//   if (!dateString) return ""
//   const date = new Date(dateString)
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   })
// }

// export const formatFileSize = (bytes: number) => {
//   if (!bytes) return ""
//   if (bytes < 1024 * 1024) {
//     return (bytes / 1024).toFixed(1) + " KB"
//   } else {
//     return (bytes / (1024 * 1024)).toFixed(1) + " MB"
//   }
// }

// export const getFileType = (fileName: string): string => {
//   const extension = fileName.split(".").pop()?.toLowerCase()
//   switch (extension) {
//     case "pdf":
//       return "PDF"
//     case "docx":
//       return "DOCX"
//     case "jpg":
//     case "jpeg":
//     case "png":
//       return "Image"
//     default:
//       return "File"
//   }
// }

// export const getIconColor = (fileName: string): string => {
//   const extension = fileName.split(".").pop()?.toLowerCase()
//   switch (extension) {
//     case "pdf":
//       return "#f44336" // Red
//     case "docx":
//       return "#2196f3" // Blue
//     case "jpg":
//     case "jpeg":
//     case "png":
//       return "#4caf50" // Green
//     default:
//       return "#9e9e9e" // Grey
//   }
// }

// export const validateFile = (file: File): { valid: boolean; errorMessage?: string } => {
//   const maxSize = 10 * 1024 * 1024 // 10MB
//   const allowedTypes = [
//     "application/pdf",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     "image/jpeg",
//     "image/png",
//   ]

//   if (file.size > maxSize) {
//     return {
//       valid: false,
//       errorMessage: "File is too large. Maximum size is 10MB",
//     }
//   }

//   if (!allowedTypes.includes(file.type)) {
//     return {
//       valid: false,
//       errorMessage: "Unsupported file type",
//     }
//   }

//   return { valid: true }
// }
