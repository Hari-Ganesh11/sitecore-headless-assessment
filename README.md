# Sitecore Headless Assessment — starter repo

Everything you need is in this repo. **Read `ASSESSMENT.md` first** — it has the
rules, the tasks and the marks.

> **No AI tools at all** for any part of this assessment, including the written
> answers. Please disable Copilot, Codeium, Tabnine, Cursor AI and editor AI
> autocomplete before you start. A 45-minute review call follows your
> submission, where you'll walk us through your code, explain your choices and
> make a change or two live.

## The three sections

| Section | What it is | Marks | Where you work |
| --- | --- | --- | --- |
| A | Logic building | 25 | `section-a/` |
| B | Headless frontend build | 35 | `section-b/` |
| C | Sitecore knowledge | 40 | `ANSWERS.md` |

About 3 to 4 hours in total. Section C is written answers only — no code, and no
C# anywhere in this assessment.

## Setup

Node.js 20 or newer.

```bash
# Section B — the Next.js app
cd section-b
npm install
npm run dev     # http://localhost:3000/services/cardiology

# Section A — plain TypeScript with Vitest
cd ../section-a
npm install
npm test        # the starter tests fail until you implement the functions
```

Both installs are small and independent. There's no root package.json by design.

The app is **Next.js 16 with the App Router**. If you've mostly worked in 13/14,
the main differences you'll hit here are that route `params` is a Promise (so
`await` it) and that metadata comes from `generateMetadata`. Nothing else in
these tasks depends on version-specific APIs — and if a version difference
trips you up, say so in your notes rather than fighting it.

## What's here

```
ASSESSMENT.md          the brief — tasks, rules, marks
ANSWERS.md             your A3 note and all sixteen Section C answers
mock/
  layout/services/cardiology.json   mock Layout Service response
  edge/articles.json                mock Experience Edge article search (page 1)
section-a/             logic problems — stubs, fixtures, starter tests
section-b/             Next.js app — catch-all route, data layer, component stubs
```

## What's already wired up

So you spend your time on the actual problems, not scaffolding:

- **Section A** — Vitest configured, types defined, the mock data and the A2
  sample list loaded as fixtures, one starter test per function.
- **Section B** — Next.js (App Router) with a catch-all route, `getLayoutData(path)`
  reading the mock files, TypeScript types for both payloads, empty component
  files, SASS and a baseline stylesheet, a mock `/api/articles` route serving
  page 1, and the two placeholder images the mock data references.
- **Section C** — `ANSWERS.md` has a heading per question, ready to fill in.

Everything marked `TODO` is yours. The stubs throw or return `null` on purpose,
so the starter tests fail and the page renders a placeholder until you build it.

## Submitting

1. Push to a Git repository (GitHub — public, or grant us access).
2. Commit as you go rather than in one final push. We read the commit history.
3. Fill in `ANSWERS.md` — the A3 note and all sixteen Section C answers.
4. Add a `NOTES.md` (or replace this README) covering: anything needed to run
   your work, assumptions you made, your rendering-strategy choice for Section
   B3 and why, how you handled the `<script>` in the rich text, and what you'd
   improve with more time.

Incomplete work still earns marks. A working B1–B2 with clear notes on what
you'd do next beats every task half-done, and a frank "I haven't set that up
myself, but here's what I've seen it do" beats a recited definition in Section C.

If the repo won't run or something in the brief is unclear, email us. Asking
costs you nothing.
