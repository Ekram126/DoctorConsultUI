export class ListArticleVM {
    id: number;
    title: string;
    titleAr: string;
    articleImg: string;
    date: string;
    orderId: number;
    specialityName: string;
    specialityNameAr: string;
    isActive:boolean;
}


export class CreateArticleVM {
    id: number;
    title: string;
    titleAr: string;
    articleImg: string;
    date: string;
    artDate?:Date;
    orderId: number;
    specialityId:number;
    articleContent:string;
    articleContentAr:string;
    isActive:boolean;
    articleDesc:string;
    articleDescAr:string;
}

export class EditArticleVM {
    id: number;
    title: string;
    titleAr: string;
    articleImg: string;
    date: string;
    orderId: number;
    specialityId:number;
    articleContent:string;
    articleContentAr:string;
    isActive:boolean;
    articleDesc:string;
    articleDescAr:string;
}


export class ViewArticleVM {
    id: number;
    title: string;
    titleAr: string;
    articleImg: string;
    date: string;
    orderId: number;
    specialityName: string;
    specialityNameAr: string;
    articleContent:string;
    articleContentAr:string;
    isActive:boolean;
    articleDesc:string;
    articleDescAr:string;
}

export class MainClass {
    results: ListArticleVM[];
    count: number;
}

export class SortAndFilterArticleVM {
    sortObj: SortArticleVM;
    searchObj: SearchArticleVM;
}
export class SortArticleVM { sortBy:string; sortStatus:string}
export class SearchArticleVM { 
      title: string;
    titleAr: string;
    specialityId:number; 
    isActive:boolean;
    end: string;
    start:string;

    endDate: Date;
    startDate:Date;
}

