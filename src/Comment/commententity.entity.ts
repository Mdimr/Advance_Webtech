import { UserEntity } from 'src/User/userentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity("comment")
export class CommentEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;


  @Column()
  filename: string;
  users: any;

  @ManyToOne(() => UserEntity, (user) => user.comments)
    user: UserEntity
 
}