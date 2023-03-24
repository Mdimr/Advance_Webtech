import { Module } from '@nestjs/common';
import { UserController } from "./user.controller"
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./userservice.service"
import { UserEntity } from "./userentity.entity"

// import { NewsService } from 'src/News/newsservice.service';
// import { NewsEntity } from "src/News/newsentity.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { CommentEntity } from 'src/Comment/commententity.entity';
import { CommentService } from 'src/Comment/commentservice.service';
// import { EditorService } from 'src/Editor/editorservice.service';
// import { EditorEntity } from 'src/Editor/editorentity.entity';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com',
                       port: 465,
                       ignoreTLS: true,
                       secure: true,
                       auth: {
                           user: 'ums',
                           pass: 'ypebusnvlmxacqps'
                       },
                      }
          }),


 TypeOrmModule.forFeature([UserEntity,CommentEntity])],
controllers: [UserController],
providers: [UserService,CommentService],


})


export class userModule{}