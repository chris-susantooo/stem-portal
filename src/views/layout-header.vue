<template>
  <div id="nav-bar" class="nav">
    <div class="container">
      <router-link to="/" class="logo">STEM Portal</router-link>
      <nav>
        <template v-for="item in navLinks">
          <router-link v-if="isLinkInternal(item.link)" :to="item.link" :key="`nav-link-${item.text}`">
            {{ item.text }}
          </router-link>
          <a v-else :href="item.link" :key="`nav-link-${item.text}`">
            {{ item.text }}
          </a>
        </template>
      </nav>
      <div class="nav-actions">
        <div class="desktop">
          <template v-if="isLoggedIn">
            <UserMenu @logout="logout" />
          </template>
          <template v-else>
            <v-btn rounded depressed small
              @click="$router.push({ name: 'login', params: { next: $route.name } })"
              color="primary"
              class="nav-cta no-text-transform"
            >Sign in</v-btn>
            <span>or</span>
            <router-link :to="{ name: 'login', query: { action: 'register' } }">Register</router-link>
          </template>
        </div>
        <div class="mobile">
          <input class="menu-btn" type="checkbox" id="menu-btn">
          <label @click="toggleNav" class="menu-icon" for="menu-btn"><span class="hamburger"></span></label>
        </div>
      </div>
    </div>
    <ul @click="closeNav" id="menu" class="menu d-md-none">
      <li v-for="item in navLinks" :key="`mob-nav-link-${item.text}`">
        <router-link v-if="isLinkInternal(item.link)" :to="item.link">{{ item.text }}</router-link>
        <a v-else :href="item.link">{{ item.text }}</a>
      </li>
      <div class="d-sm-none">
        <template v-if="isLoggedIn">
          <li><router-link :to="{ name: 'profile', params: { username: user.username } }">
            View Profile
          </router-link></li>
          <li @click="logout"><a>Logout {{ user.username }}</a></li>
        </template>
        <template v-else>
          <li><router-link :to="{ name: 'login', params: { next: $route.name } }">Sign In</router-link></li>
          <li><router-link :to="{ name: 'login', query: { action: 'register' } }">
            Register
          </router-link></li>
        </template>
      </div>
    </ul>
  </div>
</template>

<script>
import UserMenu from '../components/nav-user-menu.vue'

export default {
  components: { UserMenu },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    user () {
      return this.$store.getters.user
    },
    navLinks () {
      switch (this.user.type) {
        case 'teacher':
          return [
            {
              text: 'Teachers\' Circle',
              link: { name: 'teacher-circle' }
            },
            {
              text: 'Forum',
              link: { name: 'forum' }
            },
            {
              text: 'Courses',
              link: { name: 'course-list' }
            },
            {
              text: 'Games',
              link: { name: 'game-list' }
            }
          ]
        case 'student':
          return [
            {
              text: 'Forum',
              link: { name: 'forum' }
            },
            {
              text: 'Courses',
              link: { name: 'course-list' }
            },
            {
              text: 'Games',
              link: { name: 'game-list' }
            }
          ]
        case 'parent':
          return [
            {
              text: 'Forum',
              link: { name: 'forum' }
            },
            {
              text: 'Games',
              link: { name: 'game-list' }
            }
          ]
        default:
          return [
            {
              text: 'About us',
              link: 'https://i.cs.hku.hk/fyp/2019/fyp19030'
            },
            {
              text: 'Features',
              link: { name: 'features-intro' }
            },
            {
              text: 'Forum',
              link: { name: 'forum' }
            },
            {
              text: 'Courses',
              link: { name: 'course-list' }
            },
            {
              text: 'Games',
              link: { name: 'game-list' }
            }
          ]
      }
    }
  },
  methods: {
    toggleNav () {
      const expand = !document.getElementById('menu-btn').checked
      document.getElementById('menu').style.maxHeight = expand ? '300px' : 0
    },
    closeNav () {
      document.getElementById('menu-btn').checked = false
      document.getElementById('menu').style.maxHeight = 0
    },
    isLinkInternal (link) {
      return typeof link === 'object'
    },
    async logout () {
      await this.$store.dispatch('logout')
      const hasRequiredRole = this.$route.matched.reduce((acc, { meta: { role } }) => (
        role
          ? acc && role === this.user.type
          : acc
      ), true)
      if (!hasRequiredRole) {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    font-family: $heading-font-family;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 100;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    overflow-y: hidden;

    nav {
      flex-grow: 1;
      justify-content: center;
      text-align: center;
    }

    a {
      margin: 0 .5rem;
    }
  }

  .menu {
    max-height: 0;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .nav-cta {
    font-family: $heading-font-family;
    font-size: .85rem !important;
    margin-right: .5rem;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .container {
    display: flex;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;
    height: 4rem;
  }

  .mobile, .menu-icon, .menu-btn {
    display: none;
  }

  @media (max-width: 960px) {
    nav {
      display: none;
    }

    .container {
      position: relative;
    }

    .nav-actions {
      position: absolute;
      right: 0;
    }

    .mobile, .menu-icon {
      display: block;
    }

    .menu-icon {
      cursor: pointer;
      float: right;
      padding: 1.5rem 1rem;
      position: relative;
      user-select: none;
    }

    .menu-icon .hamburger {
      background: #333;
      display: block;
      height: 2px;
      position: relative;
      transition: background .2s ease-out;
      width: 18px;
    }

    .menu-icon .hamburger:before,
    .menu-icon .hamburger:after {
      background: #333;
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      transition: all .2s ease-out;
      width: 100%;
    }

    .menu-icon .hamburger:before {
      top: 5px;
    }

    .menu-icon .hamburger:after {
      top: -5px;
    }

    .menu {
      clear: both;
      transition: max-height .2s ease-out;
      overflow-y: auto;
      list-style: none;
      padding: 0;
      max-height: 0;
    }

    li a {
      text-align: center;
      display: block;
      padding: 20px 20px;
      text-decoration: none;
    }

    .menu-title {
      font-family: $heading-font-family;
      text-align: center;
      padding: 20px 20px;
    }

    li a:hover,
    .menu-btn:hover {
      background-color: #f4f4f4;
    }

    .menu-btn:checked ~ .menu-icon .hamburger {
      background: transparent;
    }

    .menu-btn:checked ~ .menu-icon .hamburger:before {
      transform: rotate(-45deg);
    }

    .menu-btn:checked ~ .menu-icon .hamburger:after {
       transform: rotate(45deg);
    }

    .menu-btn:checked ~ .menu-icon:not(.steps) .hamburger:before,
    .menu-btn:checked ~ .menu-icon:not(.steps) .hamburger:after {
       top: 0;
    }
  }

  @media (max-width: 600px) {
    .nav .desktop {
      display: none;
    }
  }
</style>
