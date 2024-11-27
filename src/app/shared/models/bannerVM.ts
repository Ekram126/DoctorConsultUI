export class ListBannerVM {
    id:number;
    code: string;
    name: string;
    nameAr: string;
    brief: string;
    briefAr: string;
    bannerDate: string;
    specialistId: number;
    isActive: boolean;
    bannerImg: string; 
}


export class CreateBannerVM {
    id:number;
    code: string;
    name: string;
    nameAr: string;
    brief: string;
    briefAr: string;
    bannerDate: Date;
    strBannerDate: string;
    specialistId: number;
    isActive: boolean;
    bannerImg: string; 
    orderId:number;
}

export class EditBannerVM {
    id:number;
    code: string;
    name: string;
    nameAr: string;
    brief: string;
    briefAr: string;
    bannerDate: Date;
    strBannerDate: string;
    specialistId: number;
    isActive: boolean;
    bannerImg: string; 
    orderId:number;
   
}

export class ViewBannerVM {
    id:number;
    code: string;
    name: string;
    nameAr: string;
    brief: string;
    briefAr: string;
    bannerDate: string;
    specialistId: number;
    isActive: boolean;
    bannerImg: string; 
}

export class MainClass {
    results: ListBannerVM[];
    count: number;
}

export class SortAndFilterBannerVM {
    sortObj: SortBannerVM;
    searchObj: SearchBannerVM;
}
export class SortBannerVM {     sortBy: string;    sortStatus:string;}
export class SearchBannerVM { }

