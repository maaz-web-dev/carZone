const ActivityLog = require("../models/ActivityLog");

exports.getRecentActivities = async (req, res, next) => {
  try {
    console.log("Fetching recent activities...");
    
    const recentActivities = await ActivityLog.find()
      .sort({ createdAt: -1 }) 
      .limit(3); 

    res.status(200).json(recentActivities);
  } catch (err) {
    console.error("Error fetching recent activities:", err);
    next(err);
  }
};

exports.getAllActivities = async (req, res, next) => {
  try {
    console.log("Fetching all activity logs...");

    const activities = await ActivityLog.find().sort({ createdAt: -1 });

    res.status(200).json(activities);
  } catch (err) {
    console.error("Error fetching activity logs:", err);
    next(err);
  }
};
