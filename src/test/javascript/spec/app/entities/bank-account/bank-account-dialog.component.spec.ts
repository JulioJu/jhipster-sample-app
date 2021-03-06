/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { BankAccountDialogComponent } from 'app/entities/bank-account/bank-account-dialog.component';
import { BankAccountService } from 'app/entities/bank-account/bank-account.service';
import { BankAccount } from 'app/shared/model/bank-account.model';

import { UserService } from 'app/core';

describe('Component Tests', () => {
  describe('BankAccount Management Dialog Component', () => {
    let comp: BankAccountDialogComponent;
    let fixture: ComponentFixture<BankAccountDialogComponent>;
    let service: BankAccountService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [BankAccountDialogComponent],
        providers: [UserService, BankAccountService]
      })
        .overrideTemplate(BankAccountDialogComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BankAccountDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BankAccountService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new BankAccount(123);
          spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
          comp.bankAccount = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.update).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
          expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bankAccountListModification', content: 'OK' });
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
        })
      );

      it(
        'Should call create service on save for new entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new BankAccount();
          spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
          comp.bankAccount = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.create).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
          expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bankAccountListModification', content: 'OK' });
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
        })
      );
    });
  });
});
