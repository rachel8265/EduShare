// "use client"

// import type React from "react"

// import { useState, useEffect, useCallback } from "react"
// import { Box, TextField, InputAdornment, IconButton, Typography, Chip, useTheme, alpha } from "@mui/material"
// import { Search as SearchIcon, Close as CloseIcon, FilterList as FilterIcon } from "@mui/icons-material"
// import type { FileType } from "../../models/FileType"
// import type { FolderType } from "../../models/FolderType"
// // import debounce from 'lodash/debounce'
// // import { debounce } from "lodash"
// import debounce from 'lodash/debounce';


// interface FileSearchProps {
//   files: FileType[]
//   folders: FolderType[]
//   onSearchResults: (filteredFiles: FileType[], filteredFolders: FolderType[]) => void
//   onClearSearch: () => void
// }

// const FileSearch: React.FC<FileSearchProps> = ({ files, folders, onSearchResults, onClearSearch }) => {
//   const theme = useTheme()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [searchActive, setSearchActive] = useState(false)
//   const [searchFilters, setSearchFilters] = useState<{
//     fileTypes: string[]
//     dateRange: { from: Date | null; to: Date | null } | null
//   }>({
//     fileTypes: [],
//     dateRange: null,
//   })

//   // Create a debounced search function to avoid excessive filtering
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const debouncedSearch = useCallback(
//     debounce((term: string, filters: typeof searchFilters) => {
//       if (!term.trim() && filters.fileTypes.length === 0 && !filters.dateRange) {
//         setSearchActive(false)
//         onClearSearch()
//         return
//       }

//       setSearchActive(true)
//       const results = performSearch(term, files, folders, filters)
//       onSearchResults(results.filteredFiles, results.filteredFolders)
//     }, 300),
//     [files, folders, onSearchResults, onClearSearch],
//   )

//   useEffect(() => {
//     debouncedSearch(searchTerm, searchFilters)
//     return () => 
//         debouncedSearch.cancel()
//   }, [searchTerm, searchFilters, debouncedSearch])

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value)
//   }

//   const handleClearSearch = () => {
//     setSearchTerm("")
//     setSearchFilters({
//       fileTypes: [],
//       dateRange: null,
//     })
//     setSearchActive(false)
//     onClearSearch()
//   }

//   const handleAddFileTypeFilter = (fileType: string) => {
//     if (!searchFilters.fileTypes.includes(fileType)) {
//       setSearchFilters({
//         ...searchFilters,
//         fileTypes: [...searchFilters.fileTypes, fileType],
//       })
//     }
//   }

//   const handleRemoveFileTypeFilter = (fileType: string) => {
//     setSearchFilters({
//       ...searchFilters,
//       fileTypes: searchFilters.fileTypes.filter((type) => type !== fileType),
//     })
//   }

//   return (
//     <Box sx={{ mb: 3 }}>
//       <TextField
//         fullWidth
//         placeholder="Search files and folders..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         variant="outlined"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon color="action" />
//             </InputAdornment>
//           ),
//           endAdornment: searchTerm && (
//             <InputAdornment position="end">
//               <IconButton size="small" onClick={handleClearSearch} edge="end">
//                 <CloseIcon fontSize="small" />
//               </IconButton>
//             </InputAdornment>
//           ),
//           sx: {
//             borderRadius: 50,
//             bgcolor: "background.paper",
//             pr: 1,
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: alpha(theme.palette.primary.main, 0.2),
//             },
//             "&:hover .MuiOutlinedInput-notchedOutline": {
//               borderColor: alpha(theme.palette.primary.main, 0.3),
//             },
//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               borderColor: theme.palette.primary.main,
//             },
//           },
//         }}
//       />

//       {/* Optional: File type filters */}
//       {searchActive && (
//         <Box sx={{ mt: 2, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
//           <Typography variant="body2" color="text.secondary" sx={{ mr: 1, display: "flex", alignItems: "center" }}>
//             <FilterIcon fontSize="small" sx={{ mr: 0.5 }} /> Filters:
//           </Typography>

//           {searchFilters.fileTypes.map((type) => (
//             <Chip
//               key={type}
//               label={type}
//               size="small"
//               onDelete={() => handleRemoveFileTypeFilter(type)}
//               sx={{
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
//               }}
//             />
//           ))}

//           {searchFilters.fileTypes.length === 0 && !searchFilters.dateRange && (
//             <Typography variant="body2" color="text.secondary">
//               No filters applied
//             </Typography>
//           )}
//         </Box>
//       )}
//     </Box>
//   )
// }

// // Search algorithm function
// function performSearch(
//   term: string,
//   files: FileType[],
//   folders: FolderType[],
//   filters: {
//     fileTypes: string[]
//     dateRange: { from: Date | null; to: Date | null } | null
//   },
// ): { filteredFiles: FileType[]; filteredFolders: FolderType[] } {
//   const searchTermLower = term.toLowerCase().trim()

//   // Filter files
//   const filteredFiles = files.filter((file) => {
//     // Basic name search
//     const nameMatch = file.fileName.toLowerCase().includes(searchTermLower)

//     // Apply file type filter if any
//     const typeMatch =
//       filters.fileTypes.length === 0 ||
//       filters.fileTypes.some((type) => {
//         const extension = file.fileName.split(".").pop()?.toLowerCase() || ""
//         return type.toLowerCase() === extension
//       })

//     // Apply date filter if any
//     let dateMatch = true
//     if (filters.dateRange && (filters.dateRange.from || filters.dateRange.to)) {
//       const fileDate = new Date(file.updatedAt || file.createdAt)

//       if (filters.dateRange.from && filters.dateRange.to) {
//         dateMatch = fileDate >= filters.dateRange.from && fileDate <= filters.dateRange.to
//       } else if (filters.dateRange.from) {
//         dateMatch = fileDate >= filters.dateRange.from
//       } else if (filters.dateRange.to) {
//         dateMatch = fileDate <= filters.dateRange.to!
//       }
//     }

//     return nameMatch && typeMatch && dateMatch
//   })

//   // Filter folders - only by name
//   const filteredFolders = folders.filter((folder) => {
//     return folder.name.toLowerCase().includes(searchTermLower)
//   })

//   return { filteredFiles, filteredFolders }
// }

// export default FileSearch
