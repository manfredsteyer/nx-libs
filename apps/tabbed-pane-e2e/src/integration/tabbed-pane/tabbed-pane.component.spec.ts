describe('tabbed-pane', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tabbedpanecomponent--primary'));
  it('should render the component', () => {
    // cy.viewport(300,300);
    
    cy.get('a').eq(2).click();
    cy.get('mp-tab').contains('Tab C');
    cy.screenshot();
  });
});