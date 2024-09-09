import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
