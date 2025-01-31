const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, 
    entity: { type: String, required: true }, 
    entityId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    user: { type: String, required: true }, 
    description: { type: String, required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);
