import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';

//引入MongoDB
//npm install --save mongoose @nestjs/mongoose
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BlogsModule,
    MongooseModule.forRoot(
      'mongodb+srv://{user}:{password}@cluster0.{xxxxxxxxx}.mongodb.net/blog_web_mongoose?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
