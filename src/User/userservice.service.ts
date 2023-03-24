import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUser } from "./user.dto";
import { UserEntity } from "./userentity.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";
import * as bcrypt from 'bcrypt';
// import * as crypto from 'crypto';

@Injectable()
export class UserService {
  userService: any;
    deleteCommentbyid(id: number): any {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private mailerService: MailerService
      ) {}

getIndex():any { 
    return this.userRepo.find();
    

}
getUserByID(id):any {
  return this.userRepo.findOneBy({ id });
}

getUserByIDName(qry):any {
  return this.userRepo.findOneBy({ id:qry.id,name:qry.name });
}

insertUser(mydto:CreateUser):any {
    const useraccount = new UserEntity()
    useraccount.name = mydto.name;
    useraccount.email = mydto.email;
    useraccount.password = mydto.password;
    useraccount.contact = mydto.contact;
    useraccount.filename = mydto.filename;
   return this.userRepo.save(mydto);
   
      } 
      
      updateUser(name: any,id: string | number):any {
        console.log(name+id);
        return this.userRepo.update(id,{name:name});
        }

        updateUserbyid(mydto: CreateUser,id):any {
          return this.userRepo.update(id,mydto);
             }


            //  async forgotPassword(email: string) {
            //   const user = await this.userService.findOneByEmail(email);
          
            //   if (!user) {
            //     throw new Error('User not found');
            //   }
          
            //   const token = crypto.randomBytes(20).toString('hex');
            //   user.resetPasswordToken = token;
            //   user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          
            //   await user.save();
          
            //   const resetUrl = `http://localhost:3000/reset-password/${token}`;
          
            //   await this.userService.sendMail({
            //     to: user.email,
            //     subject: 'Password reset request',
            //     text: `Please click on the following link to reset your password: ${resetUrl}`,
            //   });
            // }



             deleteUserbyid(id):any {
    
              return this.userRepo.delete(id);

      
    }

    getCommentsByUsersID(id: number):any {
      return this.userRepo.find({  
              where: {id:id},
          relations: {
              comments: true,
          },
       });
  }

    async signup(mydto) {
      const salt = await bcrypt.genSalt();
      const hassedpassed = await bcrypt.hash(mydto.password, salt);
      mydto.password= hassedpassed;
      return this.userRepo.save(mydto);
      }

      async signin(mydto){
        console.log(mydto.password);
        const getdata= await this.userRepo.findOneBy({email: mydto.email});
        const isMatch= await bcrypt.compare(mydto.password, getdata.password);
        if(isMatch) {
        return 1;
        }
        else {
            return 0;
        }
        
      }

      async sendEmail(to: string, subject: string, text: string): Promise<void>{
        return   await this.mailerService.sendMail({
               to: to,
               subject: subject,
               text: text, 
             });
       
       }
}