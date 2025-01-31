import { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, CircularProgress, Alert, List, ListItem, ListItemText } from "@mui/material";
import { getCarCount } from "../../api/carService";
import { getCategoryCount } from "../../api/categoryService";
import { getRecentActivities } from "../../api/apiLogService"; 

const Dashboard = () => {
  const [totalCars, setTotalCars] = useState(null);
  const [totalCategories, setTotalCategories] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {

    fetchCounts();
    fetchRecentActivities();
  }, []);

  const fetchCounts = async () => {
    try {
      const carCount = await getCarCount();
      const categoryCount = await getCategoryCount();
      setTotalCars(carCount.count);
      setTotalCategories(categoryCount.count);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching counts:", err);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const activities = await getRecentActivities();
      setRecentActivities(activities);
    } catch (err) {
      setError("Failed to fetch recent activities.");
      console.error("Error fetching recent activities:", err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Cars</Typography>
            {totalCars !== null ? (
              <Typography variant="h3">{totalCars}</Typography>
            ) : (
              <CircularProgress />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Categories</Typography>
            {totalCategories !== null ? (
              <Typography variant="h3">{totalCategories}</Typography>
            ) : (
              <CircularProgress />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Recent Activities</Typography>
            {recentActivities.length > 0 ? (
              <List>
                {recentActivities.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={activity.description}
                      secondary={new Date(activity.createdAt).toLocaleString()}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No recent activities found.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
