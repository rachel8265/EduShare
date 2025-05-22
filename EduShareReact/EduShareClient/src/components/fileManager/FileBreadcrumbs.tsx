// components/FileBreadcrumbs.jsx
import React from 'react';
import { Box, Breadcrumbs, Link } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { updateCurrentPath } from '../store/FolderSlice';
import { AppDispatch } from '../store/Store';
import { FolderType } from '../../models/FolderType';

interface FileBreadcrumbsProps {
    currentPath: FolderType[];
    dispatch: AppDispatch;
}

const FileBreadcrumbs: React.FC<FileBreadcrumbsProps> = ({ currentPath, dispatch }) => {
  const handleNavigateToFolder = (index:number) => {
    // Navigate to a specific folder in the breadcrumb
    const newPath = currentPath.slice(0, index + 1);
    dispatch(updateCurrentPath(newPath));
  };

  return (
    <Breadcrumbs 
      separator={<ChevronRightIcon fontSize="small" />} 
      aria-label="breadcrumb"
      sx={{ mb: 3 }}
    >
      <Link
        underline="hover"
        color="inherit"
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
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
            sx={{ cursor: 'pointer' }}
            onClick={() => handleNavigateToFolder(0)}
          >
            {currentPath[0].name}
          </Link>
          <span>...</span>
          </Box>
      )}

      {/* Last two path segments */}
      {currentPath.slice(-2).map((folder, index, array) => {
        const actualIndex = currentPath.length - array.length + index;
        return (
          <Link
            key={folder.id}
            underline="hover"
            color={index === array.length - 1 ? 'text.primary' : 'inherit'}
            onClick={() => handleNavigateToFolder(actualIndex)}
            sx={{ 
              cursor: 'pointer',
              fontWeight: index === array.length - 1 ? 600 : 400
            }}
          >
            {folder.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default FileBreadcrumbs;