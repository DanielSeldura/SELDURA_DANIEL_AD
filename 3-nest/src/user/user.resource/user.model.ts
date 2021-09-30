import { CRUDReturn } from './crud_return.interface';
import { Helper } from './helper';
export class User {
  public id: string;
  private name: string;
  private age: number;
  private email: string;
  private password: string;

  constructor(name: string, age: number, email: string, password: string) {
    this.id = Helper.generateUID();
    this.name = name;
    this.age = age;
    this.email = email;
    this.password = password;
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
      return { success: false, data: error.message };
    }
  }

   matches(term: string): boolean {
    var keys: Array<string> = Helper.describeClass(User);
    keys = Helper.removeItemOnce(keys, 'password');
    for (const key of keys) {
      if (`${this[key]}` === term) return true;
    }
    return false;
  }

  replaceValues(body: any): boolean {
    try {
      var keys: Array<string> = Helper.describeClass(User);
      keys = Helper.removeItemOnce(keys, 'id');
      for (const key of Object.keys(body)) {
        this[key] = body[key];
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  log() {
    console.log(this.toJson());
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      email: this.email,
    };
  }
}
