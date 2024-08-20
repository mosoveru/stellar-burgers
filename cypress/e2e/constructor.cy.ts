describe('Тест страницы конструктора', () => {
  const url = Cypress.env().BURGER_API_URL;

  it('Тест добавления ингредиентов в конструктор', () => {
    cy.intercept(
      { hostname: url, path: '/api/ingredients' },
      { fixture: 'ingredients.json' }
    ).as('getIndredients');
    cy.visit('http://localhost:4000/');
    cy.get('[data-cy=ConstructorPage]').should('exist');
    cy.wait('@getIndredients');

    cy.get('[data-cy=Ingredient]').each((element) => {
      cy.wrap(element).find('button').click();
    });

    cy.get('[data-cy=noTopBun]').should('not.exist');
    cy.get('[data-cy=noTopings]').should('not.exist');
    cy.get('[data-cy=noBottomBun]').should('not.exist');
  });

  it('Тест открытия модального окна', () => {
    cy.intercept(
      { hostname: url, path: '/api/ingredients' },
      { fixture: 'ingredients.json' }
    ).as('getIndredients');
    cy.visit('http://localhost:4000/');
    cy.get('[data-cy=ConstructorPage]').should('exist');
    cy.wait('@getIndredients');
    cy.get('[data-cy=OpenModal]').first().click();
    cy.get('[data-cy=Modal]').should('exist');
    cy.get('[data-cy=Modal]').find('button').click().and('not.exist');
    cy.get('[data-cy=OpenModal]').first().click();
    cy.get('[data-cy=Overlay]').click(5, 5, { force: true }).and('not.exist');
  });

  it('Тест создания заказа', () => {
    cy.setCookie('accessToken', 'thisIsABigBossAccessToken');
    cy.intercept(
      { hostname: url, path: '/api/ingredients' },
      { fixture: 'ingredients.json' }
    ).as('getIndredients');
    cy.intercept(
      { hostname: url, path: '/api/auth/user' },
      { fixture: 'user.json' }
    ).as('getUser');
    cy.intercept(
      { hostname: url, path: '/api/orders' },
      { fixture: 'order.json' }
    ).as('getOrder');
    cy.visit('http://localhost:4000/');
    cy.get('[data-cy=ConstructorPage]').should('exist');
    cy.wait('@getIndredients');
    cy.wait('@getUser');

    cy.get('[data-cy=Ingredient]').each((element) => {
      cy.wrap(element).find('button').click();
    });

    cy.get('[data-cy=noTopBun]').should('not.exist');
    cy.get('[data-cy=noTopings]').should('not.exist');
    cy.get('[data-cy=noBottomBun]').should('not.exist');

    cy.get('[data-cy=MakeOrder]').click();
    cy.wait('@getOrder');
    cy.get('[data-cy=Modal]')
      .should('exist')
      .find('h2')
      .should('have.text', '777');
    cy.get('[data-cy=Modal]').find('button').click();
    cy.get('[data-cy=Modal]').should('not.exist');

    cy.get('[data-cy=noTopBun]').should('exist');
    cy.get('[data-cy=noTopings]').should('exist');
    cy.get('[data-cy=noBottomBun]').should('exist');
  });
});
