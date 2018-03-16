/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { LabelDetailComponent } from 'app/entities/label/label-detail.component';
import { LabelService } from 'app/entities/label/label.service';
import { Label } from 'app/shared/model/label.model';

describe('Component Tests', () => {
  describe('Label Management Detail Component', () => {
    let comp: LabelDetailComponent;
    let fixture: ComponentFixture<LabelDetailComponent>;
    let service: LabelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [LabelDetailComponent],
        providers: [LabelService]
      })
        .overrideTemplate(LabelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LabelDetailComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LabelService);
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        spyOn(service, 'find').and.returnValue(
          Observable.of(
            new HttpResponse({
              body: new Label(123)
            })
          )
        );

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(service.find).toHaveBeenCalledWith(123);
        expect(comp.label).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
