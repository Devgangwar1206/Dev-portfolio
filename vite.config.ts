import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";

function neutralizeGsapTrial(): Plugin {
  return {
    name: "neutralize-gsap-trial",
    enforce: "pre",
    transform(code, id) {
      if (id.includes("gsap-trial")) {
        return {
          code: code
            .replace(/window\.location\.href\s*=\s*/g, "void ")
            .replace(/!1\s*!==\s*t\.config\(\)\.trialWarn/g, "false"),
          map: null,
        };
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [neutralizeGsapTrial(), react()],
});

