<script>
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
  <div :class="$style.form_group">
    <div :class="$style.label_group">
      <span><font-awesome-icon :icon="icon" /></span>
      <label :for="id"
        >{{ label }}<span v-if="asterisk" class="text-red-500">{{ asterisk }}</span></label
      >
    </div>

    <select :id="id" :name="name" v-model.trim="selectedValue">
      <slot></slot>
    </select>
  </div>
</template>

<style module>
.form_group {
  margin-bottom: 1rem;
}

select {
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
}

.form_control:focus {
  outline: none;
  border-color: rgb(79 70 229);
}

.form_group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form_group select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form_group select:focus {
  outline: none;
  border-color: rgb(79 70 229);
}

.form_group select option {
  padding: 0.5rem;
  background-color: #3d3a3a;
  border-radius: 5px;
  padding: 0.5rem;
}

.form_group select option:hover {
  background-color: #f5f5f5;
}

.form_group select option:checked {
  background-color: rgb(79 70 229);
  color: #f5f5f5;
}

.form_group select option:checked:hover {
  background-color: rgb(79 70 229);
  color: #f5f5f5;
}

.form_group select option:focus {
  outline: none;
}

.label_group {
  display: flex;
  gap: 0.5rem;
}
</style>
