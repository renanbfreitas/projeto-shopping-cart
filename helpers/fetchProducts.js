const fetchProducts = async (elemento) => {
  try {
    return await (await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${elemento}`))
    .json();
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
