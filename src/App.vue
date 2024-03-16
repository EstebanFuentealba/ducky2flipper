<script>
import { translate_duckyscript_to_js } from "./utils/duck2fz";

export default {
  computed: {
    flipperZeroScript() {
      return translate_duckyscript_to_js(this.duckyScript);
    },
  },
  data() {
    return {
      MONACO_EDITOR_OPTIONS: {
        automaticLayout: true,
        formatOnType: true,
        formatOnPaste: true,
      },
      duckyScript: `REM ----
REM Insert DuckyScript Here
REM ----
      `,
    };
  },
  methods: {
    handleMount() {},
  },
};
</script>

<template>
  <div class="flex flex-col h-full items-center justify-center">
    <div class="flex flex-row font-bold bg-white p-4 rounded-md shadow-md">
      <div class="text-yellow-400 ducky">DUCKY</div>
      <span class="text-xl rotate-[15deg] to">2</span
      ><span class="text-orange-400 flipper">FLIPPER</span>
    </div>
    <div class="w-3/4 flex bg-gray-200 w-full gap-2 m-4 h-4/6 p-4">
      <div class="border border-gray-300 rounded-md bg-white flex-1 p-2 h-auto">
        <vue-monaco-editor
          v-model:value="duckyScript"
          :options="MONACO_EDITOR_OPTIONS"
          language="js"
          @mount="handleMount"
        />
      </div>
      <div class="border border-gray-300 rounded-md bg-white flex-1 p-2">
        <vue-monaco-editor
          v-model:value="flipperZeroScript"
          :options="MONACO_EDITOR_OPTIONS"
          language="javascript"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

.ducky, .flipper, .to {
  text-shadow: #000 0px 0 1px;
}
</style>
