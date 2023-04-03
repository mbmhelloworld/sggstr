import BaseCtrl from './base';
import Post from '../models/post';
import {Request, Response} from 'express';
import Vote from '../models/vote';

class PostCtrl extends BaseCtrl {
  model = Post;
  upVote = async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;
      const userId = req.params.userId;
      const voteType = 'up';
      // Check if the user has already voted on the post
      const existingVote = await Vote.findOne({ postId, userId });
      // If the user has already voted with a different voteType, return an error
      if (existingVote && existingVote.voteType !== voteType) {
        return res.status(400).json({ error: 'User has already voted on this post with a different vote type' });
      }
      // If the user has already voted with the same voteType, do nothing
      if (existingVote && existingVote.voteType === voteType) {
        return res.status(200).json({ message: 'User has already upvoted this post' });
      }
      // Create a new vote document with the upvote value
      const newVote = new Vote({ postId, userId, voteType });
      await newVote.save();
      // Update the post's upvote count
      const post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { upVote: 1 } },
        { new: true }
      );
      // Return the updated post with the new vote count
      return res.status(200).json(post);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  downVote = async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;
      const userId = req.params.userId;
      const voteType = 'down';
      // Check if the user has already voted on the post
      const existingVote = await Vote.findOne({ postId, userId });
      // If the user has already voted with a different voteType, return an error
      if (existingVote && existingVote.voteType !== voteType) {
        return res.status(400).json({ error: 'User has already voted on this post with a different vote type' });
      }
      // If the user has already voted with the same voteType, do nothing
      if (existingVote && existingVote.voteType === voteType) {
        return res.status(200).json({ message: 'User has already upvoted this post' });
      }
      // Create a new vote document with the upvote value
      const newVote = new Vote({ postId, userId, voteType });
      await newVote.save();
      // Update the post's downvote count
      const post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { downVote: 1 } },
        { new: true }
      );
      // Return the updated post with the new vote count
      return res.status(200).json(post);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
}

export default PostCtrl;

