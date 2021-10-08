import * as admin from "firebase-admin";

import { CRUDReturn } from "./user.resource/crud_return.interface";
import { Helper } from "./user.resource/helper";
import { Injectable } from "@nestjs/common";
import { User } from "./user.resource/user.model";

const DEBUG: boolean = true;
@Injectable()
export class UserService {
  private DB = admin.firestore();
  constructor() {}

  // advanced version
  async resetDatabase(): Promise<boolean> {
    try {
      var currentDbState = await this.DB.collection("users").get();
      if (currentDbState.empty) return true;
      else {
        var batchOps: Array<Promise<any>> = [];
        for (const doc of currentDbState.docs) {
          batchOps.push(doc.ref.delete());
        }
        //running all delete in one go;
        await Promise.all(batchOps);
        for (const user of Helper.populate().values()) {
          batchOps.push(this.saveToDB(user));
        }
        //runs all the create in one go;
        await Promise.all(batchOps);
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  //the slowed down version
  //running the await in a for loop allows it to behave properly in await mode
  //running it in a forEach does not operate as expected to wait for each await before moving on
  async resetDatabaseBasic(): Promise<boolean> {
    try {
      var currentDbState = await this.DB.collection("users").get();
      if (currentDbState.empty) return true;
      else {
        for (const doc of currentDbState.docs) {
          await doc.ref.delete();
        }
        for (const user of Helper.populate().values()) {
          await this.saveToDB(user);
        }
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async register(body: any): Promise<CRUDReturn> {
    try {
      var validBody: { valid: boolean; data: string } =
        Helper.validBodyPut(body);
      if (validBody.valid) {
        var exists = await this.emailExists(body.email);
        console.log(`Does ${body.email} exist in db? ${exists}`);
        if (!exists) {
          var newUser: User = new User(
            body.name,
            body.age,
            body.email,
            body.password
          );
          if (await this.saveToDB(newUser)) {
            // if (DEBUG) await this.logAllUsers();
            return {
              success: true,
              data: newUser.toJson(),
            };
          } else {
            throw new Error("generic database error");
          }
        } else
          throw new Error(`${body.email} is already in use by another user!`);
      } else {
        throw new Error(validBody.data);
      }
    } catch (error) {
      console.log("RegisterError");
      console.log(error.message);
      return { success: false, data: `Error adding account, ${error}` };
    }
  }

  async getOne(id: string): Promise<CRUDReturn> {
    try {
      var result = await this.DB.collection("users").doc(id).get();
      if (result.exists) {
        return {
          success: true,
          data: result.data(),
        };
      } else {
        return {
          success: false,
          data: `User ${id} does not exist in database!`,
        };
      }
    } catch (error) {
      console.log("Get one error");
      console.log(error.message);
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async getAll(): Promise<CRUDReturn> {
    var results: Array<any> = [];
    try {
      var allUsers = await this.getAllUserObjects();
      allUsers.forEach((user) => {
        results.push(user.toJson(true));
      });
      return { success: true, data: results };
    } catch (e) {
      return { success: false, data: e };
    }
  }

  async getAllUserObjects(): Promise<Array<User>> {
    var results: Array<User> = [];
    try {
      var dbData: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
        await this.DB.collection("users").get();
      dbData.forEach((doc) => {
        if (doc.exists) {
          var data = doc.data();
          results.push(
            new User(
              data["name"],
              data["age"],
              data["email"],
              data["password"],
              doc.id
            )
          );
        }
      });
      return results;
    } catch (e) {
      return null;
    }
  }

  async searchUser(term: string): Promise<CRUDReturn> {
    try {
      var results: Array<any> = [];
      var users: Array<User> = await this.getAllUserObjects();
      for (const user of users.values()) {
        if (user.matches(term)) results.push(user.toJson());
      }
      return { success: results.length > 0, data: results };
    } catch (error) {
      console.log(error.message);
      return { success: false, data: error.message, };
    }
  }

  async replaceValuePut(id: string, body: any): Promise<CRUDReturn> {
    try {
      var user: User = await User.retrieve(id);
      if (user != null) {
        var validBodyPut: { valid: boolean; data: string } =
          Helper.validBodyPut(body);
        if (validBodyPut.valid) {
          var exists = await this.emailExists(body.email, { exceptionId: id });
          if (!exists) {
            var success = user.replaceValues(body);
            await user.commit(false);
            if (success)
              return {
                success: success,
                data: user.toJson(),
              };
            else {
              throw new Error("Failed to update user in db");
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
      console.log("PutError");
      console.log(error.message);
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async replaceValuePatch(id: string, body: any): Promise<CRUDReturn> {
    try {
      var user: User = await User.retrieve(id);
      if (user != null) {
        var validBodyPatch: { valid: boolean; data: string } =
          Helper.validBody(body);
        if (validBodyPatch.valid) {
          if (body.email != undefined) {
            var exists = await this.emailExists(body.email, {
              exceptionId: id,
            });
            if (exists) {
              throw new Error(
                `${body.email} is already in use by another user!`
              );
            }
          }
          var success = user.replaceValues(body);
          console.log(user.toJson(false));
          await user.commit(false);
          if (success) {
            return {
              success: success,
              data: user.toJson(),
            };
          } else {
            throw new Error("Failed to update user");
          }
        } else {
          throw new Error(validBodyPatch.data);
        }
      } else {
        throw new Error(`User ${id} is not in database`);
      }
    } catch (error) {
      console.log("PatchError");
      console.log(error.message);
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async deleteUser(id: string): Promise<CRUDReturn> {
    try {
      var user: User = await User.retrieve(id);
      if (user != null) {
        var success: boolean = await user.delete();
        return {
          success: success,
          data: `User ${id} has been successfully removed`,
        };
      } else
        return {
          success: false,
          data: `User ${id} is not in database`,
        };
    } catch (error) {
      console.log("DeleteError");
      console.log(error.message);
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async login(email: string, password: string): Promise<CRUDReturn> {
    try {
      var user: User = await User.retrieveViaEmail(email);
      if (user != null) {
        return user.login(password);
      } else {
        return { success: false, data: `${email} not found in database` };
      }
    } catch (error) {
      console.log("Login error");
      console.log(error.message);
      return { success: false, data: error.message, };
    }
  }

  //secondary functions
  async emailExists(
    email: string,
    options?: { exceptionId: string }
  ): Promise<boolean> {
    try {
      var userResults = await this.DB.collection("users")
        .where("email", "==", email)
        .get();
      console.log("Are the user results empty?");
      console.log(userResults.empty);
      if (userResults.empty) return false;
      for (const doc of userResults.docs) {
        console.log(doc.data());
        console.log("Are the options defined?");
        console.log(options != undefined);
        if (options != undefined) {
          if (doc.id == options?.exceptionId) continue;
        }
        if (doc.data()["email"] === email) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    } catch (error) {
      console.log("Email exists subfunction error");
      console.log(error.message);
      return false;
    }
  }

  async saveToDB(user: User): Promise<boolean> {
    console.log(`Attempting to save user ${user.id} ${user.email}`);
    try {
      var result = await user.commit(false);
      return result.success;
    } catch (error) {
      console.log("Save to db error");
      console.log(error.message);
      return false;
    }
  }

  async logAllUsers() {
    console.log(await this.getAll());
  }
}
