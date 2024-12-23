export class ListSpecialistVM {
    id: number;
    code: number;
    name: string;
    nameAr: string;
    svgIcon: string;
    pngIcon: string;
    isActive:boolean;
}

export class CreateSpecialistVM {
    code: number;
    name: string;
    nameAr: string;
    pngIcon:string;
    isActive:boolean;
}

export class EditSpecialistVM {
    id: number;
    code: number;
    name: string;
    nameAr: string;
    pngIcon:string;
    isActive:boolean;
}

export class ViewSpecialistVM {
    id: number;
    code: number;
    name: string;
    nameAr: string;
    pngIcon:string;
    isActive:boolean;
}






export class MainClass {
    results: ListSpecialistVM[];
    count: number;
}

export class SortAndFilterSpecialistVM {
    sortObj: SortSpecialistVM;
    searchObj: SearchSpecialistVM;
}
export class SortSpecialistVM {
    code: number;
    name: string;
    nameAr: string;
    sortBy: string;
    sortStatus:string;
}
export class SearchSpecialistVM {
    id: number;
    code: number;
    
    name: string;
    nameAr: string;
}

