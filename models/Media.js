import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

export default mongoose.model("Media", mediaSchema);
