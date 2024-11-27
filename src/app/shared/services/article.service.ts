import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateArticleVM, EditArticleVM, ListArticleVM, MainClass, SortAndFilterArticleVM, ViewArticleVM } from '../models/articleVM';



@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };



  GetArticles(): Observable<ListArticleVM[]> {
    return this.httpClient.get<ListArticleVM[]>(`${environment.listAllArticles}`, this.httpHeader);
  }

  listActivatedArticles(): Observable<ListArticleVM[]> {
    return this.httpClient.get<ListArticleVM[]>(`${environment.listActivatedArticles}`, this.httpHeader);
  }


  GetActivatedArticlesBySpecialityId(specialityId:number): Observable<ListArticleVM[]> {
    return this.httpClient.get<ListArticleVM[]>(`${environment.GetActivatedArticlesBySpecialityId}${specialityId}`, this.httpHeader);
  }

  
  GetAllArticles(data: SortAndFilterArticleVM, pageNumber: number, pageSize: number): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.listArticles}${pageNumber}/${pageSize}`,data, this.httpHeader);
  }

  GetArticleById(id: number): Observable<EditArticleVM> {
    return this.httpClient.get<EditArticleVM>(`${environment.getArticleById}${id}`, this.httpHeader);
  }

  ViewArticleById(id: number): Observable<ViewArticleVM> {
    return this.httpClient.get<ViewArticleVM>(`${environment.getArticleById}${id}`, this.httpHeader);
  }



  CreateArticle(ArticleVM: CreateArticleVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.addArticle}`, ArticleVM, this.httpHeader);
  }

  UpdateArticle(ArticleVM: EditArticleVM): Observable<EditArticleVM> {
    return this.httpClient.put<EditArticleVM>(`${environment.editArticle}`, ArticleVM, this.httpHeader);
  }

  DeleteArticle(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.deleteArticle}${id}`, this.httpHeader);
  }


  UpdateArticleImageAfterInsert(modelObj: CreateArticleVM): Observable<number> {
    return this.httpClient.put<number>(`${environment.updateArticleImageAfterInsert}`, modelObj, this.httpHeader);
  }
  
}
