export class User {
  private id: number;
  private name: string;
  private age: number;
  private email: string;
  private password: string;

  constructor(
    id: number,
    name: string,
    age: number,
    email: string,
    password: string,
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.email = email;
    this.password = password;
  }

  login(password: string) {
    if (this.password === password) {
      return { success: true, message: `${this.email} logged in successfully` };
    } else
      return {
        success: false,
        message: `${this.email} login fail, password does not match`,
      };
  }

  static validBody(body: any): { valid: boolean; error: string } {
    try {
      var keys: Array<string> = Helper.describeClass(User);
      for (const key of Object.keys(body)) {
        if (!keys.includes(`${key}`)) {
          return { valid: false, error: `${key} is not a valid attribute` };
        }
      }
      return { valid: true, error: null };
    } catch (error) {
      return { valid: true, error: error };
    }
  }

  static validBodyPut(body: any): { valid: boolean; error: string } {
    try {
      var keys: Array<string> = Helper.describeClass(User);
      keys = Helper.removeItemOnce(keys, 'id');
      for (const key of Object.keys(body)) {
        if (keys.includes(`${key}`)) {
          keys = Helper.removeItemOnce(keys, key);
        }
      }
      if (keys.length > 0) {
        return { valid: false, error: `Payload is missing ${keys}` };
      }
      return { valid: true, error: null };
    } catch (error) {
      return { valid: true, error: error };
    }
  }

  patch(body: any): { valid: boolean; error: string } {
    try {
      var keys: Array<string> = Helper.describeClass(User);
      keys = Helper.removeItemOnce(keys, 'id');
      for (const key of Object.keys(body)) {
        if (keys.includes(`${key}`)) {
          this[key] = body[key];
        }
      }
      return { valid: true, error: null };
    } catch (error) {
      return { valid: true, error: error };
    }
  }

  matches(term: string): boolean {
    var keys: Array<string> = Helper.describeClass(User);
    for (const key of keys) {
      if (this[key] == term) return true;
    }
    return false;
  }

  log() {
    console.log(`${this.name}:${this.age}:${this.email}`);
    //return true or false
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

class Helper {
  //returns an array of attributes as defined in the class
  static describeClass(typeOfClass: any): Array<any> {
    let a = new typeOfClass();
    let array = Object.getOwnPropertyNames(a);
    return array;
  }

  //removes an item matching the value from the array
  static removeItemOnce(arr: Array<any>, value: any): Array<any> {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
}
