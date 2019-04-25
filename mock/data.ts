/* eslint-disable @typescript-eslint/camelcase */

type Post = {
  readonly id: number;
  readonly title: string;
  readonly views: number;
  readonly user_id: number;
};

type User = {
  readonly id: number;
  readonly name: string;
};

type Comment = {
  readonly id: number;
  readonly post_id: number;
  readonly body: string;
  readonly date: Date;
};

const posts: Post[] = [
  { id: 1, title: 'Lorem Ipsum', views: 254, user_id: 123 },
  { id: 2, title: 'Sic Dolor amet', views: 65, user_id: 456 },
];

const users: User[] = [{ id: 123, name: 'John Doe' }, { id: 456, name: 'Jane Doe' }];
const comments: Comment[] = [
  { id: 987, post_id: 1, body: 'Consectetur adipiscing elit', date: new Date('2017-07-03') },
  { id: 995, post_id: 1, body: 'Nam molestie pellentesque dui', date: new Date('2017-08-17') },
];

export const data = { posts, users, comments };
