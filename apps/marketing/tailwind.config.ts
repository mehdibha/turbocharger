// tailwind config is required for editor support
import type { Config } from "tailwindcss";
import sharedConfig from "@turbocharger/tailwind-config/tailwind.config.ts";

const config: Pick<Config, "presets"> = {
  presets: [
    {
      ...sharedConfig,
      content: [
        "./**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}",
      ],
    },
  ],
};

export default config;
