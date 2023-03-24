import { CommentEntity } from 'src/Comment/commententity.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity("users")
export class UserEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
 
  @Column()
  contact: string;

  @Column()
  filename: string;

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[]

}