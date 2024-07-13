import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductList from '../views/ProductList.vue'
import Register from '../views/LoginRegister.vue'
import Cart from '../views/CartPage.vue'
import ProductDetails from '../views/ProductDetails.vue'
import BackofficeUploadProduct from '../views/admin-upload-product.vue'
import BackofficeUploadTag from '../views/admin-upload-tag.vue'
import EditProduct from '../views/admin-edit-products.vue'
import { Carousel, Slide } from 'vue-carousel';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  components: {
    Carousel,
    Slide
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.

    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/productlist',
      name: 'productlist',
      component: ProductList
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/product-details',
      name: 'product-details',
      component: ProductDetails
    },
    {
      path: '/admin/upload-product',
      name: 'upload-product',
      component: BackofficeUploadProduct,
      meta: { requiresBackofficeHeader: true }
    },
    {
      path: '/admin/upload-tag',
      name: 'upload-tag',
      component: BackofficeUploadTag,
      meta: { requiresBackofficeHeader: true }
    },
    {
      path: '/admin/edit-product',
      name: 'edit-product',
      component: EditProduct,
      meta: { requiresBackofficeHeader: true }
    },
  ]
})

export default router
