import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

const app = createApp(App)
app.use(VueMonacoEditorPlugin, {
    paths: {
      // The recommended CDN config
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
    },
  })
app.mount('#app')
