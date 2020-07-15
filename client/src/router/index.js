import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Dashboard from '@/views/Dashboard'
import Donate from '@/views/Donate'
import InvalidLink from '@/views/InvalidLink'
import PaymentSetup from '@/views/PaymentSetup'
import LinkManager from '@/views/LinkManager'
import Landing from '@/views/Landing'
import PaymentConfirmation from '@/views/PaymentConfirmation'
import TermsConditions from '@/views/TermsConditions'
import PrivacyPolicy from '@/views/PrivacyPolicy'
import AdminLogin from '@/views/admin/AdminLogin'
import AdminDashboard from '@/views/admin/AdminDashboard'
import UserManager from '@/views/admin/UserManager'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
      meta: {
        title: 'Plej'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login - Plej'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: 'Sign Up - Plej'
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        title: 'Dashboard - Plej'
      }
    },
    {
      path: '/paymentsetup',
      name: 'PaymentSetup',
      component: PaymentSetup,
      meta: {
        title: 'Setup Payments - Plej'
      }
    },
    {
      path: '/linkmanager',
      name: 'LinkManager',
      component: LinkManager,
      meta: {
        title: 'Manage Links - Plej'
      }
    },
    {
      path: '/donate/confirmation',
      name: 'PaymentConfirmation',
      component: PaymentConfirmation,
      props: true,
      meta: {
        title: 'Confirmation - Plej'
      }
    },
    {
      path: '/donate/:token',
      name: 'Donate',
      component: Donate,
      meta: {
        title: 'Donate - Plej'
      }
    },
    {
      path: '/termsconditions',
      name: 'TermsConditions',
      component: TermsConditions,
      meta: {
        title: 'Terms and Conditons - Plej'
      }
    },
    {
      path: '/privacypolicy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
      meta: {
        title: 'Privacy Policy - Plej'
      }
    },
    {
      path: '/adminlogin/1r0N!f7B',
      name: 'AdminLogin',
      component: AdminLogin,
      meta: {
        title: 'Login - Plej'
      }
    },
    {
      path: '/admindashboard',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: {
        title: 'Dashboard - Plej'
      }
    },
    {
      path: '/usermanager',
      name: 'UserManager',
      component: UserManager,
      meta: {
        title: 'Users - Plej'
      }
    },
    {
      path: '*',
      name: 'InvalidLink',
      component: InvalidLink,
      meta: {
        title: 'Oops - Plej'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})
