import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: Map<number, User> = new Map<number, User>();
  email: string;
  password: string;

  constructor() {
    this.populate();
  }

  populate() {
    try {
      this.users.set(
        1,
        new User(
          1,
          'Wilfredo Quitara',
          18,
          'Wilfredo.Quitara@gmail.com',
          '123456',
        ),
      );
      this.users.set(
        2,
        new User(2, 'Kate Sasan', 16, 'Kate.Sasan@gmail.com', '1234567'),
      );
      this.users.set(
        3,
        new User(3, 'Maegan Chu', 17, 'Maegan.Chu@gmail.com', '1234568'),
      );
      this.users.set(
        4,
        new User(
          4,
          'Shannen Loyola',
          18,
          'Shannen.Loyola@gmail.com',
          '1234569',
        ),
      );
      this.logAllUsers();
      console.log('Finished population');
    } catch (error) {
      console.log(error);
    }
  }

  register(user: any): { success: boolean; message: string } {
    try {
      var validBody: { valid: boolean; error: string } = User.validBody(user);
      if (validBody.valid) {
        var newUser: User = new User(
          user.id,
          user.name,
          user.age,
          user.email,
          user.password,
        );
        this.users.set(user.id, newUser);
        this.logAllUsers();
        return {
          success: true,
          message: 'Thank you for registering! Account has been added.',
        };
      } else {
        return { success: false, message: validBody.error };
      }
    } catch (error) {
      return { success: false, message: 'Error adding account' };
    }
  }

  logAllUsers() {
    console.log(this.getAll());
  }

  getAll() {
    var populateData = [];
    for (const user of this.users.values()) {
      populateData.push(user.toJson());
    }
    return populateData;
  }

  getOne(id: number) {
    if (this.users.has(id)) {
      return this.users.get(id).toJson();
    } else
      return {
        success: false,
        error: `User ${id} is not in database`,
      };
  }

  replaceValuePut(id: number, user: any) {
    if (this.users.has(id)) {
      var validBodyPut: { valid: boolean; error: string } =
        User.validBodyPut(user);
      if (validBodyPut.valid) {
        var newUser: User = new User(
          id,
          user.name,
          user.age,
          user.email,
          user.password,
        );
        this.users.set(id, newUser);
        this.logAllUsers();
        return {
          success: true,
          data: newUser.toJson(),
        };
      } else return validBodyPut;
    } else
      return {
        success: false,
        error: `User ${id} is not in database`,
      };
  }

  replaceValuePatch(id: number, user: any) {
    if (this.users.has(id)) {
      var userObj: User = this.users.get(id);
      var result = userObj.patch(user);
      this.logAllUsers();
      return { result, data: userObj.toJson() };
    } else
      return {
        valid: false,
        error: `User ${id} is not in database`,
      };
  }

  deleteUser(id: number) {
    if (this.users.has(id)) {
      return {
        success: this.users.delete(id),
        error: `User ${id} has been successfully removed`,
      };
    } else
      return {
        success: false,
        error: `User ${id} is not in database`,
      };
  }

  login(email: string, password: string) {
    for (const user of this.users.values()) {
      if (user.matches(email)) return user.login(password);
    }
    return { success: false, message: `${email} not found in database` };
  }

  searchUser(term: string) {
      var results = [];
    for (const user of this.users.values()) {
      if (user.matches(term)) results.push(user.toJson());
    }
    if(results.length>0){
        return results;
    }
    return {
      success: false,
      message: `${term} not matching any user entry in database`,
    };
  }
}
