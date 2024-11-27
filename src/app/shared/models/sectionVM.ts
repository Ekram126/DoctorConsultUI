export class ListSectionVM {
    id: number;
    title: string;
    titleAr: string;
    brief: string;
    briefAr: string;
    sectionDesc:string;
    sectionDescAr:string;
    sectionImg: string;


    safeHtml?: any;
    arabicSafeHtml?: any;

}


export class CreateSectionVM {
    id: number;
    title: string;
    titleAr: string;
    brief: string;
    briefAr: string;
    sectionDesc:string;
    sectionDescAr:string;
    sectionImg: string;
    isInAbout:boolean;
}

export class EditSectionVM {
    id: number;
    title: string;
    titleAr: string;
    brief: string;
    briefAr: string;
    sectionDesc:string;
    sectionDescAr:string;
    sectionImg: string;
    isInAbout:boolean;
}


export class ViewSectionVM {
    id: number;
    title: string;
    titleAr: string;
    brief: string;
    briefAr: string;
    sectionImg: string;
}

export class MainClass {
    results: ListSectionVM[];
    count: number;
}

export class SortAndFilterSectionVM {
    sortObj: SortSectionVM;
    searchObj: SearchSectionVM;
}
export class SortSectionVM { sortBy: string; sortStatus: string }
export class SearchSectionVM {
    title: string;
    titleAr: string;
}

