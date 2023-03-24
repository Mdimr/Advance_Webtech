import { IsNotEmpty, IsString} from "class-validator";

export class CreateComment {
    
    @IsNotEmpty({ message: "Comments here......!"})
    @IsString()
    comment: string;
    
    
    filename: string;

    userId: number;

}