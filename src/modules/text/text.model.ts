// text.model.ts

  import { Schema, model } from 'mongoose';
import { IText } from './text.interface';

const textSchema = new Schema<IText>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
});


  export const Text = model<IText>('Text', textSchema);

  