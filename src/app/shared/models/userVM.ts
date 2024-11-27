

export class User {
    userName?: string;
    passwordHash?: string;
}
export class LoggedUser {
    id?: string;
    userName?: string;
    token?: string;
    roleNames: any[];
    message: string;
    passwordHash: string;
    email: string;
    phoneNumber?: string;
    specialityId:number;

}

export class ListUserRoleVM {
    name: string;
}

export class ListUserVM {
    id: string;
    userName: string;
    phoneNumber: string;
    email: string
}