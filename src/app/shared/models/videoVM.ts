export class ListVideoVM {
    id: number;
    title: string;
    titleAr: string;
    articleImg: string;
    date: string;
    orderId: number;
    specialityName: string;
    specialityNameAr: string;
    isActive:boolean;
     videoURL:string;
}


export class CreateVideoVM {
    id: number;
    videoURL:string;
    title: string;
    titleAr: string;
    date: string;
    artDate?:Date;
    orderId: number;
    specialityId:number;
    brief:string;
    briefAr:string;
    isActive:boolean;
}

export class EditVideoVM {
    id: number;
    videoURL:string;
    title: string;
    titleAr: string;
    articleImg: string;
    date: string;
    videoDate?:Date;
    orderId: number;
    specialityId:number;
    brief:string;
    briefAr:string;
    isActive:boolean;
}


export class ViewVideoVM {
    id: number;
    title: string;
    titleAr: string;
    articleImg: string;
    date: string;
    orderId: number;
    specialityName: string;
    specialityNameAr: string;
    isActive:boolean;   
    videoURL:string;
    brief:string;
    briefAr:string;
}

export class MainClass {
    results: ListVideoVM[];
    count: number;
}

export class SortAndFilterVideoVM {
    sortObj: SortVideoVM;
    searchObj: SearchVideoVM;
}
export class SortVideoVM {sortBy:string; sortStatus:string }
export class SearchVideoVM { }

