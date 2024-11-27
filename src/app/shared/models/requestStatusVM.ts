export class IndexRequestStatus {
    id: number
    name: string;
    nameAr: string;
    color: string;
    icon: string;

    countOpen: number;
    countClose: number;
    countInProgress: number;
    countSolved: number;
    countApproved: number;
    countAll: number;
    listStatus: RequestStatus[];
}

export class CreateRequestStatus {
    id: number
    name: string;
    nameAr: string;
    color: string;
    icon: string;
}


export class EditRequestStatus {
    id: number
    name: string;
    nameAr: string;
    color: string;
    icon: string;
}
export class RequestStatus {
    id: number
    name: string;
    nameAr: string;
    color: string;
    icon: string;
}


export class SortRequestStatusesVM {
    id: number;
    code: string;
    name: string;
    nameAr: string;
    sortStatus: string;
}

export class MainClass {
    countOpen: number;
    countClosed: number;
    countInProgress: number;
    countSolved: number;
    countAll: number;
    countApproved: number;
    listStatus: IndexRequestStatus[];
}