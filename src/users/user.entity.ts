import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('User inserted. Id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User updated. Id:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('User removed. Id:', this.id);
  }
}
