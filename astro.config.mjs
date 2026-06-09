// @ts-check
import { defineConfig, sessionDrivers } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	session: { driver: sessionDrivers.memory() },
	integrations: [mdx(), sitemap()],
	adapter: cloudflare({
		configPath: "./wrangler.dev.json",
		prerenderEnvironment: "node",
		platformProxy: {
			enabled: true,
		},
	}),
});
