import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { LabelComponentsPage, LabelDialogPage } from './label.page-object';

describe('Label e2e test', () => {
  let navBarPage: NavBarPage;
  let labelDialogPage: LabelDialogPage;
  let labelComponentsPage: LabelComponentsPage;

  beforeAll(() => {
    browser.get('/');
    browser.waitForAngular();
    navBarPage = new NavBarPage();
    navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
    browser.waitForAngular();
  });

  it('should load Labels', () => {
    navBarPage.goToEntity('label');
    labelComponentsPage = new LabelComponentsPage();
    expect(labelComponentsPage.getTitle()).toMatch(/jhipsterSampleApplicationApp.label.home.title/);
  });

  it('should load create Label dialog', () => {
    labelComponentsPage.clickOnCreateButton();
    labelDialogPage = new LabelDialogPage();
    expect(labelDialogPage.getModalTitle()).toMatch(/jhipsterSampleApplicationApp.label.home.createOrEditLabel/);
    labelDialogPage.close();
  });

  it('should create and save Labels', () => {
    labelComponentsPage.clickOnCreateButton();
    labelDialogPage.setLabelInput('label');
    expect(labelDialogPage.getLabelInput()).toMatch('label');
    labelDialogPage.save();
    expect(labelDialogPage.getSaveButton().isPresent()).toBeFalsy();
  });

  afterAll(() => {
    navBarPage.autoSignOut();
  });
});
