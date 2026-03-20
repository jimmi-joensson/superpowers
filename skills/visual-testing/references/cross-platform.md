# Cross-Platform Visual Testing

Strategies for testing visual consistency across platforms and devices.

## Platform Matrix

| Dimension | Options | Tool Support |
|-----------|---------|-------------|
| OS | iOS, Android, Web | Maestro (all), Playwright (web), Detox (mobile) |
| Browser | Chromium, Firefox, WebKit | Playwright (all three) |
| Viewport | Mobile, Tablet, Desktop | All tools |
| Theme | Light, Dark | All tools (with setup) |
| Locale | LTR, RTL, various lengths | All tools (with config) |

## Execution Strategies

### Strategy 1: Single Tool, Multiple Targets

Run same tests across targets with one tool:

**Playwright (Web — cross-browser):**
```bash
# Test across all browsers
npx playwright test --project=chromium --project=firefox --project=webkit

# Test across viewports (configured in playwright.config.ts)
npx playwright test --project=mobile --project=desktop
```

**Maestro (Mobile — cross-device):**
```bash
maestro test flows/ --device <ios-sim> --device <android-emu>
```

### Strategy 2: Parallel Subagents

When tests need per-platform analysis:

```
Main Agent
├── iOS Agent (Maestro MCP → iOS simulator)
├── Android Agent (Maestro MCP → Android emulator)
├── Web Agent (Playwright → Chromium/Firefox/WebKit)
└── Collect & compare results
```

### Strategy 3: CI Pipeline

Run visual tests in CI with matrix strategies:

```yaml
# GitHub Actions example
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
    viewport: [mobile, desktop]
steps:
  - run: npx playwright test --project=${{ matrix.browser }}-${{ matrix.viewport }}
```

## Cross-Platform Analysis Checklist

When comparing screenshots across platforms:

### Visual Consistency
- [ ] Same content visible on all platforms
- [ ] Colors match (account for platform color profiles)
- [ ] Fonts render similarly (platform fonts will differ)
- [ ] Icons consistent (or appropriately platform-native)

### Layout
- [ ] Safe areas handled correctly (notch, status bar, nav bar)
- [ ] Keyboard doesn't obscure content
- [ ] Responsive breakpoints work correctly (web)
- [ ] Landscape orientation works (if supported)

### Interactions
- [ ] Touch/click targets appropriate size
- [ ] Scroll behavior consistent
- [ ] Back navigation works on all platforms
- [ ] Hover states present (web), press states present (mobile)

### Data
- [ ] Same data loads on all platforms
- [ ] Counts and aggregations match
- [ ] Empty/error states consistent

## Acceptable Differences

Not all differences are bugs:

| Difference | Accept? | Why |
|-----------|---------|-----|
| System fonts | ✅ | SF Pro (iOS) vs Roboto (Android) vs system (web) |
| Navigation chrome | ✅ | Platform conventions differ |
| Scrollbar styling | ✅ | OS-controlled |
| Sub-pixel rendering | ✅ | Anti-aliasing differs |
| Animation timing | ✅ | Platform GPU differences |
| Colors (slight) | ⚠️ | Check color profiles; P3 vs sRGB |
| Layout shifts | ❌ | Content should match |
| Missing elements | ❌ | Feature parity expected |

## Performance Tips

1. **Parallelize** — Run platforms simultaneously, not sequentially
2. **Smoke first** — Run critical paths on all platforms, full suite on primary only
3. **Share baselines carefully** — Platform-specific baselines, not shared across platforms
4. **Use CI for full matrix** — Local: primary platform only; CI: full cross-platform
