<script></script>

<template>
  <header :class="$style.header_links">
    <nav className="flex gap-4 items-center">
      <router-link :to="{ name: 'landing-page' }">Home</router-link>
      <router-link :to="{ name: 'about' }">About Us</router-link>
      <router-link :to="{ name: 'contact' }">Contact Us</router-link>
      <router-link :to="{ name: 'company' }">Company Profile</router-link>
    </nav>

    <nav className="flex gap-4">
      <router-link :to="{ name: 'signup' }">Register</router-link>
      <router-link :to="{ name: 'login' }">Login</router-link>
    </nav>
  </header>
</template>

<style module>
.header_links {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-items: center;
  gap: 4rem;
}

nav a {
  padding: 0.3rem;
}

nav a:hover,
nav a:active {
  color: #f1a80a;
  border-bottom: 1px solid #f1a80a;
}

.router-link-active {
  color: #fff;
}
</style>
