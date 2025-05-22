"use client"

import type React from "react"
import { Box, Typography, LinearProgress, useTheme } from "@mui/material"

interface UploadProgressProps {
  progress: number
}

const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
  const theme = useTheme()

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: theme.palette.grey[200],
          "& .MuiLinearProgress-bar": {
            background: "linear-gradient(to right, #0d9488, #10b981)",
          },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Uploading...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {progress}%
        </Typography>
      </Box>
    </Box>
  )
}

export default UploadProgress
