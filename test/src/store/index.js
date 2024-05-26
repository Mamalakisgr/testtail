import { createStore } from 'vuex'

export default createStore({
  state: {
    // Example state
    products: []
  },
  mutations: {
    // Example mutation
    setProducts(state, products) {
      state.products = products
    }
  },
  actions: {
    // Example action
    fetchProducts({ commit }) {
      // Simulate fetching data from an API
      const products = [
        { id: 1, name: 'Product A', price: 100 },
        { id: 2, name: 'Product B', price: 150 }
      ]
      commit('setProducts', products)
    }
  },
  modules: {
    // Add any modules here if needed
  }
})
