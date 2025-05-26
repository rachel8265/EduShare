// "use client"
// import {
//   InsertDriveFile as FileIcon,
//   PictureAsPdf as PdfIcon,
//   Image as ImageIcon,
//   Description as DocIcon,
//   TableChart as SpreadsheetIcon,
// } from "@mui/icons-material"

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
//   if (!dateString) return "—"

//   try {
//     const date = new Date(dateString)

//     // Check if date is valid
//     if (isNaN(date.getTime())) {
//       return "—"
//     }

//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   } catch (error) {
//     console.error("Error formatting date:", error)
//     return "—"
//   }
// }

// export const formatFileSize = (bytes: number) => {
//   if (!bytes) return "—"
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
"use client"
import {
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Description as DocIcon,
  TableChart as SpreadsheetIcon,
  Slideshow as PresentationIcon,
} from "@mui/icons-material"

export const getFileTypeIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()
  switch (extension) {
    case "pdf":
      return <PdfIcon sx={{ color: "#e53935" }} />
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <ImageIcon sx={{ color: "#43a047" }} />
    case "doc":
    case "docx":
      return <DocIcon sx={{ color: "#1e88e5" }} />
    case "xls":
    case "xlsx":
      return <SpreadsheetIcon sx={{ color: "#7cb342" }} />
    case "ppt":
    case "pptx":
      return <PresentationIcon sx={{ color: "#fb8c00" }} />
    default:
      return <FileIcon sx={{ color: "#757575" }} />
  }
}

// export const formatDate = (dateString: string) => {
  
//   // console.log("dateString", dateString);
  
//   if (!dateString) return "—"

//   try {
//     const date = new Date(dateString)

//     // Check if date is valid
//     if (isNaN(date.getTime())) {
//       return "—"
//     }

//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   } catch (error) {
//     console.error("Error formatting date:", error)
//     return "—"
//   }
// }
export const formatDate = (dateString: string): string => {
  if (!dateString) return "Unknown"

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch (error) {
    return "Unknown"
  }
}

// export const formatFileSize = (bytes: number) => {
//   if (!bytes) return "—"
//   if (bytes < 1024 * 1024) {
//     return (bytes / 1024).toFixed(1) + " KB"
//   } else {
//     return (bytes / (1024 * 1024)).toFixed(1) + " MB"
//   }
// }
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
export const getFileTypeLabel = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()
  switch (extension) {
    case "pdf":
      return "PDF"
    case "doc":
    case "docx":
      return "Document"
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "Image"
    case "xls":
    case "xlsx":
      return "Spreadsheet"
    case "ppt":
    case "pptx":
      return "Presentation"
    default:
      return extension?.toUpperCase() || "File"
  }
}

export const getIconColor = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase()
  switch (extension) {
    case "pdf":
      return "#e53935" // Red
    case "doc":
    case "docx":
      return "#1e88e5" // Blue
    case "jpg":
    case "jpeg":
    case "png":
      return "#43a047" // Green
    case "xls":
    case "xlsx":
      return "#7cb342" // Light Green
    case "ppt":
    case "pptx":
      return "#fb8c00" // Orange
    default:
      return "#757575" // Grey
  }
}

export const validateFile = (file: File): { valid: boolean; errorMessage?: string } => {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ]

  if (file.size > maxSize) {
    return {
      valid: false,
      errorMessage: "File is too large. Maximum size is 10MB",
    }
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      errorMessage: "Unsupported file type",
    }
  }

  return { valid: true }
}

// // Helper function to download a file
// export const downloadFile = (url: string, fileName: string) => {
//   // Create a temporary anchor element
//   const anchor = document.createElement("a")
//   anchor.href = url
//   anchor.download = fileName

//   // Append to the body
//   document.body.appendChild(anchor)

//   // Trigger click event
//   anchor.click()

//   // Clean up
//   document.body.removeChild(anchor)
// }
