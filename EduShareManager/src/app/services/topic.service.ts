import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../modals/topic';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
private apiUrl = 'http://localhost:5066/api/Topic';

  constructor(private http: HttpClient) {}

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl);
  }
  addTopic(topic: Partial<Topic>): Observable<Topic> {
    return this.http.post<Topic>(this.apiUrl, topic);
  }
  updateTopic(id: number, topic: Partial<Topic>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, topic);
  }
  deleteTopic(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
