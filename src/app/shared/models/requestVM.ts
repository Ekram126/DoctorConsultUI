import { ListRequestDocumentVM } from "./requestDocumentVM";
import { ListRequestTrackingVM } from "./requestTrackingVM";

export class GeneratedRequestNumberVM {
    requestCode: string;
}


export class CreateRequestVM {
    id? :number;
    subject: string;
    requestCode: string;
    complain: string;
    requestDate: Date;
    strRequestDate: string;
    createdById: string;
    specialityId:number;
}

export class RequestVM {
    id? :number;
    subject: string;
    requestCode: string;
    complain: string;
    requestDate: Date;
    strRequestDate: string;
    createdById: string;
    userName:string;  
    specialityId:number;
    specialityName: string;
    specialityNameAr: string;
    listDocuments:ListRequestDocumentVM[];
}


export class ListRequestVM {
    id? :number;
    advice:string;
    specialityName: string;
    specialityNameAr: string;
    listTracks?:ListRequestTrackingVM[]
}


export class MainClass {
    results?: ListRequestVM[];
    count?: number;
}

export class SortAndFilterRequestVM {
    sortObj?: SortRequestVM;
    searchObj?: SearchRequestVM;
}
export class SortRequestVM{sortBy: string;    sortStatus:string;}
export class SearchRequestVM{userId:string;statusId:number;specialityId:number}



