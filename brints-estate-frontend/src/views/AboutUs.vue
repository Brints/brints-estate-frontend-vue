<script>
import axios from "axios";
import HeaderBar from "@/components/layout/HeaderBar.vue";

export default {
  components: {
    HeaderBar,
  },
  data() {
    return {
      imageUrl: "",
      loading: false,
      aboutUs: null,
    };
  },
  async mounted() {
    this.fetchAboutUs();
  },
  methods: {
    async fetchAboutUs() {
      const url = import.meta.env.VITE_BACKEND_URL;
      try {
        this.loading = true;
        const response = await axios.get(`${url}/admin/about-us`);
        this.aboutUs = response.data.payload;
        for (const item of this.aboutUs) {
          this.imageUrl = item.image[0].url;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div :class="$style.container">
    <div class="nav-links">
      <HeaderBar></HeaderBar>
    </div>

    <main className="flex flex-col h-full">
      <section v-if="loading" :class="$style.loading">
        <p>Loading...</p>
      </section>

      <section v-else-if="aboutUs" class="about-contents">
        <div v-for="item in aboutUs" :key="item._id">
          <div
            :class="$style.imageContainer"
            className="bg-center bg-cover bg-no-repeat"
            :style="{
              height: '100vh',
              backgroundImage: `linear-gradient(rgb(83, 95, 110, 0.7), rgba(0, 0, 0, 0.7)), url('${imageUrl}')`,
            }"
          >
            <h1
              className="bg-zinc-300 rounded-lg text-xl relative top-1/2 left-14 w-80 p-6 text-emerald-700 -translate-y-2/4 "
            >
              Looking for apartment? Do you have a property for sale or lease? Brints Estate got you covered.
            </h1>
          </div>

          <div className="mt-8">
            <h1 className="lowercase text-5xl text-center border-b-2">
              {{ item.title }}
            </h1>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </section>

      <section v-else :class="$style.no_content">
        <p>No Content yet.</p>
      </section>
    </main>
  </div>
</template>

<style module>
.loading {
  height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* .imageContainer {
  position: absolute;
  width: 100%;
  height: 100px;
} */

.no_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  height: calc(100vh - 5rem);
}
</style>
