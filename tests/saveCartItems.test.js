const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('3.1 Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('carItem');
    expect(localStorage.setItem)
    .toBeCalled();
  });

  it('3.2 Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo carItens o segundo parâmetro', () => {
    saveCartItems('carItem');
    expect(localStorage.setItem)
    .toBeCalledWith('cartItems', 'carItem');
  });
});