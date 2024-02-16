import mongoose from "mongoose";
import Type from "../types/type";

const Schema = new mongoose.Schema<Type>({
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.model("mymodel", Schema);
