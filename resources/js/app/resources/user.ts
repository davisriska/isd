import {Resource} from "./resource";

export class User extends Resource {

    id: number;
    username: string;

    constructor(object: User = <User>{}) {
        super('User');

        Object.assign(this, object);
    }

}
