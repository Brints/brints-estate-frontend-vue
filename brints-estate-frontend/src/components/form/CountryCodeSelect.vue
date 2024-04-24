<script>
import CountriesData from "@/lookup/country-codes.json";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    asterisk: {
      type: String,
    },
  },

  data() {
    return {
      selectedValue: this.value,
      url: "https://emojicdn.elk.sh/",
    };
  },

  computed: {
    countries() {
      return CountriesData.countries;
    },
  },

  watch: {
    value(newValue) {
      this.selectedValue = newValue;
    },
  },

  methods: {
    handleInput() {
      this.$emit("input", this.selectedValue);
    },

    convertToEmoji(str) {
      const codePoints = str.codePointAt(0).toString(16);
      return String.fromCodePoint(`0x${codePoints}`);
    },

    flagEmoji(str) {
      return this.convertToEmoji(str);
    },

    flagUrl(flag) {
      // create image element
      const img = document.createElement("img");
      img.src = `https://emojicdn.elk.sh/${flag}`;
      return img;
    },

    flagAlt(name) {
      return name;
    },
  },
};
</script>

<!-- <template>
  <div :class="$style.form_group">
    <slot name="label">
      <span><font-awesome-icon :icon="icon" /></span>
      <label :for="id">{{ label }}</label>
    </slot>

    <select :id="id" :name="name" v-model.trim="selectedValue">
      <option value="">Country Code</option>
      <option v-for="country in countries" :key="country.code" :value="country.zipcode">
        <span>{{ flagEmoji(country.flag) }}</span>

        {{ country.name }} {{ country.zipcode }}
      </option>
    </select>
  </div>
</template> -->

<template>
  <div :class="$style.form_group">
    <div :class="$style.label_group">
      <span><font-awesome-icon :icon="icon" /></span>
      <label :for="id"
        >{{ label }}<span v-if="asterisk" class="text-red-500">{{ asterisk }}</span></label
      >
    </div>

    <select :id="id" :name="name" v-model.trim="selectedValue">
      <option value="">Country Code</option>
      <option v-for="country in countries" :key="country.code" :value="country.zipcode">
        <!-- <span><img :src="url + country.flag" /> {{ country.zipcode }}</span>
        <span :class="$style.zipcode">{{ country.name }}</span> -->
        ({{ country.zipcode }}) - <span :class="$style.country">{{ country.name }}</span>
      </option>
    </select>
  </div>
</template>

<style module>
.form_group {
  margin-bottom: 1rem;
}

.country {
  color: red;
}

.form_group select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form_group label {
  display: block;
  margin-bottom: 0.5rem;
}

.label_group {
  display: flex;
  gap: 0.5rem;
}

option {
  background-color: #060657;
}
</style>
