import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateComment } from "./comment.dto";
import { CommentEntity } from "./commententity.entity";

@Injectable()
export class CommentService {
    deleteCommentbyid(id: number): any {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(CommentEntity)
        private commentRepo: Repository<CommentEntity>,
        
      ) {}

      insertComment(commentdto:CreateComment):any {
        // const usercomment = new CommentEntity()
        // usercomment.comment = commentdto.comment;
        // usercomment.filename = commentdto.filename;
       return this.commentRepo.save(commentdto);
       
          } 

      updateComment(comment: any,id: string | number):any {
        console.log(comment+id);
        return this.commentRepo.update(id,{comment:comment});
        }

        updatecommentbyid(commentdto: CreateComment,id):any {
          return this.commentRepo.update(id,commentdto);
             }

      deleteCommentbyId(id):any {
    
        return this.commentRepo.delete(id);


}

getUsersByCommentId(id: number):any {
  return this.commentRepo.find({ 
          where: {id:id}, 
      relations: {
          user: true,
      },
   });
}

async comment(commentdto) {
    
    return this.commentRepo.save(commentdto);
    }
}