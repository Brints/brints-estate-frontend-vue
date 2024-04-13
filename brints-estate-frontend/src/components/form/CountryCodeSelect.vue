<script>
import CountriesData from "@/lookup/country-codes.json";

export default {
  props: {
    id: {
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
  },

  data() {
    return {
      selectedValue: this.value,
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

<template>
  <div :class="$style.form_group">
    <slot name="label">
      <span><font-awesome-icon :icon="icon" /></span>
      <label :for="id">{{ label }}</label>
    </slot>

    <select :id="id" :name="name" v-model.trim="selectedValue">
      <option value="">Country Code</option>
      <option v-for="country in countries" :key="country.code" :value="country.code">
        <span>{{ flagEmoji(country.flag) }}</span>

        {{ country.name }} {{ country.zipcode }}
      </option>
    </select>
  </div>
</template>

<style module>
.form_group select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select:focus {
  outline: none;
  border-color: #2563eb;
}

select option {
  background-color: #3d3a3a;
  padding: 0.5rem;
}

select option:hover {
  background-color: #2563eb;
  color: white;
}

img {
  width: 30px;
  height: 30px;
  margin-right: 0.5rem;
}

.form_group label {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
