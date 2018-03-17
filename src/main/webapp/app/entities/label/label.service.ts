import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { Label } from './label.model';

type EntityResponseType = HttpResponse<Label>;
type EntityArrayResponseType = HttpResponse<Label[]>;

@Injectable()
export class LabelService {

    private resourceUrl =  SERVER_API_URL + 'api/labels';

    constructor(private http: HttpClient) { }

    create(label: Label): Observable<EntityResponseType> {
            return this.http.post<Label>(this.resourceUrl,
label,
                    { observe: 'response' })
;
    }

    update(label: Label): Observable<EntityResponseType> {
            return this.http.put<Label>(this.resourceUrl,
label,
                    { observe: 'response' })
;
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Label>(`${this.resourceUrl}/${id}`, { observe: 'response'})
;
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<Label[]>(this.resourceUrl, { params: options, observe: 'response' })
;
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }




}
