import { ReactElement, StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";

window.foo = "bar";

export default function App(): ReactElement {
  return (
    /**
     * @NOTE Be aware that StrictMode has some important behaviours **in DEV mode**:
     * - https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
     * - https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
     */
    <StrictMode>
      <ErrorBoundary fallback={<h3>An error has occurred</h3>}>
        <h3>Hello World</h3>
      </ErrorBoundary>
    </StrictMode>
  );
}
