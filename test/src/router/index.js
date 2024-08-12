import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductList from '../views/ProductList.vue'
import Register from '../views/LoginRegister.vue'
import Cart from '../views/CartPage.vue'
import ProductDetails from '../views/ProductDetails.vue'
import OrderCompletion from '../views/OrderCompletion.vue'
import BackofficeUploadProduct from '../views/admin-upload-product.vue'
import BackofficeUploadTag from '../views/admin-upload-tag.vue'
import adminEditOrders from '@/views/admin-edit-orders.vue'
import EditProduct from '../views/admin-edit-products.vue'
import CategoryPage from '../views/ProductList.vue';
import ProductDetailsId from '../views/ProductDetails.vue'
import Checkout from '../views/Checkout.vue'
import AccountPage from '../views/AccountPage.vue'
import CreditCardPayment from '../views/CreditCardPayment.vue'
import Wishlist from '../views/Wishlist.vue'
import MyOrders from '@/views/MyOrders.vue'
import { Carousel, Slide } from 'vue-carousel';
import '../assets/main.css';

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
      path: '/my-account/my-orders',
      name: 'myorders',
      component: MyOrders
    },
    {
      path: '/my-account',
      name: 'AccountPage',
      component: AccountPage,
      
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.

    },
    {
      path: '/product-list/:categoryId',
      name: 'CategoryPage',
      component: CategoryPage,
      props: true,
    },
    {
      path: '/product-details/:productId',
      name: 'ProductPage',
      component: () => import('@/views/ProductDetails.vue'),
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/credit-card-payment',
      name: 'CreditCardPayment',
      component: CreditCardPayment
    },
    {
      path: '/success-order/:orderId',
      name: 'orderCompletion',
      component: OrderCompletion
    },
    {
      path: '/product-list',
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
      path: '/wishlist',
      name: 'wishlist',
      component: Wishlist
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
      path: '/admin/edit-orders',
      name: 'edit-orders',
      component: adminEditOrders,
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
