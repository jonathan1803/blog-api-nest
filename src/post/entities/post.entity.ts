import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from '../category/category.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'title' })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true, name: 'slug' })
  slug: string;

  //se cambio el tamaño de coverImage a 800 para permitir imágenes más grandes
  //pero si se hace ese  cambio tenemos que tener en cuanta que se puede borrar los datos  de esa columna
  //  si se hace un cambio de tamaño en la
  //  base de datos, cuidaod con correr una migracion con cambios de reglas
  //  de la base de datos, ya que puede borrar los datos de esa columna
  @Column({ type: 'varchar', length: 900, name: 'cover_image' })
  coverImage: string;

  @Column({ type: 'varchar', length: 255, name: 'summary' })
  summary: string;

  @Column({ type: 'text', name: 'content' })
  content: string;

  @Column({ type: 'boolean', default: true, name: 'is_draft' })
  isDraft: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'post_categories',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories?: Category[];
}
