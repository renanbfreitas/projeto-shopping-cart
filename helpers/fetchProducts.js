const fetchProducts = async (QUERY) => {
  try {
    return await (await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`))
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