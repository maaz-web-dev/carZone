import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const Dashboard = () => {
  const totalCars = 120;
  const totalCategories = 8;
  const recentActivities = [
    'Added new car: Toyota Camry',
    'Updated category: SUV',
    'Deleted car: Honda Accord',
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Cars</Typography>
            <Typography variant="h3">{totalCars}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Categories</Typography>
            <Typography variant="h3">{totalCategories}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Recent Activities</Typography>
            <ul>
              {recentActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
