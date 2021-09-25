describe('tabbed-pane', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tabcomponent--primary&args=title;'));
  it('should render the component', () => {
    cy.get('mp-tab').should('exist');
  });
});