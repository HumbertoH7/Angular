import { ErrorHandler } from './../app.error-handler';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, catchError  } from 'rxjs/operators';
import { CATALOGO_API } from '../app.api';
import { Eventos } from './evento.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CalendarService {
    // private url = '/api/v1/catalog';
    private url = `${CATALOGO_API}/newevent`;

    constructor(private http: HttpClient, private httppost: Http) { }

    public sendPostRequest(postData: any, pathUrl) {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        console.log(postData);
        console.log(this.url);

        const requestOptions = new RequestOptions({ headers: headers });
        console.log(requestOptions);

        this.httppost.post(`${this.url}`, postData, requestOptions)
        .subscribe(data => {
            console.log(data['_body']);
        }, error => {
            console.log(error);
        });
     }
     
async getEvents(): Observable<Eventos>  {
        const response = await this.http.get<Eventos>(`${CATALOGO_API}/events`).toPromise();
        return response;
        }
     
 getEvent(): Observable<Eventos> {
    return this.http.get<Eventos>(`${CATALOGO_API}/events`)
    .pipe((delay(2000))
    )
 }
}