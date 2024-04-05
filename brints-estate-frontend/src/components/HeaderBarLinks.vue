<script></script>

<template>
  <header :class="$style.header_links">
    <nav className="flex gap-4 items-center">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About Us</router-link>
      <router-link to="/contact">Contact Us</router-link>
      <router-link to="/company">Company Profile</router-link>
    </nav>

    <nav className="flex gap-4">
      <router-link to="/signup">Register</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
  </header>
</template>

<style module>
.header_links {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
