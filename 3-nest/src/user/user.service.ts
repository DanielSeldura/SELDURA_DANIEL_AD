import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {

    private users: Map<number,User> = new Map<number,User>();

    constructor(){
        this.populate();
    }

    getAll(){
       var populatedData = [];
       for(const user of this.users.values()){
           populatedData.push(user.toJson());
       }
       return populatedData;
    }

    populate(){
        this.users.set(1,new User(1,"James",18,"james@email.com","123456"));
        this.users.set(2,new User(2,"John",18,"john@email.com","143441"));
        this.users.set(3,new User(3,"Luke",18,"luke@email.com","654321"));
        this.users.set(4,new User(4,"Judas",13,"judas@email.com","696969"));
    }

}
