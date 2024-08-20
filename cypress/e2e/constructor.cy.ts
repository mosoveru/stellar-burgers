describe('Тест страницы конструктора', () => {
  const url = Cypress.env().BURGER_API_URL;
  const constructorPageSelector = 'ConstructorPage';
  const noTopBunSelector = 'noTopBun';
  const noBottomBunSelector = 'noBottomBun';
  const noToppingsSelector = 'noTopings';
  const constructorSelector = {
    topSelector: noTopBunSelector,
    bottomSelector: noBottomBunSelector,
    toppingSelector: noToppingsSelector
  };
  const modalSelector = 'Modal';
  const openModalSelector = 'OpenModal';
  const ingredientSelector = 'Ingredient';

  it('Тест добавления ингредиентов в конструктор', () => {
    cy.intercept(
      { hostname: url, path: '/api/ingredients' },
      { fixture: 'ingredients.json' }
    ).as('getIndredients');
    cy.visit('/');
    cy.exist(constructorPageSelector);
    cy.wait('@getIndredients');

    cy.addToConstructor(ingredientSelector);

    cy.checkConstructorIsEmpty(constructorSelector);
  });

  it('Тест открытия модального окна', () => {
    cy.intercept(
      { hostname: url, path: '/api/ingredients' },
      { fixture: 'ingredients.json' }
    ).as('getIndredients');
    cy.visit('/');
    cy.exist(constructorPageSelector);
    cy.wait('@getIndredients');

    cy.dataCy(openModalSelector).first().click();
    cy.exist(modalSelector);
    cy.dataCy(modalSelector).find('button').click().and('not.exist');
    cy.dataCy(openModalSelector).first().click();
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
    cy.visit('/');
    cy.exist(constructorPageSelector);
    cy.wait('@getIndredients');
    cy.wait('@getUser');

    cy.addToConstructor(ingredientSelector);

    cy.checkConstructorIsEmpty(constructorSelector);

    cy.dataCy('MakeOrder').click();
    cy.wait('@getOrder');

    cy.exist(modalSelector).find('h2').should('have.text', '777');
    cy.dataCy(modalSelector).find('button').as('closeButton');
    cy.get('@closeButton').click();

    cy.notExist(modalSelector);
    cy.checkConstructorIsFilled(constructorSelector);
  });
});
