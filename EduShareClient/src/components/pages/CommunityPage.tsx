"use client"

// import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Tabs,
  Tab,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import GroupIcon from "@mui/icons-material/Group"
import ForumIcon from "@mui/icons-material/Forum"
import EventIcon from "@mui/icons-material/Event"
import FavoriteIcon from "@mui/icons-material/Favorite"
import CommentIcon from "@mui/icons-material/Comment"
import ShareIcon from "@mui/icons-material/Share"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

const CommunityPage = () => {
  const [tabValue, setTabValue] = useState(0)

const handleTabChange = (_: unknown, newValue: number) => {
  setTabValue(newValue)
}
  // Sample data for groups
  const groups = [
    {
      id: 1,
      name: "Math Teachers Circle",
      members: 342,
      description: "A community for math teachers to share resources and teaching strategies.",
      image: "/placeholder.svg?height=100&width=100",
      tags: ["Mathematics", "Teaching Strategies", "Resources"],
    },
    {
      id: 2,
      name: "Science Educators Network",
      members: 287,
      description: "Connect with other science teachers and share lab ideas and experiments.",
      image: "/placeholder.svg?height=100&width=100",
      tags: ["Science", "Experiments", "STEM"],
    },
    {
      id: 3,
      name: "English Literature Club",
      members: 215,
      description: "Discuss literature teaching methods and share reading lists and activities.",
      image: "/placeholder.svg?height=100&width=100",
      tags: ["English", "Literature", "Reading"],
    },
  ]

  // Sample data for discussions
  const discussions = [
    {
      id: 1,
      title: "Best practices for remote teaching",
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=50&width=50",
      date: "2 days ago",
      comments: 24,
      likes: 47,
      excerpt:
        "I've been struggling with keeping students engaged during remote lessons. What strategies have worked for you?",
      tags: ["Remote Learning", "Student Engagement"],
    },
    {
      id: 2,
      title: "Incorporating technology in the classroom",
      author: "Michael Chen",
      avatar: "/placeholder.svg?height=50&width=50",
      date: "5 days ago",
      comments: 18,
      likes: 32,
      excerpt: "Looking for recommendations on apps and tools that have enhanced your teaching experience.",
      tags: ["Technology", "EdTech", "Tools"],
    },
    {
      id: 3,
      title: "Addressing learning gaps post-pandemic",
      author: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=50&width=50",
      date: "1 week ago",
      comments: 36,
      likes: 59,
      excerpt:
        "How are you all addressing the learning gaps that have emerged after the pandemic? I'm looking for effective strategies.",
      tags: ["Learning Recovery", "Assessment"],
    },
  ]

  // Sample data for events
  const events = [
    {
      id: 1,
      title: "Annual Educators Conference",
      date: "June 15-17, 2023",
      location: "Virtual Event",
      attendees: 1200,
      description: "Join educators from around the world for three days of workshops, presentations, and networking.",
    },
    {
      id: 2,
      title: "Teaching Innovation Workshop",
      date: "July 8, 2023",
      location: "New York, NY",
      attendees: 150,
      description: "A hands-on workshop focused on innovative teaching methods and classroom technologies.",
    },
    {
      id: 3,
      title: "Education Technology Expo",
      date: "August 22-24, 2023",
      location: "Chicago, IL",
      attendees: 800,
      description: "Explore the latest educational technologies and meet with EdTech companies.",
    },
  ]

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>
            Teacher Community
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
            Connect with fellow educators, join discussions, participate in groups, and stay updated on upcoming events.
            Our community is a space for collaboration, support, and professional growth.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
              },
            }}
          >
            <Tab label="Groups" icon={<GroupIcon />} iconPosition="start" />
            <Tab label="Discussions" icon={<ForumIcon />} iconPosition="start" />
            <Tab label="Events" icon={<EventIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Groups Tab */}
        {tabValue === 0 && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6">Popular Groups</Typography>
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(to right, #0d9488, #10b981)",
                  "&:hover": {
                    background: "linear-gradient(to right, #0f766e, #047857)",
                  },
                }}
              >
                Create New Group
              </Button>
            </Box>

            <Grid container spacing={3}>
              {groups.map((group) => (
                <Grid size={{xs: 12, md: 4}} key={group.id}>
                  <Card sx={{ height: "100%" }}>
                    <CardHeader
                      avatar={<Avatar src={group.image} alt={group.name} />}
                      title={group.name}
                      subheader={`${group.members} members`}
                      action={
                        <Button variant="outlined" size="small" startIcon={<PersonAddIcon />} sx={{ borderRadius: 50 }}>
                          Join
                        </Button>
                      }
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {group.description}
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {group.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: "#f0fdfa",
                              color: "#0f766e",
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 50,
                  borderColor: "#99f6e4",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "#5eead4",
                    bgcolor: "#f0fdfa",
                  },
                }}
              >
                Browse All Groups
              </Button>
            </Box>
          </Box>
        )}

        {/* Discussions Tab */}
        {tabValue === 1 && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6">Recent Discussions</Typography>
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(to right, #0d9488, #10b981)",
                  "&:hover": {
                    background: "linear-gradient(to right, #0f766e, #047857)",
                  },
                }}
              >
                Start Discussion
              </Button>
            </Box>

            <List sx={{ bgcolor: "background.paper" }}>
              {discussions.map((discussion) => (
                <Box key={discussion.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      flexDirection: "column",
                      py: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", width: "100%", mb: 2 }}>
                      <ListItemAvatar>
                        <Avatar src={discussion.avatar} alt={discussion.author} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
                            {discussion.title}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            Posted by {discussion.author} • {discussion.date}
                          </Typography>
                        }
                      />
                    </Box>

                    <Typography variant="body1" sx={{ pl: 7, mb: 2 }}>
                      {discussion.excerpt}
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, pl: 7, mb: 2 }}>
                      {discussion.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: "#f0fdfa",
                            color: "#0f766e",
                          }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: "flex", gap: 2, pl: 7 }}>
                      <Button startIcon={<FavoriteIcon />} size="small" sx={{ color: "text.secondary" }}>
                        {discussion.likes}
                      </Button>
                      <Button startIcon={<CommentIcon />} size="small" sx={{ color: "text.secondary" }}>
                        {discussion.comments}
                      </Button>
                      <Button startIcon={<ShareIcon />} size="small" sx={{ color: "text.secondary" }}>
                        Share
                      </Button>
                      <Button startIcon={<BookmarkIcon />} size="small" sx={{ color: "text.secondary" }}>
                        Save
                      </Button>
                    </Box>
                  </ListItem>
                  <Divider component="li" />
                </Box>
              ))}
            </List>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 50,
                  borderColor: "#99f6e4",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "#5eead4",
                    bgcolor: "#f0fdfa",
                  },
                }}
              >
                View All Discussions
              </Button>
            </Box>
          </Box>
        )}

        {/* Events Tab */}
        {tabValue === 2 && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6">Upcoming Events</Typography>
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(to right, #0d9488, #10b981)",
                  "&:hover": {
                    background: "linear-gradient(to right, #0f766e, #047857)",
                  },
                }}
              >
                Create Event
              </Button>
            </Box>

            <Grid container spacing={3}>
              {events.map((event) => (
                <Grid size={{xs: 12, md: 4}}  key={event.id}>
                  <Card sx={{ height: "100%" }}>
                    <Box
                      sx={{
                        height: 140,
                        bgcolor: "primary.main",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
                        textAlign: "center",
                        background: "linear-gradient(to right, #0d9488, #10b981)",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {event.date}
                      </Typography>
                    </Box>
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Location:</strong> {event.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Attendees:</strong> {event.attendees}
                        </Typography>
                      </Box>
                      <Typography variant="body2">{event.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 50,
                  borderColor: "#99f6e4",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "#5eead4",
                    bgcolor: "#f0fdfa",
                  },
                }}
              >
                View All Events
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default CommunityPage
