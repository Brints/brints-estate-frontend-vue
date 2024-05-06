<script>
import CountriesData from "@/lookup/country-codes.json";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Add the icons to the library
library.add(fas);

export default {
  components: {
    FontAwesomeIcon,
  },
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
      countries: CountriesData.countries,
    };
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
  },
};
</script>

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
      <option v-for="(country, index) in countries" :key="index" :value="country.zipcode">
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
