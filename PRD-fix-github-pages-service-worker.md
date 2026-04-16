# PRD: Fix Root GitHub Pages Service Worker Interfering With Projects

## Context

The `https://baltazarparra.github.io/` domain hosts multiple projects through GitHub Pages, including:

- `https://baltazarparra.github.io/`
- `https://baltazarparra.github.io/ai-native-engineering/`
- other projects published under subpaths of the same domain

When accessing `https://baltazarparra.github.io/ai-native-engineering/`, the browser sometimes loads content from the root site at `https://baltazarparra.github.io/`. The same behavior appears in other projects published under the same domain.

A Service Worker was identified at:

```txt
https://baltazarparra.github.io/sw.js
```

That Service Worker is registered at the root scope (`/`) and uses Workbox with a broad navigation fallback to `index.html`. Because Service Workers operate by origin and scope, a Service Worker registered at `/` can intercept navigations for any subpath under the same domain, including `/ai-native-engineering/`.

## Problem

The root site's Service Worker is intercepting navigations for projects hosted in GitHub Pages subdirectories and responding with the root site's `index.html`.

This causes:

- incorrect loading of projects under subpaths;
- inconsistent behavior between normal browser windows and private/incognito windows;
- confusion during deploys, making the issue look like GitHub Pages cache when it is actually local Service Worker cache/control;
- risk of affecting every project under `baltazarparra.github.io/<project-name>/`.

## Goal

Ensure the root `baltazarparra.github.io` site does not intercept, cache, or provide navigation fallback responses for projects published under subpaths.

Accessing:

```txt
https://baltazarparra.github.io/ai-native-engineering/
```

must load only the `ai-native-engineering` project, without receiving HTML, assets, or fallback responses from the root site.

## Non-Goals

- Do not change the `ai-native-engineering` project.
- Do not change the GitHub Pages configuration for subpath projects.
- Do not create a custom domain in this step.
- Do not rewrite the entire root site architecture unless required to remove or constrain the Service Worker.

## Technical Hypothesis

The target repository is the project published at:

```txt
https://baltazarparra.github.io/
```

That repository likely uses a PWA or Workbox configuration that generates `sw.js`. The current navigation fallback likely accepts all routes, equivalent to:

```js
allowlist: [/./];
```

or a `navigateFallback` configuration without a `denylist`.

## Functional Requirements

### FR1: Remove or Restrict the Root Site Service Worker

Choose one of these approaches:

1. Preferred: remove the Service Worker/PWA from the root site if offline functionality is not required.
2. Alternative: keep the Service Worker, but prevent it from controlling routes for projects under subpaths.

### FR2: Prevent Navigation Fallback for Projects Outside the Root Site

If the Service Worker is kept, it must explicitly deny routes such as:

```txt
/ai-native-engineering/
/ai-native-engineering/*
```

and any other projects hosted under `baltazarparra.github.io/<project-name>/`.

Conceptual Workbox example:

```js
navigateFallbackDenylist: [
  /^\/ai-native-engineering(\/|$)/,
  /^\/another-project(\/|$)/,
];
```

The exact option name may vary depending on the tool used in the target repository.

### FR3: Clean Up Existing Clients

The fix must account for users who already have the old Service Worker installed.

The project must include a strategy to unregister or replace the old Service Worker. Possible options:

- remove the `navigator.serviceWorker.register(...)` call;
- publish a temporary `sw.js` that runs `self.registration.unregister()`;
- provide manual cleanup instructions for local validation.

Example temporary unregistering `sw.js`:

```js
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration
      .unregister()
      .then(() => self.clients.matchAll())
      .then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      }),
  );
});
```

Use this approach only if it makes sense for the target repository stack.

### FR4: Do Not Affect Normal Root Site Assets

If the Service Worker is kept, it may still cache root site assets, but it must not respond with HTML fallback for routes belonging to other projects.

## Non-Functional Requirements

- The solution must be simple to understand and maintain.
- The fix must avoid a generic global navigation allowlist.
- The solution must work in modern Chrome, Edge, Firefox, and Safari.
- The behavior must be predictable after deployment to GitHub Pages.

## Implementation Plan

### Step 1: Locate the Service Worker Source

In the root repository, search for:

```bash
rg -n "serviceWorker|sw\\.js|workbox|PWA|registerRoute|navigateFallback|generateSW|injectManifest|vite-plugin-pwa|next-pwa|gatsby-plugin-offline"
```

Identify:

- where `sw.js` is generated;
- where the Service Worker is registered in the browser;
- which library/plugin generates the Workbox configuration.

### Step 2: Choose the Approach

If the root site does not need offline support:

- remove the PWA/Workbox plugin;
- remove the client-side Service Worker registration;
- ensure the old `sw.js` stops being published, or temporarily publish an unregistering `sw.js`.

If the root site must keep PWA/offline support:

- configure a navigation denylist for projects under subpaths;
- restrict fallback to routes that belong only to the root site;
- avoid `allowlist: [/./]` for global navigation.

### Step 3: Implement the Fix

Apply the smallest possible change:

- remove the PWA configuration, or
- adjust Workbox to deny `/ai-native-engineering`, or
- replace `sw.js` with a temporary unregister script.

### Step 4: Build and Deploy

Run the target repository commands, for example:

```bash
npm run build
```

Then publish to GitHub Pages using the existing root repository flow.

### Step 5: Validate

Run validation with `curl`:

```bash
curl -I https://baltazarparra.github.io/
curl -I https://baltazarparra.github.io/sw.js
curl -I https://baltazarparra.github.io/ai-native-engineering/
```

Validate in the browser:

1. Open DevTools.
2. Go to Application > Service Workers.
3. Confirm there is no root Service Worker intercepting `/ai-native-engineering/`, or that the new Service Worker does not control that path.
4. Open `https://baltazarparra.github.io/ai-native-engineering/`.
5. Confirm the loaded content belongs to the `ai-native-engineering` project.

To simulate a user with old cache:

```js
const registrations = await navigator.serviceWorker.getRegistrations();
await Promise.all(
  registrations.map((registration) => registration.unregister()),
);

const cacheNames = await caches.keys();
await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));

location.reload();
```

## Acceptance Criteria

- `https://baltazarparra.github.io/` still loads correctly.
- `https://baltazarparra.github.io/ai-native-engineering/` loads the correct project.
- Reloading the page does not swap the content back to the root site.
- Normal and private/incognito windows show the same correct project.
- DevTools does not show the root Service Worker responding to navigations for `/ai-native-engineering/`.
- Other projects under subpaths also stop being intercepted.
- The HTML returned by `curl https://baltazarparra.github.io/ai-native-engineering/` contains metadata from the `AI-Native Engineering` project, not from the root site.

## Risks

- Users who already installed the old Service Worker may continue seeing incorrect behavior until the browser updates or removes the Service Worker.
- If the root site depends on PWA/offline support, fully removing the Service Worker may remove that functionality.
- GitHub Pages adds short-lived HTTP cache, so changes may take a few minutes to appear even after deployment.

## Rollback

If the change breaks the root site:

1. Revert the change commit in the root repository.
2. Deploy again.
3. Clear the local Service Worker/cache to validate.

If the problem returns after rollback, consider keeping the Service Worker removed until there is a safe per-subpath configuration.

## Definition of Done

The task is done when:

- the root site does not intercept navigations for projects under subpaths;
- the `ai-native-engineering` project opens correctly in a normal browser window after clearing or updating the old Service Worker;
- the PR clearly explains that the cause was a root-scope Service Worker with broad navigation fallback;
- the validation steps were executed and documented in the PR.
