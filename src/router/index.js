import Vue from 'vue';
import Router from 'vue-router';
import Login from 'components/Login';
import Admin from 'components/Admin/Admin';
import Dashboard from 'components/User/Dashboard';
import Books from 'components/User/Books';
import Resources from 'components/Resources';
import Nas from 'components/Nas';
import NotFound from 'components/NotFound';
import firebase from 'firebase';
import { database } from 'firebaseInstance'

const usersRef = database.ref('users');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
      component: Admin,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        requiresAuth: true,
      },
      component: Dashboard,
    },
    {
      path: '/books',
      name: 'books',
      meta: {
        requiresAuth: true,
      },
      component: Books,
    },
    {
      path: '/resources',
      name: 'resources',
      meta: {
        requiresAuth: true,
      },
      component: Resources,
    },
    {
      path: '/nas',
      name: 'nas',
      meta: {
        requiresAuth: true,
      },
      component: Nas,
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
    },
  ],
});


router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (to.path === '/') {
      if (user) {
        var newUser = {};
        usersRef.child(user.uid).once('value')
          .then((dataSnapshot) => {
            newUser = dataSnapshot.val();
            if (newUser.administrator) {
              next('/admin');
            } else {
              next('/dashboard');
            }
          });
      } else {
        next('/login');
      }
    }
  });

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;
