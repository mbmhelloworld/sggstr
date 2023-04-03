import {Document, model, Schema, Mongoose, Types, ObjectId} from 'mongoose';

const genreSchema = new Schema<IGenre>({
  name: { type: String, default: '', trim: true, maxlength: 40 },
});

interface IGenre extends Document {
  _id: any;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Genre = model('Genre', genreSchema);

export default Genre;
