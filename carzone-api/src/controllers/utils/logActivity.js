const ActivityLog = require("../../models/ActivityLog");

const logActivity = async (action, entity, entityId, user, description) => {
  try {
    const activity = new ActivityLog({
      action,
      entity,
      entityId,
      user,
      description,
    });
    await activity.save();
  } catch (err) {
    console.error("Error logging activity:", err);
  }
};

module.exports = logActivity;
