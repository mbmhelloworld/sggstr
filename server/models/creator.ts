import {Document, model, Schema, Mongoose, Types, ObjectId} from 'mongoose';

const creatorSchema = new Schema({
  lastName: { type: String, default: '', trim: true, maxlength: 400 },
  foreName: { type: String, default: '', trim: true, maxlength: 400 },
  origin: { type: String, default: '', trim: true, maxlength: 2 },
});

interface IGenre extends Document {
  _id: any;
  lastName: string;
  foreName: string;
  origin: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Creator = model('Creator', creatorSchema);

export default Creator;
