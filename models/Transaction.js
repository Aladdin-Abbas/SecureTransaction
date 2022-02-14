import mongoose, { Schema } from "mongoose";

const transaction = new Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
mongoose.models = {};

const Transaction = mongoose.model("Transaction", transaction);

export default Transaction;
