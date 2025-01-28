import { Avatar, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';  
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const sidebarItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Category Management", icon: <CategoryIcon />, path: "/categories" },
    { text: "Car Management", icon: <DirectionsCarIcon />, path: "/cars" },
    { text: "Add New Car", icon: <AddCircleOutlineIcon />, path: "/add-car" },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#3F51B5', 
        color: '#FFFFFF', 
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: '#283593', 
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mb: 1,
            border: '2px solid #FFFFFF',
          }}
        />
        {user ? (
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
            {user.name || 'Admin'}
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
            Loading...
          </Typography>
        )}
      </Box>

      <Divider />

      {/* Sidebar Items */}
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={index}
            sx={{
              bgcolor: location.pathname === item.path ? '#7986CB' : 'transparent', // Highlight active item
              '&:hover': {
                bgcolor: '#5C6BC0', 
              },
              color: '#FFFFFF', 
              '.MuiListItemIcon-root': { color: 'inherit' },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      {/* Spacer */}
      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      {/* Logout Button */}
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: '#FFFFFF' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
