import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    time: { type: String, required: true },
  },
  { versionKey: false },
);

export interface Blog extends mongoose.Document{
  _id: string;
  title: string;
  body: string;
  author: string;
  time: string;
}

// export class Blog {
//   //写法1
//   // id: string;
//   // title: string;
//   // body: string;
//   // author: string;
//   // // time: string;
//   // constructor(id: string, title: string, body: string, author: string) {
//   //     this.id = id;
//   //     this.title = title;
//   //     this.body = body;
//   //     this.author = author;
//   // }
//   // // 写法2
//   // constructor(
//   //   public id: string,
//   //   public title: string,
//   //   public body: string,
//   //   public author: string,
//   //   public time: string,
//   // ) {}
// }
