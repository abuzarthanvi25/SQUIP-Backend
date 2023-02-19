const mongoose = require("mongoose");

const ComplainSchema = mongoose.Schema({
  name: String,
  contact: String,
  location: Object,
  threat: String,
  created_at: String,
  is_resolved: Boolean,
  is_accepted: Boolean,
  category: String
}); 

const ComplainModel = mongoose.model("Complain", ComplainSchema);

module.exports = ComplainModel;
