import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { Env } from './env.model';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: parseInt(configService.get<string>('DB_PORT', '5432'), 10),
        username: configService.get<string>('DB_USER', 'postgres'),
        password:
          configService.get<string>('DB_PASS') ??
          configService.get<string>('DB_PASSWORD') ??
          'postgres',
        database: configService.get<string>('DB_NAME', 'myblog'),
        autoLoadEntities: true,
        synchronize: false,
        //synchronize => no es recomendable que este en tre en producción, ya que puede causar pérdida de datos
      }),
    }),
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
