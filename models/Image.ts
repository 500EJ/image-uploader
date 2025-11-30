import { Schema, type InferSchemaType, model } from "mongoose";

const schema = new Schema({
  url: {
    type: String,
    required: true
  }
});

export type Image = InferSchemaType<typeof schema>;

export const ImageModel = model("Image", schema);
