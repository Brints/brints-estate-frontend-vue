<script setup></script>

<template>
  <div
    className="bg-[url('../assets/images/house-2.jpg')] h-screen w-screen flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat"
  >
    <div className="bg-slate-800 bg-opacity-80 p-10 rounded-lg">
      <h1 className="text-4xl font-bold text-center">
        Welcome to
        <span className="border-y text-lime-500"
          >Brints <span className="text-indigo-600">Estate</span></span
        >
      </h1>
      <p className="text-center text-lg mt-5">
        We are a real estate company that provides you with the best properties
        in the market.
      </p>
      <div className="mt-5 flex justify-center gap-2">
        <router-link to="#" className="border-r-2 pr-2">
          <span
            className=" hover:border-b-2 hover:border-lime-500 hover:text-lime-900 transition-all duration-300"
            >Company Profile</span
          ></router-link
        >
        <router-link to="#" className="border-r-2 pr-2">
          <span
            className=" hover:border-b-2 hover:border-lime-500 hover:text-lime-900 transition-all duration-300"
            >About Us</span
          ></router-link
        >
        <router-link to="#" className="pr-2">
          <span
            className=" hover:border-b-2 hover:border-lime-500 hover:text-lime-900 transition-all duration-300"
            >Contact Us</span
          ></router-link
        >
      </div>
    </div>
  </div>
</template>
