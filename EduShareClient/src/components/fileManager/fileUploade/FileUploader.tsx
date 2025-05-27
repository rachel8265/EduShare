"use client"
import type React from "react"
import { useState } from "react"
import { Box, Button, Snackbar, Alert, useTheme, alpha } from "@mui/material"
import { useDispatch } from "react-redux"
// import { uploadFile } from "../store/FileSlice"
// import type { AppDispatch } from "../store/Store"
// import { validateFile } from "./FileUtils"
import FilePreview from "./FilePreview"
import UploadProgress from "./UploadProgress"
import UploadArea from "./UploadArea"
import { AppDispatch } from "../../store/Store"
import { uploadFile } from "../../store/FileSlice"
import { validateFile } from "../FileUtils"

interface FileUploaderProps {
  folderId: number | null
  userId: number
}

const FileUploader: React.FC<FileUploaderProps> = ({ folderId, userId }) => {

  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const processFile = (selectedFile: File) => {
    const validation = validateFile(selectedFile)

    if (!validation.valid) {
      setErrorMessage(validation.errorMessage || "Error selecting file")
      setUploadStatus("error")
      return
    }

    setFile(selectedFile)
    setUploadStatus("idle")
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      processFile(selectedFile)
    }
  }

  const handleFileDropped = (droppedFile: File) => {
    processFile(droppedFile)
  }

  const handleClearFile = () => {
    setFile(null)
    setUploadProgress(0)
    setUploadStatus("idle")
  }
 const handleUpload = async () => {
    if (!file) return

    try {
      setUploadStatus("uploading")
      setUploadProgress(0)

      // סימולציה להתקדמות
      const uploadPromise = new Promise<void>((resolve) => {
        let progress = 0
        const interval = setInterval(() => {
          progress += 20
          setUploadProgress(progress)
          if (progress >= 100) {
            clearInterval(interval)
            resolve()
          }
        }, 200)
      })

      await uploadPromise

      const resultAction = await dispatch(
        uploadFile({
          file,
          folderId,
          userId,
        })
      );

      if (uploadFile.fulfilled.match(resultAction)) {
        setUploadStatus("success");
        setFile(null);
      } else {
        let errorMsg = "Error uploading file";
        if (resultAction.payload) {
          errorMsg = typeof resultAction.payload === "string" ? resultAction.payload : JSON.stringify(resultAction.payload);
        }
        setUploadStatus("error");
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      setUploadStatus("error");
      setErrorMessage("Error uploading file");
    }
  }
 
      const handleCloseSnackbar = () => {
        setUploadStatus("idle")
        setErrorMessage("")
      }

      return (
        <Box sx={{ p: 2 }}>
          {!file ? (
            <UploadArea onFileSelect={handleFileSelect} onFileDropped={handleFileDropped} />
          ) : (
            <Box sx={{ width: "100%" }}>
              <FilePreview file={file} onClearFile={handleClearFile} />

              {uploadStatus === "uploading" && <UploadProgress progress={uploadProgress} />}

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={uploadStatus === "uploading"}
                  sx={{
                    minWidth: 180,
                    py: 1.5,
                    px: 4,
                    borderRadius: 50,
                    background: "linear-gradient(to right, #0d9488, #10b981)",
                    "&:hover": {
                      background: "linear-gradient(to right, #0f766e, #047857)",
                    },
                    "&.Mui-disabled": {
                      background: alpha(theme.palette.primary.main, 0.3),
                      color: "white",
                    },
                    boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
                  }}
                >
                  {uploadStatus === "uploading" ? "Uploading..." : "Upload File"}
                </Button>
              </Box>
            </Box>
          )}

          <Snackbar
            open={uploadStatus === "success" || uploadStatus === "error"}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={uploadStatus === "success" ? "success" : "error"}
              variant="filled"
              sx={{ width: "100%", boxShadow: 3 }}
            >
              {uploadStatus === "success" ? "File uploaded successfully" : errorMessage}
            </Alert>
          </Snackbar>
        </Box>
      )
    }

  export default FileUploader
