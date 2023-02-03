import { Injectable, NotFoundException, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './blog.model';

@Injectable()
export class BlogsServices {
  // private blogs: Blog[] = [];

  //Inject model step 2
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  //增加blog
  async insertBlog(title: string, body: string, author: string) {
    // const blogId = Math.random().toString();
    const time = new Date().toString();
    const newBlog = new this.blogModel({ title, body, author, time });

    const result = await newBlog.save();

    console.log(result._id);
    return result._id;
    // return blogId;
    // return title;
  }

  //获取全部blog
  async getBlogs() {
    const blogs = await this.blogModel.find().exec();
    // console.log(blogs);
    //  这么写会有new object id，id的格式会不对
    // return blogs as Blog[];
    return blogs.map((blog) => ({
      // mongoose的API，以字符串形式提取了id
      _id: blog.id,
      title: blog.title,
      body: blog.body,
      author: blog.author,
      time: blog.time,
    }));
  }

  //获取单个blog
  async getSingleBlog(blogId: string) {
    const blog = await this.findBlog(blogId);
    // return { ...blog };
    return {
      _id: blog.id,
      title: blog.title,
      body: blog.body,
      author: blog.author,
      time: blog.time,
    };
  }

  //查找具体的blog， 返回blog和index值
  private async findBlog(blogId: string): Promise<Blog> {
    let blog;
    try {
      blog = await this.blogModel.findById(blogId);
    } catch (error) {
      throw new NotFoundException('Could not find blog.(invalided ID form).');
    }

    if (!blog) {
      throw new NotFoundException(
        'Could not find blog.(valided ID form but not find).',
      );
    }
    console.log(blog);
    return blog;
    // return {
    //   _id: blog.id,
    //   title: blog.title,
    //   body: blog.body,
    //   author: blog.author,
    //   time: blog.time,
    // };
  }

  //更新blog
  async updateBlog(
    blogId: string,
    title: string,
    body: string,
    author: string,
  ) {
    const updatedBlog = await this.findBlog(blogId);
    if (title) {
      updatedBlog.title = title;
    }
    if (body) {
      updatedBlog.body = body;
    }
    if (author) {
      updatedBlog.author = author;
    }
    updatedBlog.save();
  }

  //删除blog
  async deleteBlog(blogId: string) {
    let result;
    try {
      result = await this.blogModel.deleteOne({ _id: blogId }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find blog.(invalided ID form).');
    }

    if (result.deletedCount === 0) {
      throw new NotFoundException(
        'Could not find blog.(valided ID form but not find).',
      );
    }
  }
}
