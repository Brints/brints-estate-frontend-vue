<script>
export default {
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
    <label :for="id"
      ><slot name="label">{{ label }}</slot></label
    >
    <slot name="select">
      <select
        :class="$style.form_control"
        :id="id"
        :name="name"
        v-model="selectedValue"
        @change="$emit('change', $event.target.value)"
      >
        <slot></slot>
      </select>
    </slot>
  </div>
</template>

<style module>
.form_group {
  margin-bottom: 1rem;
}

.form_control {
  width: 100%;
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
</style>
