import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import { fn } from "@storybook/test";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    actions: { "^on[A-Z].*": fn() },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
