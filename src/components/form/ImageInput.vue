<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUpload, faImage } from "@fortawesome/free-solid-svg-icons";

library.add(faUpload, faImage);

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
    multiple: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <div class="w-full">
    <div class="flex gap-2 mb-2 text-slate-700 font-medium">
      <span v-if="icon" class="text-indigo-500"><font-awesome-icon :icon="icon" /></span>
      <label :for="id" class="cursor-pointer">
        <slot name="label">{{ label }}</slot>
      </label>
    </div>
    <slot name="input">
      <input
        class="w-full h-12 px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        type="file"
        :id="id"
        :name="name"
        :multiple="multiple"
        @input="$emit('update:modelValue', $event.target.files[0])"
      />
    </slot>
  </div>
</template>
