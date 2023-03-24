import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Post,
    Put,
    Req,
    Query,
    Session,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  
  import { diskStorage } from 'multer';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UnauthorizedException } from '@nestjs/common/exceptions';
import { SessionGuard } from './session.guard';
import { UserService } from './userservice.service';
import { CreateUser } from './user.dto';
import { CreateComment } from 'src/Comment/comment.dto';
import { CommentService } from 'src/Comment/commentservice.service';
  

 
  
  @Controller('/user')
  export class UserController {
      commentsevice: any;
    constructor(private userService: UserService,
     private commentService: CommentService
      )
     {}
  
    @Get('/dashboard')
    getEditor(): any {
      return this.userService.getIndex();
    }

    @Get('/finduser/:id')
    getUserByID(@Param('id', ParseIntPipe) id: number): any {
      return this.userService.getUserByID(id);
    }
    
  @Get('/finduser')
  getUserByIDName(@Query() qry: any): any {
    return this.userService.getUserByIDName(qry);
  }

    @Post('/insertuser')
  @UsePipes(new ValidationPipe())
    insertUser(@Body() mydto: CreateUser): any {
      return this.userService.insertUser(mydto);
    }
  
    @Put('/updateuser')
    @UsePipes(new ValidationPipe())
    updateUser(@Body('name') name: string, @Body('id') id: number): any {
      return this.userService.updateUser(name, id);
    }

    @Put('/updateuser/:id')
    // @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateUserbyid(
      @Body() mydto: CreateUser,
      @Param('id', ParseIntPipe) id: number,
    ): any {
      return this.userService.updateUserbyid(mydto, id);
    }

    @Delete('/deleteuser/:id')
    deleteUserbyid(@Param('id', ParseIntPipe) id: number): any {
      return this.userService.deleteUserbyid(id);
    }

    @Post('/signup')
    @UseInterceptors(FileInterceptor('filename',
    {storage:diskStorage({ 
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname)
      }
    })
    
    }))
    async signup(@Body() mydto:CreateUser,@UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
      ],
    }),) file: Express.Multer.File){
    
    mydto.filename = file.filename;  
    
    return this.userService.signup(mydto);
     console.log(file)
    
    }
//Forget password
  //   @Post('forgot-password')
  // async forgotPassword(@Body('email') email: string) {
  //   await this.userService.forgotPassword(email);
  //   return { message: 'Password reset email sent' };
  // }

  

    @Get('/signin')
async signin(@Session() session, @Body() mydto:CreateUser)
{
if(await this.userService.signin(mydto))
{
  session.email = mydto.email;

  console.log(session.email);
  return {message:"success"};

}
else
{
  return {message:"invalid credentials"};
}
}

@Get('/signout')
 signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}



// relationship between users and comment

@Get('/findcommentsbyusers/:id')
getCommentsByUsersID(@Param('id', ParseIntPipe) id: number): any {
  return this.userService.getCommentsByUsersID(id);
}

@Get('/findusersbycomments/:id')
getUsersByCommentId(@Param('id', ParseIntPipe) id: number): any {
  return this.commentService.getUsersByCommentId(id);
} 
// Commentsssssss


@Post('/insertComment') 
  @UsePipes(new ValidationPipe())
  insertComment(@Body() commentdto: CreateComment): any {
      return this.commentService.insertComment(commentdto); 
    }

    @Put('/updatecomment')
    @UsePipes(new ValidationPipe())
    updateComment(@Body('comment') comment: string, @Body('id') serial: number): any {
      return this.commentService.updateComment(comment, serial);
    }

    @Put('/updatecomment/:id')
    
    @UsePipes(new ValidationPipe()) 
    updatecommentbyid(
      @Body() commentdto: CreateComment,
      @Param('id', ParseIntPipe) id: number,
    ): any {
      return this.commentService.updatecommentbyid(commentdto, id);
    }
 
    @Delete('/deleteComment/:id')
    deleteCommentbyid(@Param('id', ParseIntPipe) id: number): any {
      return this.commentService.deleteCommentbyid(id);
    }

    @Post('/comment')
    @UseInterceptors(FileInterceptor('filename',
    {storage:diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname)
      }
    })
    }))





    async comment(@Body() commentdto:CreateComment,@UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
      ],
    }),) file: Express.Multer.File){
    
        commentdto.filename = file.filename;  
    
    return this.commentService.comment(commentdto);
     console.log(file)
    
    }


    @Post('/sendemail')
    async sendEmail(@Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string)
    {
    await this.userService.sendEmail(to,subject,text);
    }
}

function signout() {
    throw new Error('Function not implemented.');
}
