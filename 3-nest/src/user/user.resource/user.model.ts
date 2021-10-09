import * as admin from "firebase-admin";

import { CRUDReturn } from "./crud_return.interface";
import { Helper } from "./helper";

export class User {
  public id: string;
  private name: string;
  private age: number;
  public email: string;
  private password: string;

  constructor(
    name: string,
    age: number,
    email: string,
    password: string,
    id?: string
  ) {
    if (id != undefined) {
      this.id = id;
    } else {
      this.id = Helper.generateUID();
    }
    this.name = name;
    this.age = age;
    this.email = email;
    this.password = password;
  }

  static async retrieve(id: string): Promise<User> {
    try {
      var DB = admin.firestore();
      var result = await DB.collection("users").doc(id).get();
      if (result.exists) {
        var data = result.data();
        return new User(
          data["name"],
          data["age"],
          data["email"],
          data["password"],
          result.id
        );
      } else {
        return null;
      }
    } catch (error) {
      console.log("User.retrieve error");
      console.log(error.message);
      return null;
    }
  }

  static async retrieveViaEmail(email: string): Promise<User> {
    var DB = admin.firestore();
    var userResults = await DB.collection("users")
      .where("email", "==", email)
      .get();
    if (userResults.empty) return null;
    for (const doc of userResults.docs) {
      var data = doc.data();
      return new User(
        data["name"],
        data["age"],
        data["email"],
        data["password"],
        doc.id
      );
    }
  }

  async delete(): Promise<boolean> {
    try {
      var DB = admin.firestore();
      await DB.collection("users").doc(this.id).delete();
      return true;
    } catch (error) {
      console.log("User.delete error");
      console.log(error.message);
      return false;
    }
  }
  //I preset hidePassword just in case I forget to set the value when calling it
  async commit(hidePassword: boolean = true): Promise<CRUDReturn> {
    try {
      var DB = admin.firestore();
      var result = await DB.collection("users").doc(this.id).set(this.toJson(hidePassword));
      return {
        success: true,
        data: this.toJson(true),
      };
    } catch (error) {
      console.log("User.committ error message");
      console.log(error.message);
      return { success: false, data: error.message, };
    }
  }
  //hidePassword is used to return data without the id
  toJson(hidePassword: boolean = true): {
    id?: string;
    name: string;
    age: number;
    email: string;
    password?: string;
  } {
    if (hidePassword)
      return {
        id: this.id,
        name: this.name,
        age: this.age,
        email: this.email,
      };
    return {
      name: this.name,
      age: this.age,
      email: this.email,
      password: this.password,
    };
  }

  login(password: string): CRUDReturn {
    console.log(`current password ${this.password}, attempt: ${password}`);
    try {
      if (this.password === password) {
        return { success: true, data: this.toJson() };
      } else {
        throw new Error(`${this.email} login fail, password does not match`);
      }
    } catch (error) {
      return { success: false, data: error.message, };
    }
  }

  matches(term: string): boolean {
    var keys: Array<string> = Helper.describeClass(User);
    keys = Helper.removeItemOnce(keys, "password");
    for (const key of keys) {
      if (`${this[key]}` === term) return true;
    }
    return false;
  }

  replaceValues(body: any): boolean {
    try {
      var keys: Array<string> = Helper.describeClass(User);
      keys = Helper.removeItemOnce(keys, "id");
      for (const key of Object.keys(body)) {
        this[key] = body[key];
      }
      return true;
    } catch (error) {
      console.log("User.replaceValues error");
      console.log(error.message);
      return false;
    }
  }

  log() {
    console.log(this.toJson());
  }


}
