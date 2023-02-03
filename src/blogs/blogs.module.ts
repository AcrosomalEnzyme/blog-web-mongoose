import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsServices } from './blogs.services';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './blog.model';

@Module({
  //Inject model, step 1
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }])],
  controllers: [BlogsController],
  providers: [BlogsServices],
})
export class BlogsModule {}
