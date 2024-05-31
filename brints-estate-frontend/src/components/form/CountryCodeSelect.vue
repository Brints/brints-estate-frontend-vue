<script>
import CountriesData from "@/lookup/country-codes.json";
import { formatCountryCode } from "@/services/formatters";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

library.add(faGlobe);

export default {
  emits: ["update:modelValue"],
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
    modelValue: {
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
      countries: CountriesData.countries,
    };
  },

  computed: {
    formatCountryCode() {
      return formatCountryCode;
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

    <select :id="id" :name="name" @change="$emit('update:modelValue', $event.target.value)">
      <option value="">(Pick One)</option>
      <option v-for="(country, index) in countries" :key="index" :value="country.zipcode">
        {{ formatCountryCode(country) }}
      </option>
    </select>
  </div>
</template>

<style module>
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
  background-color: #696972;
  padding: 1rem 0;
  font-size: 1rem;
}

option:hover {
  background-color: #f4f4f4;
  padding: 1rem 0;
}
</style>
