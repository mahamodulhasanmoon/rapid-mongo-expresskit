import { Schema, model } from 'mongoose';
import { IDemo } from './demo.interface';

const demoSchema = new Schema<IDemo>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

export const Demo = model<IDemo>('Demo', demoSchema);
