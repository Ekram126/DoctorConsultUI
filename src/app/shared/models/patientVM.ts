export class ListPatientVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
    nationalId: string;
    dob: Date;
    strdob: string; 
    mobile: string;
    email: string;
    address: string;
    addressAr: string;
    genderId: number;
}

export class CreatePatientVM {
    code: string;
    name: string;
    nameAr: string;
    nationalId: string;
    dob: Date;
    strDob: string; 
    mobile: string;
    email: string;
    address: string;
    addressAr: string;
    genderId: number;
    countryId: number;
    passwordHash:string;
    userName:string;
}

export class EditPatientVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
    nationalId: string;
    dob: Date;
    strdob: string; 
    mobile: string;
    email: string;
    address: string;
    addressAr: string;
    genderId: number;
    countryId: number;  
}

export class GeneratedPatientNumberVM {
    patientCode: string;
}





export class MainClass {
    results: ListPatientVM[];
    count: number;
}

export class SortAndFilterPatientVM {
    sortObj: SortPatientVM;
    searchObj: SearchPatientVM;
}
export class SortPatientVM{  sortBy: string;    sortStatus:string;}
export class SearchPatientVM{
    userId:string;
}



