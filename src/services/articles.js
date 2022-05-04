import server from './server'

async function getProducts() {
  const response = await server.get('products')
  return response.data
}

async function addProduct(data) {
  const response = await server.post('products', data)
  return response.data
}

async function removeProduct(id) {
  const response = await server.delete('products/' + id)
  return response.data
}

export { getProducts, addProduct, removeProduct }
