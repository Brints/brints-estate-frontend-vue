<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

library.add(faUpload);
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
  <div :class="$style.form_group">
    <div className="flex">
      <span className="mr-2"><font-awesome-icon :icon="icon" /></span>

      <label :for="id"
        ><slot name="label">{{ label }}</slot></label
      >
    </div>
    <slot name="input">
      <input
        :class="$style.form_control"
        type="file"
        :id="id"
        :name="name"
        :multiple="multiple"
        @input="$emit('update:modelValue', $event.target.files[0])"
      />
    </slot>
  </div>
</template>

<style module>
.form_group {
  margin-bottom: 1rem;
}

.form_control {
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
