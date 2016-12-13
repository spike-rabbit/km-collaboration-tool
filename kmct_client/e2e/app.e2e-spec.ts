import { KmctClientPage } from './app.po';

describe('kmct-client App', function() {
  let page: KmctClientPage;

  beforeEach(() => {
    page = new KmctClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
