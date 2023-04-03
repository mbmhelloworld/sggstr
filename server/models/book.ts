import {Document, model, Schema, Mongoose, Types, ObjectId} from 'mongoose';

const bookSchema = new Schema<IBook>({
  title: { type: String, default: '', trim: true, maxlength: 400 },
  creator: { type: Types.ObjectId, ref: 'Creator' },
  genre: { type: Types.ObjectId, ref: 'Genre' },
  buyLink: { type: String },
  cover: { type: String },
});

interface IBook extends Document {
  _id: any;
  title: string;
  creator: ObjectId;
  genre: ObjectId;
  buyLink: string;
  cover: string;
}

bookSchema.path('title').required(true, 'Book title cannot be blank');
bookSchema.path('buyLink').required(true, 'Book link cannot be blank');
bookSchema.path('cover').required(true, 'Book cover cannot be blank');

// eslint-disable-next-line @typescript-eslint/naming-convention
const Book = model<IBook>('Book', bookSchema);

export default Book;
