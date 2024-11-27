import { count } from "rxjs";


export class CreateRequestTrackingVM {
  id?: number;
  advice: string;
  respondDate: Date;
  strRespondDate:string;
  statusId: number;
  requestId: number;
  createdById: string;
  assignTo:string;
}

// export class EditRequestTrackingVM {
//   id: number;
//   description: string;
//   descriptionDate: Date;
//   requestStatusId: number;
//   requestId: number;
//   createdById: string;
// }

 export class ListRequestTrackingVM {
  id?: number;
  advice: string;
  responseDate: string;
  statusId: number;
  requestId: number;
  createdById: string;
  assignTo:string;
  statusName:string;
  statusNameAr:string;
  assignedToUser:string;
  createdByName:string;
}

export class MainClass{
 results :ListRequestTrackingVM[];
 count:number;
}