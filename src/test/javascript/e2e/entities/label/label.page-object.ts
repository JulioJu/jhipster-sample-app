import { element, by } from 'protractor';

export class LabelComponentsPage {
  createButton = element(by.css('.jh-create-entity'));
  title = element.all(by.css('jhi-label div h2 span')).first();

  clickOnCreateButton() {
    return this.createButton.click();
  }

  getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class LabelDialogPage {
  modalTitle = element(by.css('h4#myLabelLabel'));
  saveButton = element(by.css('.modal-footer .btn.btn-primary'));
  closeButton = element(by.css('button.close'));
  labelInput = element(by.css('input#field_label'));

  getModalTitle() {
    return this.modalTitle.getAttribute('jhiTranslate');
  }

  setLabelInput(label) {
    this.labelInput.sendKeys(label);
  }

  getLabelInput() {
    return this.labelInput.getAttribute('value');
  }

  save() {
    this.saveButton.click();
  }

  close() {
    this.closeButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
