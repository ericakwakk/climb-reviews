import { ViewTransition } from "react";

// Wraps a page so navigating forward (into a gym) slides content left, and going back slides it right.
// Links say which direction they go with transitionTypes={["nav-forward"]} or ["nav-back"].
// Navigations without a type (browser back button) don't slide.
export default function PageTransition({ children }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
