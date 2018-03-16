import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { BankAccountComponentsPage, BankAccountDialogPage } from './bank-account.page-object';

describe('BankAccount e2e test', () => {
  let navBarPage: NavBarPage;
  let bankAccountDialogPage: BankAccountDialogPage;
  let bankAccountComponentsPage: BankAccountComponentsPage;

  beforeAll(() => {
    browser.get('/');
    browser.waitForAngular();
    navBarPage = new NavBarPage();
    navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
    browser.waitForAngular();
  });

  it('should load BankAccounts', () => {
    navBarPage.goToEntity('bank-account');
    bankAccountComponentsPage = new BankAccountComponentsPage();
    expect(bankAccountComponentsPage.getTitle()).toMatch(/jhipsterSampleApplicationApp.bankAccount.home.title/);
  });

  it('should load create BankAccount dialog', () => {
    bankAccountComponentsPage.clickOnCreateButton();
    bankAccountDialogPage = new BankAccountDialogPage();
    expect(bankAccountDialogPage.getModalTitle()).toMatch(/jhipsterSampleApplicationApp.bankAccount.home.createOrEditLabel/);
    bankAccountDialogPage.close();
  });

  it('should create and save BankAccounts', () => {
    bankAccountComponentsPage.clickOnCreateButton();
    bankAccountDialogPage.setNameInput('name');
    expect(bankAccountDialogPage.getNameInput()).toMatch('name');
    bankAccountDialogPage.setBalanceInput('5');
    expect(bankAccountDialogPage.getBalanceInput()).toMatch('5');
    bankAccountDialogPage.userSelectLastOption();
    bankAccountDialogPage.save();
    expect(bankAccountDialogPage.getSaveButton().isPresent()).toBeFalsy();
  });

  afterAll(() => {
    navBarPage.autoSignOut();
  });
});
