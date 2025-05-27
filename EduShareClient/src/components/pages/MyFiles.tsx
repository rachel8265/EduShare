"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Divider,
  useTheme,
  alpha,
} from "@mui/material"
import {
  CloudUpload as CloudUploadIcon,
  CreateNewFolder as CreateNewFolderIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { fetchFoldersByParentId, fetchRootFoldersByUserId, updateCurrentPath } from "../store/FolderSlice"
import { fetchFilesByFolder, updateFile } from "../store/FileSlice"
import type { FolderType } from "../../models/FolderType"
import type { FileType } from "../../models/FileType"
import type { AppDispatch, RootStore } from "../store/Store"
import FileTable from "../fileManager/FileTable"
import FileUploadDialog from "../fileManager/fileUploade/FileUploadDialog"
import CreateFolderDialog from "../fileManager/CreateFolderDialog"
import FileActionMenu from "../fileManager/FileActionMenu"
import FolderActionMenu from "../fileManager/FolderActionMenu"
import RenameFileDialog from "../fileManager/RenameFileDialog"
import RenameFolderDialog from "../fileManager/RenameFolderDialog"
import FileViewer from "../fileManager/FileViewer"
// import FileViewer from "../new/FileViewer"
// import FileViewer from "../fileManager/FileViewer"

const FileManagerPage = () => {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const { folders, currentPath } = useSelector((state: RootStore) => state.folders)
  const { userFiles } = useSelector((state: RootStore) => state.files)
  const user = useSelector((state: RootStore) => state.user)

  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // File menu state
  const [fileAnchorEl, setFileAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
  const [isRenameFileDialogOpen, setIsRenameFileDialogOpen] = useState(false)

  // Folder menu state
  const [folderAnchorEl, setFolderAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null)
  const [isRenameFolderDialogOpen, setIsRenameFolderDialogOpen] = useState(false)

  const [viewerOpen, setViewerOpen] = useState(false)
  const [fileToView, setFileToView] = useState<FileType | null>(null)

  const currentFolderId = currentPath.length > 0 ? currentPath[currentPath.length - 1].id : null

  useEffect(() => {
    if (currentPath.length === 0) {
      
      console.log(user.user.id);
      
      dispatch(fetchRootFoldersByUserId(user.user.id))
    } else if (currentFolderId) {
      dispatch(fetchFoldersByParentId(currentFolderId))
      dispatch(fetchFilesByFolder(currentFolderId))
    }
  }, [dispatch, currentPath, currentFolderId])

  // Clean up menu elements
  useEffect(() => {
    return () => {
      setFileAnchorEl(null)
      setSelectedFile(null)
      setFolderAnchorEl(null)
      setSelectedFolder(null)
    }
  }, [])

  // Clear menus when path changes
  useEffect(() => {
    setFileAnchorEl(null)
    setSelectedFile(null)
    setFolderAnchorEl(null)
    setSelectedFolder(null)
  }, [currentPath])

  const handleFolderClick = (folder: FolderType) => {
    const newPath = [...currentPath, folder]
    dispatch(updateCurrentPath(newPath))
  }

  const handleFileClick = (file: FileType) => {
    setFileToView(file)
    setViewerOpen(true)
  }

  // File menu handlers
  const handleFileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, file: FileType) => {
    event.stopPropagation()
    if (event.currentTarget && document.body.contains(event.currentTarget)) {
      setFileAnchorEl(event.currentTarget)
      setSelectedFile(file)
    }
  }

  const handleFileMenuClose = () => {
    setFileAnchorEl(null)
    setSelectedFile(null)
  }

  const handleRenameFileClick = () => {
    setIsRenameFileDialogOpen(true)
    setFileAnchorEl(null) // Close menu before opening dialog
  }

  const handleViewClick = () => {
    setFileToView(selectedFile)
    setViewerOpen(true)
    handleFileMenuClose()
  }

  // Folder menu handlers
  const handleFolderMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, folder: FolderType) => {
    event.stopPropagation()
    if (event.currentTarget && document.body.contains(event.currentTarget)) {
      setFolderAnchorEl(event.currentTarget)
      setSelectedFolder(folder)
    }
  }

  const handleFolderMenuClose = () => {
    setFolderAnchorEl(null)
    setSelectedFolder(null)
  }

  const handleRenameFolderClick = () => {
    setIsRenameFolderDialogOpen(true)
    setFolderAnchorEl(null) // Close menu before opening dialog
  }

  const handleDeleteFolderClick = () => {
    if (
      selectedFolder &&
      window.confirm("Are you sure you want to delete this folder? All files and folders inside will also be deleted.")
    ) {
      // dispatch(softDeleteFolder(selectedFolder.id));
    }
    handleFolderMenuClose()
  }

  const handleNavigateToFolder = (index: number) => {
    // Navigate to a specific folder in the breadcrumb
    const newPath = currentPath.slice(0, index + 1)
    dispatch(updateCurrentPath(newPath))
  }

const handleShareToggle = async (fileId:  number, isShared: boolean,topicId:number) => {
    try {
      
      // await dispatch(updateFileShareStatus({ fileId, isShared }));
      dispatch(updateFile({ fileId, updateData: { isPublic: isShared,topicId } }));
    } catch (error) {
      // אפשר להציג הודעה למשתמש
      console.error("Error updating file share status:", error);
    }
  };


  return (
    <Box
      sx={{
        py: 6,
        background: "linear-gradient(to bottom, #f0fdfa, #ffffff)",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.1),
            overflow: "hidden",
            mb: 4,
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 1,
                background: "linear-gradient(to right, #115e59, #0d9488, #065f46)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              My Teaching Materials
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage, organize and share your educational resources
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 8 }} >
              <Box sx={{ position: "relative" }}>
                <Box
                  component="input"
                  placeholder="Search files and folders..."
                  sx={{
                    width: "100%",
                    p: 2,
                    pl: 4,
                    borderRadius: 50,
                    border: "1px solid",
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                    outline: "none",
                    fontSize: "1rem",
                    "&:focus": {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
                    },
                  }}
                />
                <SearchIcon
                  sx={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "text.secondary",
                  }}
                />
              </Box>
            </Grid>
            <Grid size={{xs: 12, md: 4}} >
              <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => setIsUploadDialogOpen(true)}
                  sx={{
                    borderRadius: 50,
                    px: 3,
                    background: "linear-gradient(to right, #0d9488, #10b981)",
                    "&:hover": {
                      background: "linear-gradient(to right, #0f766e, #047857)",
                    },
                    boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)",
                  }}
                >
                  Upload
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CreateNewFolderIcon />}
                  onClick={() => setIsCreateFolderDialogOpen(true)}
                  sx={{
                    borderRadius: 50,
                    px: 3,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    "&:hover": {
                      borderColor: theme.palette.primary.dark,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  New Folder
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Breadcrumbs
            separator={<ChevronRightIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />}
            aria-label="breadcrumb"
            sx={{
              mb: 3,
              "& .MuiBreadcrumbs-ol": {
                alignItems: "center",
              },
            }}
          >
            <Link
              underline="hover"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontWeight: currentPath.length === 0 ? 600 : 400,
                color: currentPath.length === 0 ? theme.palette.primary.main : "inherit",
              }}
              onClick={() => dispatch(updateCurrentPath([]))}
            >
              My Files
            </Link>

            {/* Optional intermediate paths */}
            {currentPath.length > 2 && (
              <Box>
                <Link
                  underline="hover"
                  color="inherit"
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleNavigateToFolder(0)}
                >
                  {currentPath[0].name}
                </Link>
                <span>...</span>
              </Box>
            )}

            {/* Last two path segments */}
            {currentPath.slice(-2).map((folder, index, array) => {
              const actualIndex = currentPath.length - array.length + index
              const isLast = index === array.length - 1
              return (
                <Link
                  key={folder.id}
                  underline="hover"
                  color={isLast ? "primary" : "inherit"}
                  onClick={() => handleNavigateToFolder(actualIndex)}
                  sx={{
                    cursor: "pointer",
                    fontWeight: isLast ? 600 : 400,
                  }}
                >
                  {folder.name}
                </Link>
              )
            })}
          </Breadcrumbs>

          <Divider sx={{ mb: 3 }} />

          <FileTable
            folders={folders}
            files={userFiles}
            handleFolderClick={handleFolderClick}
            handleFileClick={handleFileClick}
            handleMenuOpen={handleFileMenuOpen}
            handleFolderMenuOpen={handleFolderMenuOpen}
            handleShareToggle={handleShareToggle}
          />
        </Paper>
      </Container>

      <CreateFolderDialog
        open={isCreateFolderDialogOpen}
        onClose={() => setIsCreateFolderDialogOpen(false)}
        currentFolderId={currentFolderId}
      />

      <FileUploadDialog
        open={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        currentFolderId={currentFolderId}
      />

      {/* File Action Menu */}
      {fileAnchorEl && document.body.contains(fileAnchorEl) && (
        <FileActionMenu
          anchorEl={fileAnchorEl}
          selectedFile={selectedFile}
          onClose={handleFileMenuClose}
          onRenameClick={handleRenameFileClick}
          onViewClick={handleViewClick}
        />
      )}

      {/* Folder Action Menu */}
      {folderAnchorEl && document.body.contains(folderAnchorEl) && (
        <FolderActionMenu
          anchorEl={folderAnchorEl}
          selectedFolder={selectedFolder}
          onClose={handleFolderMenuClose}
          onRenameClick={handleRenameFolderClick}
          onDeleteClick={handleDeleteFolderClick}
        />
      )}

      <RenameFileDialog
        open={isRenameFileDialogOpen}
        onClose={() => setIsRenameFileDialogOpen(false)}
        selectedFile={selectedFile}
      />

      <RenameFolderDialog
        open={isRenameFolderDialogOpen}
        onClose={() => setIsRenameFolderDialogOpen(false)}
        selectedFolder={selectedFolder}
      />

      {fileToView && <FileViewer open={viewerOpen} onClose={() => setViewerOpen(false)} file={fileToView} />}
    </Box>
  )
}

export default FileManagerPage

