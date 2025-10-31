import { createRoot } from "react-dom/client";

new Promise((resolve) => {
  setTimeout(resolve, 1000);
})
  .then(() => import("./App"))
  .then(({ default: App }) => {
    const root = createRoot(document.getElementById("root")!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    root.render(<App />);
  })
  .catch((error) => {
    console.error(error);
  });
