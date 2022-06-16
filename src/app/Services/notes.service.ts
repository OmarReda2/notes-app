import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient: HttpClient) { }

  baseUrl = 'https://routeegypt.herokuapp.com/';

  getAllNotes(data: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'getUserNotes', data)
  }

  addNote(data: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'addNote', data)
  }

  UpdateNote(data: any): Observable<any> {
    return this._HttpClient.put(this.baseUrl + 'updateNote', data)
  }

  deleteNote(data: any): Observable<any> {
    let options={
      headers: new HttpHeaders({

      }),

      body:{
        NoteID:data.NoteID,
        token:data.token

      }
    }
    return this._HttpClient.delete(this.baseUrl + 'deleteNote', options)
  }
}
