export class ListDoctorVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
    email: string;
    mobile: string;
    dob: string;
    nationalId: string;
    gender: string;
    specialityName: string;
    specialityNameAr: string;
    supervisorDoctor: String;
     doctorImg: string;
    isActive: boolean;
    joinDate: string;
}


export class CreateDoctorVM {
    code: string;
    name: string;
    nameAr: string;
    email: string;
    mobile: string;
    dob: Date;
    joinDate: Date;
    gradDate: Date;

    strdob: string;
    strJoinDate: string;
    strGradDate: string;

    nationalId: string;
    genderId: number;
    specialistId: number;
    remarks: string;
    address: string;
    addressAr: string;
    isActive: boolean;
    parentId: number;
    userRole: string;
    passwordHash: string;
    userName: string;
    doctorImg: string;
    id:number;
}

export class EditDoctorVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
    email: string;
    mobile: string;
 
    nationalId: string;
    genderId: number;
    specialistId: number;
    remarks: string;
    address: string;
    addressAr: string;
   
    dob: Date;
    joinDate: Date;
    gradDate:Date;
    strdob: string;
    strJoinDate: string;
    strGradDate: string;
    doctorImg: string;
    isActive: boolean;

    parentId:number; 
    userRole: string;
    passwordHash: string; 
    userName: string;

}

export class ViewDoctorVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
    email: string;
    mobile: string;
    dob: string;
    nationalId: string;
    gender: string;
    specialityName: string;
    specialityNameAr: string;
    supervisorDoctor: String;
    doctorImg: string;
     joinDate: string;
    gradDate: string;
     isActive: boolean;
     remarks: string;
     address: string;
     addressAr: string;
     genderId:number;
}

export class MainClass {
    results: ListDoctorVM[];
    count: number;
}

export class SortAndFilterDoctorVM {
    sortObj: SortDoctorVM;
    searchObj: SearchDoctorVM;
}
export class SortDoctorVM {     sortBy: string;    sortStatus:string;}
export class SearchDoctorVM { }

export class DoctorUserRole {
    roleName: String;
    specialityId: number;
}
