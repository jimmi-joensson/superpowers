# Visual Testing Tools

Comparison of tools for capturing and comparing UI screenshots. Choose based on platform, project setup, and comparison needs.

## Tool Matrix

| Tool | Platform | Capture | Comparison | Best For |
|------|----------|---------|------------|----------|
| Playwright | Web | Built-in | Pixel diff (toMatchSnapshot) | Web apps, cross-browser (**recommended for web**) |
| Maestro | iOS, Android, Web | MCP or CLI | AI analysis / external diff | Mobile apps, React Native (**recommended for mobile**) |
| Cypress | Web | Plugin | Percy / external | E2E with visual regression |
| Storybook + Chromatic | Components | Automatic | Cloud visual diff | Component libraries |
| Percy (BrowserStack) | Web, Mobile | SDK | Cloud visual diff | CI/CD visual regression |
| BackstopJS | Web | Playwright | Built-in pixel diff | Quick visual regression |
| Applitools | Web, Mobile | SDK | AI-powered visual diff | Cross-platform, smart comparison |

## Detailed Profiles

### Playwright (Web — Recommended for web projects)
- Built-in `page.screenshot()` and `expect(screenshot).toMatchSnapshot()`
- Cross-browser (Chromium, Firefox, WebKit)
- Headless by default, CI-friendly
- Pixel-level and threshold-based comparison built in
- Update baselines: `npx playwright test --update-snapshots`

### Maestro (Mobile — Recommended for mobile projects)
- MCP integration: `maestro:take_screenshot`, `maestro:tap_on`, etc.
- CLI: `maestro test flows/ --output ./artifacts`
- iOS, Android, Web (Chromium)
- No built-in pixel comparison — pair with AI analysis or external diff
- Best with React Native, Flutter, native apps

### Storybook + Chromatic (Components)
- Automatic screenshot of every story variant
- Cloud-based visual diff with approval workflow
- Catches component-level regressions
- No full-page or flow testing — component isolation only

### Percy / Applitools (CI/CD Integration)
- SDK integrates into existing test frameworks
- Cloud comparison with smart diff (ignores anti-aliasing, dynamic content)
- Approval workflows, baseline management
- Cost: paid service

### BackstopJS (Quick Setup)
- Config-driven screenshot comparison
- Built-in diff reports (HTML viewer)
- Good for: "I just need before/after comparison on these URLs"

## AI-Assisted Visual Analysis

When pixel-perfect comparison tools aren't available or practical, use AI visual analysis:

1. Capture screenshots with any available tool
2. Present to the agent (as image) alongside the design reference
3. Agent evaluates: layout, typography, color, spacing, alignment
4. Works with any platform — no tooling dependency
5. Less precise than pixel diff but catches structural/design issues

**When to prefer AI analysis over pixel diff:**
- Comparing against design mockups (not previous code screenshots)
- Cross-platform comparisons (iOS vs Android render differently)
- Dynamic content (timestamps, user data change between runs)
- Initial implementation (no baseline exists yet)

## Selection Guide

```
Is this a web project?
├── Yes → Does the project use Playwright already?
│   ├── Yes → Use Playwright screenshot comparison
│   └── No → Is it component-focused?
│       ├── Yes → Use Storybook + Chromatic
│       └── No → Add Playwright or use BackstopJS for quick setup
├── Is this a mobile project?
│   ├── Yes → Is Maestro MCP available?
│   │   ├── Yes → Use Maestro + AI analysis
│   │   └── No → Use Detox (React Native) or XCTest/Espresso (native)
│   └── No → Is this component-level testing?
│       └── Yes → Storybook + Chromatic
└── Fallback: Use any screenshot tool + AI visual analysis
```
