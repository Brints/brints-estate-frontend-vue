<script>
import axios from "axios";
import HeaderBar from "@/components/layout/HeaderBar.vue";
import BaseFooter from "@/components/layout/BaseFooter.vue";

export default {
  components: {
    HeaderBar,
    BaseFooter,
  },
  data() {
    return {
      imageUrl: "",
      loading: false,
      aboutUs: [],
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
        this.aboutUs.push = response.data.payload;
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

  computed: {
    backgroundImage() {
      return `linear-gradient(rgb(83, 95, 110, 0.7), rgba(0, 0, 0, 0.7)), url('${this.imageUrl}')`;
    },
  },
};
</script>

<template>
  <div :class="$style.wrapper">
    <div class="nav-links">
      <HeaderBar></HeaderBar>
    </div>

    <main>
      <section v-if="loading" :class="$style.loading">
        <p>Loading...</p>
      </section>

      <section v-else-if="!loading && aboutUs.length === 0" :class="$style.no_content">
        <p>No Content yet.</p>
      </section>

      <section v-else class="about-contents">
        <div v-for="item in aboutUs" :key="item._id">
          <div :class="$style.imageContainer">
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
    </main>

    <div :class="$style.footer">
      <BaseFooter></BaseFooter>
    </div>
  </div>
</template>

<style module>
.wrapper {
  display: grid;
  grid-template-rows: minmax(5rem, auto) 1fr auto;
  height: 100vh;
}

.loading {
  height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.imageContainer {
  height: 100vh;
  background: v-bind("backgroundImage") center center/cover no-repeat;
}

.no_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  height: calc(100vh - 5rem);
}
</style>
