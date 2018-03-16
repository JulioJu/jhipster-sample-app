import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILabel } from 'app/shared/model/label.model';
import { LabelPopupService } from './label-popup.service';
import { LabelService } from './label.service';
import { IOperation } from 'app/shared/model/operation.model';
import { OperationService } from '../operation';

@Component({
  selector: 'jhi-label-dialog',
  templateUrl: './label-dialog.component.html'
})
export class LabelDialogComponent implements OnInit {
  private _label: ILabel;
  isSaving: boolean;

  operations: IOperation[];

  constructor(
    public activeModal: NgbActiveModal,
    private jhiAlertService: JhiAlertService,
    private labelService: LabelService,
    private operationService: OperationService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.operationService.query().subscribe(
      (res: HttpResponse<IOperation[]>) => {
        this.operations = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    if (this.label.id !== undefined) {
      this.subscribeToSaveResponse(this.labelService.update(this.label));
    } else {
      this.subscribeToSaveResponse(this.labelService.create(this.label));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ILabel>>) {
    result.subscribe((res: HttpResponse<ILabel>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: ILabel) {
    this.eventManager.broadcast({ name: 'labelListModification', content: 'OK' });
    this.isSaving = false;
    this.activeModal.dismiss(result);
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackOperationById(index: number, item: IOperation) {
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
  get label() {
    return this._label;
  }

  set label(label: ILabel) {
    this._label = label;
  }
}

@Component({
  selector: 'jhi-label-popup',
  template: ''
})
export class LabelPopupComponent implements OnInit, OnDestroy {
  routeSub: any;

  constructor(private route: ActivatedRoute, private labelPopupService: LabelPopupService) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.labelPopupService.open(LabelDialogComponent as Component, params['id']);
      } else {
        this.labelPopupService.open(LabelDialogComponent as Component);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
