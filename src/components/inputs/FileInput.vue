<template>
  <input-scaffold>
    <div class="flex justify-between w-full">
      <input-label class="mb-2" :text="label" />
      <font-awesome-icon v-if="previewsImage" :icon="`fa-solid ${previewVisible ? 'fa-eye-slash' : 'fa-eye'}`" class="p-1 mr-2 image_preview_icon" @click="previewVisible = !previewVisible" />
    </div>

    <template v-if="previewsImage && previewVisible">
      <img v-if="imagePreview" :src="imagePreview" class="image_preview" />
      <div v-else class="image_preview p-2 text-center flex place-items-center text-blue-900/80">Sube una imagen para poder verla</div>
    </template>

    <input class="hidden" type="file" ref="fileInput" :id="name" :name="name" @input="handle" @blur="handleBlur" @change="handleChangeWrapper" :accept="accept" />
    <div class="flex gap-x-3 input-style outline-none !py-0 !px-0 items-center" :class="[vClass, isInvalid ? 'input-state-invalid' : 'input-state-valid']" @click="fileInput.click()">
      <div type="prevent" class="shrink-0 rounded h-full font-semibold p-1 border-0 text-primary-900 bg-primary-700/30 hover:bg-primary-700/50 my-auto flex items-center">Seleccionar archivo</div>
      <p class="grow truncate shrink">{{ value ? value.name : "No se ha seleccionado un archivo" }}</p>
      <font-awesome-icon v-if="value" icon="fa-solid fa-xmark" class="p-1 mr-2" @click="resetField" />
    </div>
    <span v-if="errors.length">{{ errors[0] }}</span>
  </input-scaffold>
</template>
<script setup>
import InputLabel from "./InputLabel.vue";
import { InputScaffold } from "./";
import { veeValidatableProps, veeValidateState } from "@/composables/useInputComposition";
import { computed, ref } from "vue-demi";
import { toRefs, onMounted } from "vue";

const props = defineProps({
  ...veeValidatableProps({
    file: {
      type: [File, String, Object],
      default: null,
    },
    vClass: {
      type: String,
      default: "",
    },
    previewsImage: {
      type: Boolean,
      default: true,
    },
    accept: {
      type: String,
    },
  }),
});

const previewVisible = ref(false);
const fileInput = ref(null);
const { file, initialValue, ..._props } = toRefs(props);

const emit = defineEmits(["update:file"]);

const { name, value, errors, stateClass, handleChange, handleBlur, validate, isInvalid, setState } = veeValidateState(_props, {
  modelPropName: "file",
  initialValue: initialValue.value,
});

const handleChangeWrapper = async (e) => {
  const files = e.target.files;
  if (files.length) {
    handleChange(files[0], false);
  }
  await validate();
};

const resetField = async () => {
  handleChange(null, false);
  await validate();
};

const isFileTheAnswer = computed(() => value.value instanceof File);

const imagePreview = computed(() => (value.value ? (!isFileTheAnswer.value ? value.value.preview : URL.createObjectURL(value.value)) : null));

onMounted(() => {
  if (initialValue.value && initialValue.value != "" && isFileTheAnswer.value) {
    setState({
      touched: true,
      errors: [],
    });
  }
});
</script>

<style lang="postcss" scoped>
.input-style {
  @apply w-full
        border-2 border-transparent
        bg-gray-100
        hover:bg-primary-300 hover:bg-primary-50
        focus:bg-primary-100 focus:ring-0 focus:border-2 focus:border-primary-600 h-11 text-sm text-gray-900
        hover:border-primary-200
        rounded-lg
        cursor-pointer
        dark:text-gray-600 dark:placeholder-gray-400;
}

.image_preview {
  @apply aspect-square h-36 w-36 md:h-48 md:w-48 bg-gray-100 border border-gray-400 rounded-md my-2 justify-center self-center;
}

.image_preview_icon {
  @apply h-4 w-4 rounded-full bg-primary-700/30 p-1.5 text-primary-900/80;
}
</style>
