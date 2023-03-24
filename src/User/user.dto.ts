import { IsNotEmpty, IsString, Length, IsEmail } from "class-validator";

export class CreateUser {
    
    @IsNotEmpty({ message: "Enter your name here!"})
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "please provide a password"})
    @Length(8.16)
    password: string;

    @IsNotEmpty({ message: "Please enter your contact information"})
    @IsString()
    contact: string;

    filename: string;

}