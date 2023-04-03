import {Document, model, Schema, Types, ObjectId} from 'mongoose';

const voteSchema = new Schema<IVote>({
  post: { type: Types.ObjectId, ref: 'Genre' },
  user: { type: Types.ObjectId, ref: 'User'},
  voteType: { type: String, enum: ['up', 'down'] },},
 { timestamps: true });

 voteSchema.index({ postId: 1, userId: 1 }, { unique: true });

interface IVote extends Document {
  _id: any;
  post: ObjectId;
  user: ObjectId ;
  voteType: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Vote = model<IVote>('Vote', voteSchema);

export default Vote;
