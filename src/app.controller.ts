import { Controller, Get, Header, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface User {
  name: string;
}

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test_info')
  // @Header('Content-Type', 'text/html')
  getHello(): { name: string } {
    return { name: 'max' };
  }
}

// @Controller('my_home')
// export class AppController{
//   constructor(private readonly appService: AppService){}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

//npm run start:dev
