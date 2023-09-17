import { TypeOf, boolean, object, string } from 'zod';

export const createPostSchema = object({
  authorId: string({
    required_error: 'Author Id is required',
  }),
  title: string({
    required_error: 'title is required',
  }),
  content: string().max(200, 'content must be less than 32 characters'),
  published: boolean(),
})

export type CreatePostInput = TypeOf<typeof createPostSchema>