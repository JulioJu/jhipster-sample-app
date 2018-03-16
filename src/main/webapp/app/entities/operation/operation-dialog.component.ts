import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOperation } from 'app/shared/model/operation.model';
import { OperationPopupService } from './operation-popup.service';
import { OperationService } from './operation.service';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { BankAccountService } from '../bank-account';
import { ILabel } from 'app/shared/model/label.model';
import { LabelService } from '../label';

@Component({
  selector: 'jhi-operation-dialog',
  templateUrl: './operation-dialog.component.html'
})
export class OperationDialogComponent implements OnInit {
  private _operation: IOperation;
  isSaving: boolean;

  bankaccounts: IBankAccount[];

  labels: ILabel[];
  date: string;

  constructor(
    public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
    private operationService: OperationService,
    private bankAccountService: BankAccountService,
    private labelService: LabelService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.bankAccountService.query().subscribe(
      (res: HttpResponse<IBankAccount[]>) => {
        this.bankaccounts = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.labelService.query().subscribe(
      (res: HttpResponse<ILabel[]>) => {
        this.labels = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    this.operation.date = moment(this.date, DATE_TIME_FORMAT);
    if (this.operation.id !== undefined) {
      this.subscribeToSaveResponse(this.operationService.update(this.operation));
    } else {
      this.subscribeToSaveResponse(this.operationService.create(this.operation));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IOperation>>) {
    result.subscribe((res: HttpResponse<IOperation>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: IOperation) {
    this.eventManager.broadcast({ name: 'operationListModification', content: 'OK' });
    this.isSaving = false;
    this.activeModal.dismiss(result);
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackBankAccountById(index: number, item: IBankAccount) {
    return item.id;
  }

  trackLabelById(index: number, item: ILabel) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
  get operation() {
    return this._operation;
  }

  set operation(operation: IOperation) {
    this._operation = operation;
    this.date = moment(operation.date).format();
  }
}

@Component({
  selector: 'jhi-operation-popup',
  template: ''
})
export class OperationPopupComponent implements OnInit, OnDestroy {
  routeSub: any;

  constructor(private route: ActivatedRoute, private operationPopupService: OperationPopupService) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.operationPopupService.open(OperationDialogComponent as Component, params['id']);
      } else {
        this.operationPopupService.open(OperationDialogComponent as Component);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
