import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }


  private url(requestParmeter: Partial<RequestParameters>) {

    return `${requestParmeter.baseUrl ? requestParmeter.baseUrl : this.baseUrl}/${requestParmeter.controller}${requestParmeter.action ? `/ ${requestParmeter.action}` : ""}`;

  }

  get<T>(requestParmeter: Partial<RequestParameters>, id?: string): Observable<T> {

    let url: string = "";

    if (requestParmeter.fullEndPoint)
      requestParmeter.fullEndPoint;

    else
      url = `${this.url(requestParmeter)}${id ? `/${id}` : ""}`;

    return this.httpClient.get<T>(url, { headers: requestParmeter.headers })


  }


  post<T>(requestParmeter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {

    let url: string = "";
    if (requestParmeter.fullEndPoint)
      url = requestParmeter.fullEndPoint;
    else
      url = `${this.url(requestParmeter)}`;

    return this.httpClient.post<T>(url, body, { headers: requestParmeter.headers });


  }
  put<T>(requestParmeter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (requestParmeter.fullEndPoint)
      url = requestParmeter.fullEndPoint;
    else
      url = `${this.url(requestParmeter)}`;

    return this.httpClient.put<T>(url, body, { headers: requestParmeter.headers });
  }

  delete<T>(requestParmeter: Partial<RequestParameters>, id: string) : Observable<T> {
let url: string = "";
    if (requestParmeter.fullEndPoint)
      url = requestParmeter.fullEndPoint;
    else
      url = `${this.url(requestParmeter)}/${id}`;

    return this.httpClient.delete<T>(url, { headers: requestParmeter.headers });

   }
}

export class RequestParameters {
  controller?: string;
  action?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}
