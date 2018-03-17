import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';
import { BankAccount } from './bank-account.model';

type EntityResponseType = HttpResponse<BankAccount>;
type EntityArrayResponseType = HttpResponse<BankAccount[]>;

@Injectable()
export class BankAccountService {

    private resourceUrl =  SERVER_API_URL + 'api/bank-accounts';

    constructor(private http: HttpClient) { }

    create(bankAccount: BankAccount): Observable<EntityResponseType> {
            return this.http.post<BankAccount>(this.resourceUrl,
bankAccount,
                    { observe: 'response' })
;
    }

    update(bankAccount: BankAccount): Observable<EntityResponseType> {
            return this.http.put<BankAccount>(this.resourceUrl,
bankAccount,
                    { observe: 'response' })
;
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BankAccount>(`${this.resourceUrl}/${id}`, { observe: 'response'})
;
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<BankAccount[]>(this.resourceUrl, { params: options, observe: 'response' })
;
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }




}
