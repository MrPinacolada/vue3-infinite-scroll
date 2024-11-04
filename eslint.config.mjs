// import pluginVue from "eslint-plugin-vue";
// export default [
//   ...pluginVue.configs["flat/recommended"],
//   {
//     rules: {},
//   },
// ];
// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from "eslint-plugin-vue";

// export default [
//   // Рекомендуемые правила для Vue
 

//   {
   
//     // Дополнительные настройки и правила
//     rules: {
//       "vue/no-unused-vars": "error", // Убираем неиспользуемые переменные в Vue
//       // Добавьте другие правила, если нужно
//     },
//   },
// ];

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],

);
