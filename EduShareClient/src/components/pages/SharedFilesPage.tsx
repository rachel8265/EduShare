import { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Button, Card, CardContent, Tabs, Tab, MenuItem, Select, FormControl,
  InputLabel, OutlinedInput, InputAdornment, Chip, Avatar, CircularProgress, Collapse, IconButton, Paper, Divider, Menu,
  ThemeProvider, Grid,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import FolderIcon from '@mui/icons-material/Folder';
import GridViewIcon from '@mui/icons-material/GridView';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Changed from ShareIcon
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ShareIcon from '@mui/icons-material/Share';
import { fetchSharedFiles } from '../store/FileSlice';
import { fetchTopics } from '../store/TopicSlice';
import type { FileType } from '../../models/FileType';

interface TopicType {
  id: string | number;
  name: string;
  description?: string;
  iconName?: string; // Added for topic icons
}

// MUI Theme to incorporate the teal color
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#14b8a6", // teal-500 from user's palette
//       light: "#5eead4",
//       dark: "#0f766e",
//     },
//     secondary: {
//       main: "#10b981", // emerald-500
//     },
//     background: {
//       default: "#F8FAFC", // Light grey similar to Tailwind's gray-50
//       paper: "#ffffff",
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//     button: {
//       textTransform: "none",
//     },
//   },
//   shape: {
//     borderRadius: 8, // Default border radius from user's palette
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           // borderRadius: 20, // For more rounded buttons like in image
//         },
//       },
//     },
//     MuiOutlinedInput: {
//         styleOverrides: {
//             root: {
//                 // borderRadius: 20, // For more rounded search like in image
//             }
//         }
//     }
//   }
// });


// ---------- Helper Functions ----------
const formatFileSize = (bytes: number): string => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (fileType: string = '', size: 'large' | 'medium' | 'small' = 'medium') => {
  const theme=useTheme()
  const iconProps = { 
    fontSize: size, 
    sx: { 
      width: size === 'large' ? 40 : (size === 'medium' ? 28 : 20), 
      height: size === 'large' ? 40 : (size === 'medium' ? 28 : 20) 
    } 
  };
  if (fileType.includes('image')) return <ImageIcon {...iconProps} sx={{ color: theme.palette.secondary.main }} />;
  if (fileType.includes('video')) return <MovieIcon {...iconProps} color="error" />;
  if (fileType.includes('audio')) return <AudioFileIcon {...iconProps} sx={{ color: '#f59e0b' /* amber-500 */}} />;
  if (fileType.includes('pdf')) return <PictureAsPdfIcon {...iconProps} sx={{ color: '#ef4444' /* red-500 */}} />;
  return <InsertDriveFileIcon {...iconProps} color="action" />;
};

const formatRelativeTime = (date: string | Date) => {
  if (!date) return '';
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `Just now`;
};

// ---------- FileCard ----------
function FileCard({ file, handleDownload, handleViewFile }: { file: FileType, handleDownload: (file: FileType) => void, handleViewFile: (file: FileType) => void }) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(menuAnchor);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = (event?: MouseEvent<HTMLElement>) => {
    if (event) event.stopPropagation();
    setMenuAnchor(null);
  };

  const onFileDownload = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleDownload(file);
    handleMenuClose();
  };

  // const onFileView = (event: MouseEvent<HTMLElement>) => {
  //   event.stopPropagation();
  //   handleViewFile(file);
  //   handleMenuClose();
  // };
  
  return (
    <Card 
    onClick={() => handleViewFile(file)} // <--- הופך את כל הכרטיס ללחיץ
      sx={{
        cursor: "pointer",
      display: 'flex', flexDirection: 'column', height: '100%',
      transition: 'box-shadow 0.3s, transform 0.3s', position: 'relative',
      border: '1px solid #e2e8f0', // slate-200
      '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transform: 'translateY(-2px)' }
    }}>
      <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
              {getFileIcon(file.fileType, 'large')}
              <Box sx={{ overflow: 'hidden' }}>
                <Typography variant="subtitle1" noWrap sx={{ fontWeight: 500, color: '#0f172a' /* slate-900 */ }}>
                  {file.fileName}
                </Typography>
                <Typography variant="caption" color="text.secondary">{formatFileSize(file.fileSize)}</Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={handleMenuClick} aria-label="more options" sx={{ color: '#64748b' /* slate-500 */}}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Chip
            size="small"
            label={file.ownerName ? `Shared by ${file.ownerName}` : "Shared"}
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'primary.contrastText', 
              maxWidth: '65%', 
              overflow: 'hidden',
              fontSize: '0.75rem'
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {file.updatedAt && formatRelativeTime(file.updatedAt)}
          </Typography>
        </Box>
      </CardContent>
      <Menu
        anchorEl={menuAnchor}
        open={openMenu}
        onClose={() => handleMenuClose()}
        PaperProps={{
            elevation: 2,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))',
              mt: 0.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
       <MenuItem onClick={e => { e.stopPropagation(); handleViewFile(file); }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VisibilityIcon fontSize="small" />
          <Typography variant="body2">View File</Typography>
        </Box>
      </MenuItem>
        <MenuItem onClick={onFileDownload}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DownloadIcon fontSize="small" />
            <Typography variant="body2">Download</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </Card>
  );
}

// ---------- TopicSection ----------
function TopicSection({
  topic,
  files,
  handleDownload,
  handleViewFile
}: {
  topic: TopicType,
  files: FileType[],
  handleDownload: (file: FileType) => void,
  handleViewFile: (file: FileType) => void
}) {
  const [expanded, setExpanded] = useState(true);

  const getIconForTopic = () => {
    const theme = useTheme();
    switch (topic.iconName?.toLowerCase()) {
      case 'document': return <DescriptionIcon color="primary" />;
      case 'image': return <ImageIcon sx={{ color: theme.palette.secondary.main }} />;
      case 'video': return <MovieIcon color="error" />;
      case 'audio': return <AudioFileIcon sx={{ color: '#f59e0b' }} />;
      default: return <FolderIcon color="primary" />;
    }
  };

  return (
    <Paper elevation={0} sx={{ mb: 3, overflow: 'hidden', border: '1px solid #e2e8f0', borderRadius: 2 }}>
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          px: 2.5, py: 2, cursor: 'pointer', bgcolor: 'background.paper',
          '&:hover': { bgcolor: '#f1f5f9' /* slate-100 */ }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark', width: 40, height: 40 }}>
            {getIconForTopic()}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a' }}>
              {topic.name}
            </Typography>
            {topic.description && (
              <Typography variant="body2" color="text.secondary">
                {topic.description}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label={`${files.length} file${files.length !== 1 ? 's' : ''}`}
            size="small"
            sx={{ bgcolor: '#e2e8f0', color: '#334155'}}
          />
          <IconButton size="small" sx={{color: '#64748b'}}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <Box sx={{ p: 2.5, bgcolor: '#f8fafc' /* slate-50 */ }}>
          <Grid container spacing={2.5}>
            {files.map((file) => (
              <Grid size={{xs:12, sm:6, md:4, lg:3}}  key={file.id ?? Math.random()}>
                <FileCard file={file} handleDownload={handleDownload} handleViewFile={handleViewFile} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
}

// ---------- Main Component ----------
import type { AppDispatch } from '../store/Store';
import FileViewer from '../fileManager/FileViewer';

export default function SharedFiles() {
  const theme=useTheme()
  const dispatch = useDispatch<AppDispatch>();
  const sharedFiles: FileType[] = useSelector((state: any) => state.files?.sharedFiles || []);
  const loading: boolean = useSelector((state: any) => state.files?.loading || false);
  const error: string | null = useSelector((state: any) => state.files?.error || null);
  const topics: TopicType[] = useSelector((state: any) => state.topics?.topics || []);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'topics' | 'list'>('topics');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'size'>('newest');
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);

  const [viewerOpen, setViewerOpen] = useState(false);
const [selectedFile, setSelectedFile] = useState<FileType | null>(null);



  useEffect(() => {
    dispatch(fetchSharedFiles());
    dispatch(fetchTopics());
  }, [dispatch]);

  const handleViewFile = (file: FileType) => {
  setSelectedFile(file);
  setViewerOpen(true);
};

const handleViewerClose = () => {
  setViewerOpen(false);
  setSelectedFile(null);
};
  // Filter and sort files
  const filteredFiles = (sharedFiles || []).filter((file) =>
    file.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (!a.updatedAt || !b.updatedAt) return 0; // Handle cases where dateShared might be missing
    if (sortBy === 'newest') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (sortBy === 'oldest') return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    if (sortBy === 'name') return (a.fileName || '').localeCompare(b.fileName || '');
    if (sortBy === 'size') return (b.fileSize || 0) - (a.fileSize || 0);
    return 0;
  });

  // Group files by topic
  type FilesByTopic = { topic: TopicType, files: FileType[] }[];
  const filesByTopic: FilesByTopic = (topics || []).reduce((acc: FilesByTopic, topic) => {
    const topicFiles = sortedFiles.filter(file => file.topicId === topic.id);
    if (topicFiles.length > 0) {
      acc.push({ topic, files: topicFiles });
    }
    return acc;
  }, []);

  // Files without a topic
  const uncategorizedFiles = sortedFiles.filter(file => !file.topicId && filesByTopic.every(ft => ft.files.every(f => f.id !== file.id)));
  if (uncategorizedFiles.length > 0) {
    filesByTopic.push({
      // @ts-ignore
      topic: { id: 'uncategorized', name: 'Uncategorized', iconName: 'folder' },
      files: uncategorizedFiles
    });
  }

  // Handle filter menu
  const handleFilterClick = (event: MouseEvent<HTMLButtonElement>) => setFilterAnchor(event.currentTarget);
  const handleFilterClose = () => setFilterAnchor(null);

  // Handle download and view
  const handleDownload = (file: FileType) => {
    if (file.fileUrl) window.open(file.fileUrl, '_blank');
  };
  // const handleViewFile = (file: FileType) => {
  //   if (file.fileUrl) window.open(file.fileUrl, '_blank');
  // };

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', p:2 }}>
          <Typography color="error" variant="h6" textAlign="center">{error}</Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              // @ts-ignore
              dispatch(fetchSharedFiles());
              // @ts-ignore
              dispatch(fetchTopics());
            }}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: {xs:2, md:4}, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
          {/* Header */}
          <Box sx={{
            display: 'flex', flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: {xs:3, md:4}, gap: 2
          }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Shared Files
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View and manage files shared with you.
              </Typography>
            </Box>
            <Tabs
              value={viewType}
              onChange={(_e, newValue) => setViewType(newValue)}
              sx={{
                minHeight: 'auto',
                '& .MuiTabs-flexContainer': { gap: 1 },
                '& .MuiTab-root': { 
                    minHeight: 'auto', 
                    py: 1.25, 
                    px: 2.5,
                    borderRadius: 1, // from theme.shape.borderRadius
                    fontWeight: 500,
                 },
              }}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<FolderIcon />} iconPosition="start" label="By Topic" value="topics" />
              <Tab icon={<GridViewIcon />} iconPosition="start" label="All Files" value="list" />
            </Tabs>
          </Box>

          {/* Search and filters */}
          <Paper elevation={0} sx={{ p: 2.5, mb: {xs:3, md:4}, borderRadius: 2, border:'1px solid #e2e8f0' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth variant="outlined" size="small">
                  <OutlinedInput
                    placeholder="Search shared files..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                    sx={{ borderRadius: 1.5 }} // Slightly more rounded like example
                  />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} >
                <Box sx={{ display: 'flex', gap: 1.5, justifyContent: { xs: 'flex-start', md: 'flex-end' }, flexWrap: 'wrap' }}>
                  <FormControl variant="outlined" size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as any)}
                      label="Sort by"
                      startAdornment={<InputAdornment position="start"><SortIcon fontSize="small" /></InputAdornment>}
                       sx={{ borderRadius: 1.5 }}
                    >
                      <MenuItem value="newest">Newest first</MenuItem>
                      <MenuItem value="oldest">Oldest first</MenuItem>
                      <MenuItem value="name">File Name</MenuItem>
                      <MenuItem value="size">File Size</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FilterListIcon />}
                    onClick={handleFilterClick}
                    sx={{ height: '40px', borderRadius: 1.5, borderColor: '#cbd5e1' /* slate-300 */, color: '#334155' }}
                  >
                    Filter
                  </Button>
                  <Menu anchorEl={filterAnchor} open={Boolean(filterAnchor)} onClose={handleFilterClose}>
                    <MenuItem onClick={handleFilterClose}>All file types</MenuItem>
                    <MenuItem onClick={handleFilterClose}>Documents</MenuItem>
                    <MenuItem onClick={handleFilterClose}>Images</MenuItem>
                    <MenuItem onClick={handleFilterClose}>Videos</MenuItem>
                  </Menu>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Content */}
          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
              <CircularProgress size={50} color="primary" sx={{ mb: 2 }} />
              <Typography color="text.secondary">Loading shared files...</Typography>
            </Box>
          ) : (!sharedFiles || sharedFiles.length === 0) && !loading ? ( // Check after loading is false
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign:'center', py: 8, px:2 }}>
              <Avatar sx={{ width: 72, height: 72, mb: 2.5, bgcolor: 'primary.light', color: 'primary.dark' }}>
                <ShareIcon sx={{fontSize: 36}}/>
              </Avatar>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#0f172a' }}>No Shared Files Found</Typography>
              <Typography color="text.secondary">It seems no files have been shared with you yet.</Typography>
            </Box>
          ) : viewType === 'topics' ? (
            <Box>
              {filesByTopic.map(
                ({ topic, files }, idx) => (

<TopicSection
  key={topic.id ?? `topic-${idx}`}
  topic={topic}
  files={files}
  handleDownload={handleDownload}
  handleViewFile={handleViewFile}
/>                )
              )}
            </Box>
          ) : (
            <Grid container spacing={2.5}>
              {sortedFiles.map((file) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={file.id ?? Math.random()}>
                  <FileCard file={file} handleDownload={handleDownload} handleViewFile={handleViewFile} />
                </Grid>    ))}
            </Grid>
          )}
        </Box>
      </Box>
   
<FileViewer
  file={selectedFile}
  open={viewerOpen}
  onClose={handleViewerClose}
/>
    </ThemeProvider>
  );
}
