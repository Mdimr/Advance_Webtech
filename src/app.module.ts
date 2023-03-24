import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userModule } from './User/usermodule.module';




@Module({
  imports: [userModule,TypeOrmModule.forRoot(
    { type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: '1234',
     database: 'nps',
     autoLoadEntities: true,
     synchronize: true,
   }
   ),],
  controllers: [],
  providers: [],
})
export class AppModule {}
 