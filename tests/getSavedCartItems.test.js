const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('4.1 Testa se ao executar getSavedCartItems o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem)
      .toBeCalled()
  })
  it('4.2 Testa se ao executar getSavedCartItems o método localStorage.getItem é chamado com "CartItems" como parâmetro', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem)
      .toBeCalledWith('cartItems');
  })
})