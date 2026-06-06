import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { T as Tile } from "./tile-etvfymRs.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
const SplitErrorComponent = ({
  error,
  reset
}) => {
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tile, { className: "text-center py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-2", children: "Couldn't load progress" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
      router.invalidate();
      reset();
    }, children: "Try again" })
  ] });
};
export {
  SplitErrorComponent as errorComponent
};
