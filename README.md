# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Bureau Buddy

The global widget uses visitor interactions rather than route-specific prompts. Welcome is delayed 4 seconds; idle help follows 40 seconds without activity; scrolling past 50% and desktop exit intent can also prompt. On coarse-pointer devices, 120 seconds of inactivity replaces mouse exit intent. Desktop exit intent fires when the pointer moves upward within 20px of the viewport top. Each trigger type shows at most once per session, with a 30-second cooldown between automatic prompts. Enable debug logs with `localStorage.setItem("bureauBuddy:debug","1")`. The launcher remains available for manual use. Browser storage retains the welcome and session limits when available.

The PNG assets are in `public/assets/bureau-buddy/`. The widget uses `buddy_wave.png` for welcome, `buddy_thinking.png` for help, `buddy_introduce.png` for the default and pointing pose, and `buddy_celebrate.png` for an enquiry result while the panel is open. `buddy_thumbs_up.png` is also available for positive interactions. The guide and CTA images contain pre-rendered interface elements, so the standalone pointing pose is used instead. An unavailable pose falls back to the default image, then to an icon if that image also fails.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
