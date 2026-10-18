# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Deployment

To deploy the Digital Shiksha app (including the AI chatbot) to Vercel:
1. Ensure you have a Vercel project linked to this repository.
2. In the Vercel dashboard, add an Environment Variable:
   - **Name:** `VITE_OPENROUTER_API_KEY`
   - **Value:** your OpenRouter API key.
   - Mark it for **Production** (and optionally Preview/Development).
3. Vercel will automatically expose this variable to the built frontend because it is prefixed with `VITE_`.
4. The chatbot will detect the key on load and hide the manual API‑key input field.
5. Deploy the project; the chatbot should now work without any additional configuration.
