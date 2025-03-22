import { useLocalStorage } from '@vueuse/core'

export const useRecentProducts = () => {
  const recentProducts = useLocalStorage('recentProducts', [])

  const storeRecentProduct = (product) => {
    if (!product?._id) return

    recentProducts.value = [
      product,
      ...recentProducts.value.filter(p => p._id !== product._id)
    ].slice(0, 5)
  }

  return { recentProducts, storeRecentProduct }
}