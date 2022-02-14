import mongoose, { Schema } from "mongoose";

const customer = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

mongoose.models = {};

const Customer = mongoose.model("Customer", customer);

export default Customer;
