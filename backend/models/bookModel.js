// models/bookModel.js
import mongoose from "mongoose";
import { Counter } from "./counterModel.js";

const bookSchema = mongoose.Schema(
  {
    customId:{
      type:Number,
      unique:true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum:["Fiction", "Sci-Fi", "Action", "Thriller", "Comedy"]
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number, // Add this field
      required: true,
      default: 0,
      min: 0,
      max: 5, // Restrict rating to between 0 and 5
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.pre("save",async function (next) {
  if(this.isNew){
    const counter = await Counter.findOneAndUpdate(
      {id: "book_seq"},
      {$inc:{seq:1}},
      {new:true,upsert:true}
    );
    this.customId = counter.seq;
  }
  next();
  
});

export const Book = mongoose.model('Book', bookSchema);
