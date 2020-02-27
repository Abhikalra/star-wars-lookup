import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { HttpParams, HttpErrorResponse } from '@angular/common/http'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '.././../environments/environment.develop';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  protected baseUrl = environment.baseURL
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get default HTTP headers
   * @param searchParams Optional query params
   */
  private defaultOptions(searchParams?: any): any {
    let headers = new HttpHeaders()
    const options: any = { headers: headers }
    if (searchParams) options.params = searchParams
    options.observe = 'response'
    return options
  }

  /**
   * Handle Errors returned from API
   * @param error 
   */
  protected handleError(error: HttpErrorResponse | any) {
    let errMsg: string
    if (error instanceof HttpErrorResponse) {
      if (error.error.message) {
        errMsg = error.error.message
      }
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    return observableThrowError(errMsg)
  }

  /**
   * Gets lits of characters and ids
   * @param name Name of character
   */
  getListOfPeople(name?: string): Observable<any> {
    let reqInstance = this.httpClient.get(`${this.baseUrl}get-starwars-info/people`, this.defaultOptions())
    if (name) {
      let params = new HttpParams();
      params = params.append('name', name)
      reqInstance = this.httpClient.get(`${this.baseUrl}get-starwars-info/people`, this.defaultOptions(params))
    }
    return reqInstance.pipe(map((res: any) => {
      return res.body || {}
    }), catchError(this.handleError))
  }

  /**
   * Gets summary information on the Star Wars Character
   * @param id ID of the Star Wars person resource
   */
  getPersonInformationById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}get-starwars-info/people/${id}`, this.defaultOptions()).pipe(map((res: any) => {
      return res.body || {}
    }), catchError(this.handleError))
  }

}
