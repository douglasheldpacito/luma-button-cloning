import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useParams, useLoaderData, useActionData, useMatches, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
import { twMerge } from "tailwind-merge";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
const themeColorsStyles = {
  PINK: {
    gradient: "from-[#f6539d]/10 to-[#f6539d]",
    text: "text-[#f6539d]",
    background: "bg-[#f6539d]/10"
  },
  ORANGE: {
    gradient: "from-[#ff3e00]/10 to-[#ff3e00]",
    text: "text-[#ff3e00]",
    background: "bg-[#ff3e00]/10"
  },
  GREEN: {
    gradient: "from-[#5ce65c]/10 to-[#5ce65c]",
    text: "text-[#5ce65c]",
    background: "bg-[#5ce65c]/10"
  },
  YELLOW: {
    gradient: "from-[#ffde21]/10 to-[#ffde21]",
    text: "text-[#ffde21]",
    background: "bg-[#ffde21]/10"
  }
};
const AnimatedButton = ({
  theme = "PINK",
  children
}) => {
  const [effectPosition, setEffectPosition] = useState({
    left: "0",
    top: "0",
    opacity: 0
  });
  const moveEffect = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    setEffectPosition({
      left: `${mouseX}px`,
      top: `${mouseY}px`,
      opacity: 1
    });
  };
  const hideEffect = () => {
    setEffectPosition((prev) => ({ ...prev, opacity: 0 }));
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: "relative overflow-hidden rounded-xl p-2 w-60 bg-white/10 shadow-lg transition-all hover:cursor-pointer",
      onMouseMove: moveEffect,
      onMouseLeave: hideEffect,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-[1px] bg-[#131517] rounded-xl pointer-events-none" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-[-10px] pointer-events-none transition-opacity duration-300 saturate-200",
            style: {
              opacity: effectPosition.opacity,
              maskImage: `radial-gradient(160px at ${effectPosition.left} ${effectPosition.top}, rgb(255, 255, 255), rgba(255, 255, 255, 0))`
            },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-[-10px] bg-gradient-to-r ${themeColorsStyles[theme].gradient}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-[1px] bg-[#222425]/80 rounded-xl" }),
        /* @__PURE__ */ jsx("div", { className: "relative flex items-center gap-3 pointer-events-none transition-all duration-300", children })
      ]
    }
  );
};
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col items-center justify-center h-screen bg-black gap-10",
    children: [/* @__PURE__ */ jsx(AnimatedButton, {
      theme: "PINK",
      children: /* @__PURE__ */ jsx(CustomContent, {
        theme: "PINK",
        children: "Pink"
      })
    }), /* @__PURE__ */ jsx(AnimatedButton, {
      theme: "ORANGE",
      children: /* @__PURE__ */ jsx(CustomContent, {
        theme: "ORANGE",
        children: "Orange"
      })
    }), /* @__PURE__ */ jsx(AnimatedButton, {
      theme: "GREEN",
      children: /* @__PURE__ */ jsx(CustomContent, {
        theme: "GREEN",
        children: "Green"
      })
    }), /* @__PURE__ */ jsx(AnimatedButton, {
      theme: "YELLOW",
      children: /* @__PURE__ */ jsx(CustomContent, {
        theme: "YELLOW",
        children: "Yellow"
      })
    })]
  });
});
function CustomContent({
  theme = "PINK",
  children
}) {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("div", {
      className: twMerge("flex items-center justify-center bg-opacity-10 p-2 w-10 h-10 rounded-lg", themeColorsStyles[theme].background, themeColorsStyles[theme].text),
      children: /* @__PURE__ */ jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 50 50",
        children: /* @__PURE__ */ jsx("path", {
          fill: "currentColor",
          d: "M48 13.208v22.704c0 1.504-.828 1.332-1.533.783L36.5 29.25v-9.38l9.967-7.446c.87-.725 1.533-.556 1.533.784M27.553 12c3.768-.017 6.837 3.071 6.856 6.9v16.936a1.25 1.25 0 0 1-1.246 1.255H8.856c-3.768.017-6.837-3.071-6.856-6.9V13.255A1.25 1.25 0 0 1 3.246 12Z"
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "flex-1 text-white m-2",
      children: /* @__PURE__ */ jsx("div", {
        className: "text-ellipsis text-left",
        children
      })
    }), /* @__PURE__ */ jsx("div", {
      className: twMerge("flex items-center justify-center w-[18px] h-[18px] rounded-full", themeColorsStyles[theme].text),
      children: /* @__PURE__ */ jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 16 16",
        children: /* @__PURE__ */ jsx("path", {
          fill: "currentColor",
          fillRule: "evenodd",
          d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m4.198-9.784a1 1 0 1 0-1.396-1.432l-4.3 4.189-1.19-1.656a1 1 0 1 0-1.624 1.166l1.866 2.6a1 1 0 0 0 1.51.133z"
        })
      })
    })]
  });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/luma-button-cloningassets/entry.client-CMQyDY-d.js", "imports": ["/luma-button-cloningassets/chunk-IR6S3I6Y-ts1_Wbkx.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/luma-button-cloningassets/root-BGdIuwpx.js", "imports": ["/luma-button-cloningassets/chunk-IR6S3I6Y-ts1_Wbkx.js", "/luma-button-cloningassets/with-props-l67OtWdV.js"], "css": ["/luma-button-cloningassets/root-DlthxM0U.css"] }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/luma-button-cloningassets/home-B5DJEbMx.js", "imports": ["/luma-button-cloningassets/with-props-l67OtWdV.js", "/luma-button-cloningassets/chunk-IR6S3I6Y-ts1_Wbkx.js"], "css": [] } }, "url": "/luma-button-cloningassets/manifest-50002ad0.js", "version": "50002ad0" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/luma-button-cloning";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  publicPath,
  routes
};
