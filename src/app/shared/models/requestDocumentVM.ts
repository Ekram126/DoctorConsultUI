export class CreateRequestDocumentVM {
    id: number
    title: string
    fileName: string
    requestTrackingId: number;
    requestFile: any;
}
export class EditRequestDocumentVM {
    id: number
    title: string
    fileName: string
    requestTrackingId: number;
}
export class ListRequestDocumentVM {
    id: number
    title: string
    fileName: string
    requestTrackingId: number
    requestName: string;
}