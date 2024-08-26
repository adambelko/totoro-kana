import { defineConfig } from "vitest/config"
import { sveltekit } from "@sveltejs/kit/vite"
import purgeCss from "vite-plugin-tailwind-purgecss"

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"]
	}
})
