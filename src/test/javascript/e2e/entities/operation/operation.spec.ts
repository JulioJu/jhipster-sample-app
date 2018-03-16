import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OperationComponentsPage, OperationDialogPage } from './operation.page-object';

describe('Operation e2e test', () => {
  let navBarPage: NavBarPage;
  let operationDialogPage: OperationDialogPage;
  let operationComponentsPage: OperationComponentsPage;

  beforeAll(() => {
    browser.get('/');
    browser.waitForAngular();
    navBarPage = new NavBarPage();
    navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
    browser.waitForAngular();
  });

  it('should load Operations', () => {
    navBarPage.goToEntity('operation');
    operationComponentsPage = new OperationComponentsPage();
    expect(operationComponentsPage.getTitle()).toMatch(/jhipsterSampleApplicationApp.operation.home.title/);
  });

  it('should load create Operation dialog', () => {
    operationComponentsPage.clickOnCreateButton();
    operationDialogPage = new OperationDialogPage();
    expect(operationDialogPage.getModalTitle()).toMatch(/jhipsterSampleApplicationApp.operation.home.createOrEditLabel/);
    operationDialogPage.close();
  });

  it('should create and save Operations', () => {
    operationComponentsPage.clickOnCreateButton();
    operationDialogPage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(operationDialogPage.getDateInput()).toContain('2001-01-01T02:30');
    operationDialogPage.setDescriptionInput('description');
    expect(operationDialogPage.getDescriptionInput()).toMatch('description');
    operationDialogPage.setAmountInput('5');
    expect(operationDialogPage.getAmountInput()).toMatch('5');
    operationDialogPage.bankAccountSelectLastOption();
    // operationDialogPage.labelSelectLastOption();
    operationDialogPage.save();
    expect(operationDialogPage.getSaveButton().isPresent()).toBeFalsy();
  });

  afterAll(() => {
    navBarPage.autoSignOut();
  });
});
