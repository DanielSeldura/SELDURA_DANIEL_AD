import { CRUDReturn } from './user.resource/crud_return.interface';
import { Helper } from './user.resource/helper';
import { Injectable } from '@nestjs/common';
import { User } from './user.resource/user.model';

const DEBUG: boolean = true;
@Injectable()
export class UserService {
  private users: Map<string, User> = new Map<string, User>();

  constructor() {
    this.users = Helper.populate();
  }


  



  register(body: any): CRUDReturn {
    try {
      var validBody: { valid: boolean; data: string } =
        Helper.validBodyPut(body);
      if (validBody.valid) {
        if (!this.emailExists(body.email)) {
          var newUser: User = new User(
            body.name,
            body.age,
            body.email,
            body.password,
          );
          if (this.saveToDB(newUser)) {
            if (DEBUG) this.logAllUsers();
            return {
              success: true,
              data: newUser.toJson(),
            };
          } else {
            throw new Error('generic database error');
          }
        } else
          throw new Error(`${body.email} is already in use by another user!`);
      } else {
        throw new Error(validBody.data);
      }
    } catch (error) {
      console.log(error.message);
      return { success: false, data: `Error adding account, ${error.message}` };
    }
  }

  getOne(id: string): CRUDReturn {
    if (this.users.has(id)) {
      return { success: true, data: this.users.get(id).toJson() };
    } else
      return {
        success: false,
        data: `User ${id} is not in database`,
      };
  }

  getAll(): CRUDReturn {
    var results: Array<any> = [];
    try {
      for (const user of this.users.values()) {
        results.push(user.toJson());
      }
      return { success: true, data: results };
    } catch (e) {
      return { success: false, data: e };
    }
  }

  searchUser(term: string): CRUDReturn {
    var results: Array<any> = [];
    for (const user of this.users.values()) {
      if (user.matches(term)) results.push(user.toJson());
    }
    return { success: results.length > 0, data: results };
  }

  replaceValuePut(id: string, body: any):CRUDReturn {
    try {
      if (this.users.has(id)) {
        var validBodyPut: { valid: boolean; data: string } =
          Helper.validBodyPut(body);
        if (validBodyPut.valid) {
          if (!this.emailExists(body.email, { exceptionId: id })) {
            var user: User = this.users.get(id);
            var success = user.replaceValues(body);
            if (success)
              return {
                success: success,
                data: user.toJson(),
              };
            else {
              throw new Error('Failed to update user in db');
            }
          } else {
            throw new Error(`${body.email} is already in use by another user!`);
          }
        } else {
          throw new Error(validBodyPut.data);
        }
      } else {
        throw new Error(`User ${id} is not in database`);
      }
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  replaceValuePatch(id: string, body: any):CRUDReturn {
    try {
      if (this.users.has(id)) {
        var validBodyPatch: { valid: boolean; data: string } =
          Helper.validBody(body);
        if (validBodyPatch.valid) {
          if (!this.emailExists(body.email, { exceptionId: id })) {
            var user: User = this.users.get(id);
            var success = user.replaceValues(body);
            if (success)
              return {
                success: success,
                data: user.toJson(),
              };
            else {
              throw new Error('Failed to update user in db');
            }
          } else {
            throw new Error(`${body.email} is already in use by another user!`);
          }
        } else {
          throw new Error(validBodyPatch.data);
        }
      } else {
        throw new Error(`User ${id} is not in database`);
      }
    } catch (error) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  deleteUser(id: string): CRUDReturn {
    if (this.users.has(id)) {
      return {
        success: this.users.delete(id),
        data: `User ${id} has been successfully removed`,
      };
    } else
      return {
        success: false,
        data: `User ${id} is not in database`,
      };
  }

  login(email: string, password: string) {
    for (const user of this.users.values()) {
      if (user.matches(email)) {
        console.log(email,password);
        return user.login(password);
      }
    }
    return { success: false, data: `${email} not found in database` };
  }

  //secondary functions
  emailExists(email: string, options?: { exceptionId: string }) {
    for (const user of this.users.values()) {
      if (user.matches(email)) {
        if (
          options?.exceptionId != undefined &&
          user.matches(options.exceptionId)
        )
          continue;
        else return true;
      }
    }
    return false;
  }

  saveToDB(user: User): boolean {
    try {
      this.users.set(user.id, user);
      return this.users.has(user.id);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  logAllUsers() {
    console.log(this.getAll());
  }
}
