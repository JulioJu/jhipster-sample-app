import { element, by } from 'protractor';

export class BankAccountComponentsPage {
  createButton = element(by.css('.jh-create-entity'));
  title = element.all(by.css('jhi-bank-account div h2 span')).first();

  clickOnCreateButton() {
    return this.createButton.click();
  }

  getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class BankAccountDialogPage {
  modalTitle = element(by.css('h4#myBankAccountLabel'));
  saveButton = element(by.css('.modal-footer .btn.btn-primary'));
  closeButton = element(by.css('button.close'));
  nameInput = element(by.css('input#field_name'));
  balanceInput = element(by.css('input#field_balance'));
  userSelect = element(by.css('select#field_user'));

  getModalTitle() {
    return this.modalTitle.getAttribute('jhiTranslate');
  }

  setNameInput(name) {
    this.nameInput.sendKeys(name);
  }

  getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  setBalanceInput(balance) {
    this.balanceInput.sendKeys(balance);
  }

  getBalanceInput() {
    return this.balanceInput.getAttribute('value');
  }

  userSelectLastOption() {
    this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  userSelectOption(option) {
    this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
