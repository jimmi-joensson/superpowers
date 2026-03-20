# Visual Testing Patterns

Patterns for organizing and writing visual tests. Examples shown for Playwright and Maestro — adapt to your tool.

## Test Organization

### Directory Structure

```
visual-tests/
├── smoke/              # Critical path — run on every commit
│   ├── home.spec.ts    # (Playwright)
│   └── home.yaml       # (Maestro)
├── screens/            # Per-screen visual tests
│   ├── login.spec.ts
│   └── dashboard.spec.ts
├── features/           # Feature-specific flows
│   ├── search.spec.ts
│   └── checkout.spec.ts
├── components/         # Component-level (if using Storybook)
│   └── button.stories.ts
└── baselines/          # Reference screenshots
    └── home-default.png
```

### Naming Convention

```
{screen}-{state}-{variant}.png

Examples:
- home-default-desktop.png
- home-default-mobile.png
- login-error-invalid-email.png
- dashboard-loading-skeleton.png
- checkout-empty-cart.png
```

## Capture Patterns

### Playwright
```typescript
// Full page screenshot
await page.screenshot({ path: 'screenshots/home-full.png', fullPage: true });

// Element screenshot
const header = page.locator('header');
await header.screenshot({ path: 'screenshots/header.png' });

// Visual comparison
await expect(page).toHaveScreenshot('home-default.png', {
  maxDiffPixels: 100,
  threshold: 0.2,
});

// Responsive capture
for (const viewport of [{ width: 375, height: 812 }, { width: 1440, height: 900 }]) {
  await page.setViewportSize(viewport);
  await page.screenshot({ path: `screenshots/home-${viewport.width}.png` });
}
```

### Maestro
```yaml
appId: ${APP_ID}
---
- launchApp
- assertVisible: "Home"
- takeScreenshot: home-default
- tapOn: "Menu"
- assertVisible: "Settings"
- takeScreenshot: menu-open
```

## Selector Strategies

| Priority | Playwright | Maestro |
|----------|-----------|---------|
| 1st | `getByRole()`, `getByText()` | text match |
| 2nd | `getByTestId()` | testID |
| 3rd | CSS selector | index |
| Avoid | XPath, nth-child | fragile index chains |

## Wait Strategies

Handle async content before capturing:

### Playwright
```typescript
// Wait for network idle
await page.waitForLoadState('networkidle');

// Wait for specific element
await page.waitForSelector('[data-loaded="true"]');

// Wait for animations
await page.waitForTimeout(300); // after known animation
```

### Maestro
```yaml
- assertVisible:
    text: "Loaded"
    timeout: 10000
- waitForAnimationToEnd:
    timeout: 3000
```

## Common Test Scenarios

### Navigation Flow
Capture each screen in a user journey.

### State Verification
Capture loading → loaded → error → empty states for each screen.

### Responsive Breakpoints (Web)
Capture at mobile (375px), tablet (768px), desktop (1440px) viewpoints.

### Cross-Browser (Web)
Run same tests across Chromium, Firefox, WebKit.

### Cross-Platform (Mobile)
Run same flows on iOS and Android, compare for consistency.

## Anti-Patterns

- Capturing screenshots during animations (flaky baselines)
- Not waiting for fonts/images to load
- Hardcoding viewport sizes instead of using named breakpoints
- Storing baselines in gitignore'd directories (lost on clone)
- Too many screenshots per test (slow, noisy diffs)
