<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faVenusMars } from "@fortawesome/free-solid-svg-icons";

library.add(faVenusMars);

export default {
  emits: ["update:modelValue"],
  components: {
    FontAwesomeIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
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
      selectedValue: this.value,
    };
  },

  watch: {
    value(newValue) {
      this.selectedValue = newValue;
    },
  },
};
</script>

<template>
  <div class="w-full">
    <div class="flex gap-2 mb-2 text-slate-700 font-medium">
      <span v-if="icon" class="text-indigo-500"><font-awesome-icon :icon="icon" /></span>
      <label :for="id" class="cursor-pointer">
        {{ label }}
        <span v-if="asterisk" class="text-red-500">{{ asterisk }}</span>
      </label>
    </div>

    <select 
      :id="id" 
      :name="name" 
      @change="$emit('update:modelValue', $event.target.value)"
      class="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-slate-800 cursor-pointer appearance-none"
    >
      <slot></slot>
    </select>
  </div>
</template>
