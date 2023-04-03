import {Document, model, Schema, Types, ObjectId} from 'mongoose';

const postSchema = new Schema<IPost>({
  title: { type: String, default: '', trim: true, maxlength: 400 },
  text: { type: String },
  upVotes: { type: Number},
  downVotes: { type: Number},
  book: { type: Types.ObjectId, ref: 'Genre' },
  user: { type: Types.ObjectId, ref: 'User'},
});

interface IPost extends Document {
  _id: any;
  title: string;
  text: string;
  upVotes: number;
  downVotes: number;
  book: ObjectId;
  user: ObjectId ;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Post = model<IPost>('Post', postSchema);

export default Post;
