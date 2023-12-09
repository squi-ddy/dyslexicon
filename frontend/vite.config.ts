import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [react()],
    base: "/dyslexicon",
    define:
        // in development, amplifyjs relies on webpack or similiar somewhere so we need to add this for now
        command === "serve"
            ? {
                  global: {},
              }
            : undefined,
    // there's an issue with vite and amplifyjs that requires the following below (https://github.com/aws-amplify/amplify-js/issues/9639)
    resolve: {
        alias: {
            "./runtimeConfig": "./runtimeConfig.browser", //fix production build
        },
    },
}))
