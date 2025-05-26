import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { File } from '../modals/file';


@Injectable({
  providedIn: 'root'
})

export class FileService {
  private apiUrl = 'http://localhost:5066/api/File';

  constructor(private http: HttpClient) {}

  getAllFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.apiUrl);
  }

  getFilesByFolder(folderId: number): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/folder/${folderId}`);
  }

  getDownloadUrl(fileName: string): Observable<{Url: string}> {
    return this.http.get<{Url: string}>(`${this.apiUrl}/download/${fileName}`);
  }

  deleteFile(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ...ועוד פעולות לפי הצורך
}
