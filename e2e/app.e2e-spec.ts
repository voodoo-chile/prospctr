import { ProspctrPage } from './app.po';

describe('prospctr App', () => {
  let page: ProspctrPage;

  beforeEach(() => {
    page = new ProspctrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
