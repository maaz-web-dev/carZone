const express = require("express");
const { getRecentActivities, getAllActivities } = require("../controllers/activityLogController");

const router = express.Router();

router.get("/recent", getRecentActivities);

router.get("/", getAllActivities);

module.exports = router;
