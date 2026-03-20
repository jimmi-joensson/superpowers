# Model Selection Guide

When dispatching subagents, use the least powerful model that can succeed at the task. This conserves cost, increases speed, and reserves premium capacity for work that genuinely needs it.

## Model Discovery

Your dispatch tool (Task, spawn_agent, or equivalent) lists the models available to you. Before selecting models:

1. **Check your dispatch tool's `model` parameter** — it lists available models with descriptions
2. **Read the tier labels** in each model's description (e.g., "premium", "standard", "fast/cheap")
3. **Map ALL available models to tiers** regardless of provider — you may have models from Claude, GPT, Codex, Gemini, or others. Classify them all
4. **If only one model is available**, use it for everything. This guide only applies when you have choices

**Do not default to one provider.** If you have 3 fast-tier models from different providers, use them — don't always pick the same one. Distributing across providers at the same tier gives you resilience and lets you leverage different strengths.

## 3-Tier Classification

Map every available model into one of three tiers based on its label and known capabilities:

| Tier | Labels to look for | When to use |
|------|-------------------|-------------|
| **Premium** | "premium", or it's the most capable model available | Tasks requiring synthesis, design decisions, complex debugging, or broad codebase understanding |
| **Standard** | "standard", or it's the default model | Multi-file coordination, integration work, tasks needing judgment but not deep reasoning |
| **Fast** | "fast/cheap", "mini", or smallest available | Mechanical implementation, clear specs, isolated scope, well-defined single-file changes |

**If a model has no tier label**, classify by capability:
- Models known for extended thinking or deep reasoning → Premium
- General-purpose models → Standard
- Smaller, speed-optimized, or budget models → Fast

## Tier Selection Principles

1. **Default to the cheapest tier that can succeed.** Most tasks with clear specs are mechanical — use fast tier
2. **Escalate tier when the task requires reasoning or judgment.** If the agent needs to make design decisions, understand complex interactions, or synthesize information from multiple sources, step up
3. **Never use premium tier for mechanical work.** Fixing a typo, implementing a function from a complete spec, or running a well-defined refactor doesn't need deep reasoning
4. **When uncertain, use standard tier.** It handles most tasks well. Reserve premium for tasks you know are hard
5. **Re-escalate on failure.** If a fast-tier agent reports BLOCKED or produces poor results, re-dispatch at standard tier. If standard fails, consider premium
