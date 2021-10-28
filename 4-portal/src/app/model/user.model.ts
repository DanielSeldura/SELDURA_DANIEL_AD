export class User {
  public id: string;
  public name: string;
  public age: number;
  public email: string;

  constructor(name: string, age: number, email: string, id: string) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.email = email;
  }

  static fromJson(id: string, json: any): User | null {
    try {
      return new User(json.name, json.age, json.email, id);
    } catch (error) {
      console.log(error);
      return null;
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
