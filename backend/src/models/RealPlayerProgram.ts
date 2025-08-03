import mongoose, { Document, Schema } from "mongoose";

export interface IRealPlayerProgram extends Document {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  imageUrl?: string;
  url?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RealPlayerProgramSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    default: "https://player.real.gr/wp-content/uploads/2024/06/Logo-e1718700920635.png"
  },
  url: {
    type: String,
    default: "https://player.real.gr"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient time-based queries
RealPlayerProgramSchema.index({ startTime: 1, endTime: 1 });
RealPlayerProgramSchema.index({ isActive: 1 });

export default mongoose.model<IRealPlayerProgram>("RealPlayerProgram", RealPlayerProgramSchema); 