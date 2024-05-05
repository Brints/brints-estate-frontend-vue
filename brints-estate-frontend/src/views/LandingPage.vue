<script setup>
import { ref, onMounted } from "vue";
import SignInSignUpInfo from "@/components/SignInSignUpInfo.vue";
import SmallButton from "@/components/buttons/SmallButton.vue";

const bg = ref(null);
const loadText = ref(null);

onMounted(() => {
  bg.value = document.querySelector(".bg");
  loadText.value = document.querySelector(".loading-text");
});

let load = ref(0);

let int = setInterval(blurring, 30);

function blurring() {
  load.value++;
  if (load.value > 99) {
    clearInterval(int);
  }
  loadText.value.innerText = `${load.value}%`;
  loadText.value.style.opacity = scale(load.value, 0, 100, 1, 0);
  bg.value.style.filter = `blur(${scale(load.value, 0, 100, 30, 0)}px)`;
}

function scale(num, in_min, in_max, out_min, out_max) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
</script>

<template>
  <div
    className="bg bg-[url('../assets/images/building-design-4.jpg')] h-screen w-screen flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat  bg-opacity-80"
  >
    <div className="bg-slate-800 bg-opacity-80 pt-10 px-10 rounded-lg flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center">
        Welcome to
        <span className="brints-logo border-y text-lime-500"
          >Brints <span className="text-indigo-600">Estate</span></span
        >
      </h1>
      <p className="text-center text-lg mt-5">
        We are a real estate company that provides you with the best properties in the market.
      </p>
      <div className="mt-5 flex justify-center gap-2">
        <router-link to="#" className="border-r-2 pr-2">
          <span className=" hover:border-b-2 hover:border-lime-500 hover:text-lime-900 transition-all duration-300"
            >Company Profile</span
          ></router-link
        >
        <router-link :to="{ name: 'about' }" className="border-r-2 pr-2">
          <span className=" hover:border-b-2 hover:border-lime-500 hover:text-lime-900 transition-all duration-300"
            >About Us</span
          ></router-link
        >
        <router-link to="#" className="pr-2">
          <span className=" hover:border-b-2 hover:border-lime-500 hover:text-lime-900 transition-all duration-300"
            >Contact Us</span
          ></router-link
        >
      </div>

      <div class="extra-info my-8 flex">
        <div class="login px-2">
          <SignInSignUpInfo>
            Ready to hop in and explore?
            <div className="flex justify-center">
              <router-link :to="{ name: 'login' }">
                <SmallButton type="submit"><span className="text-green-400">Click to Proceed</span></SmallButton>
              </router-link>
            </div>
          </SignInSignUpInfo>
        </div>
      </div>
    </div>
  </div>
  <div className="loading-text">0%</div>
</template>

<style scoped>
.bg {
  position: absolute;
  filter: blur(0px);
  background-color: #000;
}
.loading-text {
  position: absolute;
  top: 47%;
  left: 50%;
  font-size: 2rem;
  color: #fff;
  transform: translate(-50%, -50%);
  z-index: 100;
}

/* Mobile devices */
@media (max-width: 768px) {
  /* replace background image with background color */
  .bg {
    background-image: none;
  }
  .brints-logo {
    display: block;
  }
  p {
    font-size: 1rem;
  }
}

/* Tablet devices */
@media (min-width: 768px) and (max-width: 1024px) {
  /* replace background image with background color */
  .bg {
    background-image: none;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>
