import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBankAccount } from 'app/shared/model/bank-account.model';
import { BankAccountPopupService } from './bank-account-popup.service';
import { BankAccountService } from './bank-account.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-bank-account-dialog',
  templateUrl: './bank-account-dialog.component.html'
})
export class BankAccountDialogComponent implements OnInit {
  private _bankAccount: IBankAccount;
  isSaving: boolean;

  users: IUser[];

  constructor(
    public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
    private bankAccountService: BankAccountService,
    private userService: UserService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.userService.query().subscribe(
      (res: HttpResponse<IUser[]>) => {
        this.users = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    if (this.bankAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.bankAccountService.update(this.bankAccount));
    } else {
      this.subscribeToSaveResponse(this.bankAccountService.create(this.bankAccount));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IBankAccount>>) {
    result.subscribe((res: HttpResponse<IBankAccount>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: IBankAccount) {
    this.eventManager.broadcast({ name: 'bankAccountListModification', content: 'OK' });
    this.isSaving = false;
    this.activeModal.dismiss(result);
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
  get bankAccount() {
    return this._bankAccount;
  }

  set bankAccount(bankAccount: IBankAccount) {
    this._bankAccount = bankAccount;
  }
}

@Component({
  selector: 'jhi-bank-account-popup',
  template: ''
})
export class BankAccountPopupComponent implements OnInit, OnDestroy {
  routeSub: any;

  constructor(private route: ActivatedRoute, private bankAccountPopupService: BankAccountPopupService) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.bankAccountPopupService.open(BankAccountDialogComponent as Component, params['id']);
      } else {
        this.bankAccountPopupService.open(BankAccountDialogComponent as Component);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
