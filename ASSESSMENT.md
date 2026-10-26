# Sitecore Headless Frontend Developer — Technical Assessment

Take-home assessment · 100 marks · ~3–4 hours

## Instructions

Welcome, and thanks for your interest in this role. This is a take-home assessment in three sections worth 100 marks. Expect about 3 to 4 hours of work. Please submit within 4 days of receiving it.

No Sitecore instance is needed. A starter Next.js repo is shared along with this brief. It contains the mock Sitecore data shown in the next section, in the same shape the Layout Service and Experience Edge return.

After you submit, we'll hold a 45-minute review call where you walk us through your code, explain your choices, and make a small change or two live. That call carries as much weight as the submission itself, so only submit work you can explain and modify on your own.

**Rules**

- **No AI tools at all.** No Copilot, ChatGPT, Claude, Gemini, Cursor, Codeium, Tabnine, AI autocomplete, or any AI-assisted code generation, for any part of this assessment, including the written answers. Please disable AI extensions in your editor before you start. We want to see how you think and write code, not what a model produces.
- Official documentation and normal web reference are fine: MDN, Next.js, React, TypeScript, and Sitecore docs. Don't copy a solution wholesale from a blog or repo. If you adapt something, note where it came from.
- TypeScript throughout. Section C is written answers only — no code, and no C# anywhere in this assessment.
- Written answers should be short and specific. Bullet points are fine. "I don't know, but here's how I'd find out" is a good answer, and a better one than a confident guess.
- If something is ambiguous, make an assumption, note it in your NOTES.md, and move on.
- Work at your own pace within the deadline. The hour estimates are guidance, not a timer.

**What to submit**

- A Git repository (GitHub, public or with access granted to us) based on the starter repo, with your work in `/section-a` and `/section-b`.
- `ANSWERS.md` with your Section A3 note and all of Section C.
- A `NOTES.md` (or your own README in place of ours) covering: anything needed to run your work, your assumptions, your Section B3 rendering-strategy choice and why, how you handled the `<script>` in the rich text, and what you'd improve with more time.
- Commit as you go rather than in one final push. We look at commit history.

**Before you start**

- Node.js 20+, Git, and your usual editor installed and working.
- AI extensions disabled.
- Clone the starter repo and confirm it runs.
- If anything in this brief is unclear or the repo won't run, email us. Asking is not a penalty.

## Shared mock data

Sections A and B use the two JSON files below. Both are already in the starter repo at `mock/layout/services/cardiology.json` and `mock/edge/articles.json`.

**File 1 — Layout Service response for `/services/cardiology`**

```json
{
  "sitecore": {
    "context": {
      "pageEditing": false,
      "site": { "name": "hospital" },
      "language": "en",
      "itemPath": "/services/cardiology"
    },
    "route": {
      "name": "cardiology",
      "itemId": "8f1c2a4e-1b2d-4c3e-9f10-aa11bb22cc33",
      "templateName": "Service Page",
      "fields": {
        "pageTitle": { "value": "Cardiology Services" },
        "metaDescription": { "value": "Heart care, diagnostics and cardiac surgery." }
      },
      "placeholders": {
        "headless-main": [
          {
            "uid": "c1",
            "componentName": "Hero",
            "dataSource": "{A1B2C3D4-0000-0000-0000-000000000001}",
            "params": { "theme": "dark" },
            "fields": {
              "heading": { "value": "Heart care close to home" },
              "subheading": { "value": "" },
              "image": { "value": { "src": "/img/heart.jpg", "alt": "", "width": "1200", "height": "600" } },
              "cta": { "value": { "href": "/appointments", "text": "Book an appointment", "linkType": "internal" } }
            }
          },
          {
            "uid": "c2",
            "componentName": "TwoColumn",
            "params": { "DynamicPlaceholderId": "1" },
            "placeholders": {
              "column-left-1": [
                {
                  "uid": "c3",
                  "componentName": "RichTextBlock",
                  "fields": {
                    "text": { "value": "<h2>Our approach</h2><p>We treat the <strong>whole patient</strong>.</p><script>alert('x')</script>" }
                  }
                }
              ],
              "column-right-1": [
                {
                  "uid": "c4",
                  "componentName": "DoctorList",
                  "fields": {
                    "data": {
                      "datasource": {
                        "title": { "jsonValue": { "value": "Our cardiologists" } },
                        "children": {
                          "results": [
                            { "id": "d1", "name": { "jsonValue": { "value": "Dr. Anita Rao" } }, "specialty": { "jsonValue": { "value": "Interventional Cardiology" } }, "photo": { "jsonValue": { "value": { "src": "/img/rao.jpg", "alt": "Dr. Anita Rao" } } } },
                            { "id": "d2", "name": { "jsonValue": { "value": "Dr. Vikram Shah" } }, "specialty": { "jsonValue": { "value": "" } }, "photo": { "jsonValue": { "value": {} } } }
                          ]
                        }
                      }
                    }
                  }
                },
                { "uid": "c5", "componentName": "LegacyWidget", "fields": {} }
              ]
            }
          },
          {
            "uid": "c6",
            "componentName": "ArticleListing",
            "params": { "pageSize": "3", "tag": "cardiology" },
            "fields": { "heading": { "value": "Latest from our heart team" } }
          }
        ]
      }
    }
  }
}
```

**File 2 — Experience Edge GraphQL response for an article search (page 1)**

```json
{
  "data": {
    "search": {
      "total": 7,
      "pageInfo": { "endCursor": "Mw==", "hasNext": true },
      "results": [
        { "id": "a1", "url": { "path": "/news/new-cath-lab" }, "title": { "value": "New cath lab opens" }, "publishDate": { "value": "2026-08-02T00:00:00Z" } },
        { "id": "a2", "url": { "path": "/news/heart-month" }, "title": { "value": "Heart health month" }, "publishDate": { "value": "2026-07-15T00:00:00Z" } },
        { "id": "a3", "url": { "path": "/news/tavr" }, "title": { "value": "What is TAVR?" }, "publishDate": { "value": "2026-06-30T00:00:00Z" } }
      ]
    }
  }
}
```

For pages 2 and 3, create your own mock data in the same shape (7 articles total).

## Section A — Logic building (25 marks, ~45 minutes)

Plain TypeScript, no frameworks, in `/section-a` of the starter repo. Include tests (Vitest is already set up) covering the normal case and at least two edge cases for each problem. Add a short comment above each function explaining your approach.

### A1. Component tree walker (12 marks)

Write `collectComponents(route, registry)` where `route` is `sitecore.route` from File 1 and `registry` is a `Set<string>` of component names your app supports.

Return:

```ts
{
  renderList: { uid: string; componentName: string; placeholderPath: string; depth: number }[];
  missing: string[]; // componentNames not in registry, no duplicates
}
```

- `renderList` is in the order components appear on the page (depth-first).
- `placeholderPath` is the chain of placeholder keys to reach the component, e.g. `headless-main/column-right-1`.
- It must work for any nesting depth, not just the depth in the sample.
- With registry `{Hero, TwoColumn, RichTextBlock, DoctorList, ArticleListing}`, the sample must give 6 entries and `missing: ["LegacyWidget"]`.

### A2. Navigation tree builder (13 marks)

Content comes from Sitecore as a flat list. Write `buildNav(items, maxDepth)` that returns a nested tree.

```ts
const items = [
  { id: "1", parentId: null, title: "Home",         path: "/",                      sortOrder: 0 },
  { id: "2", parentId: "1",  title: "Services",     path: "/services",              sortOrder: 20 },
  { id: "3", parentId: "1",  title: "About",        path: "/about",                 sortOrder: 10 },
  { id: "4", parentId: "2",  title: "Oncology",     path: "/services/oncology",     sortOrder: 10 },
  { id: "5", parentId: "2",  title: "Cardiology",   path: "/services/cardiology",   sortOrder: 10 },
  { id: "6", parentId: "3",  title: "Careers",      path: "/about/careers",         sortOrder: 5, hideInNav: true },
  { id: "7", parentId: "6",  title: "Nursing Jobs", path: "/about/careers/nursing", sortOrder: 1 },
  { id: "8", parentId: "99", title: "Orphan Page",  path: "/orphan",                sortOrder: 1 }
];
```

- Siblings sort by `sortOrder`, then `title` alphabetically.
- An item with `hideInNav: true` is excluded, and so are all its descendants.
- Items whose parent doesn't exist are not thrown away silently. Return them in an `orphans` array.
- `maxDepth` limits levels (Home = level 1).
- Must be O(n log n) or better. No `items.filter(...)` inside a loop over items.
- Also write `getBreadcrumb(items, path)` returning titles from root to the given path, e.g. `/services/cardiology` → `["Home", "Services", "Cardiology"]`.

### A3. Note in ANSWERS.md (part of A1-A2 marks)

In two or three sentences, describe how you would cache a content fetch so that 10 simultaneous requests for the same key trigger only one network call. No code needed.

## Section B — Headless frontend build (35 marks, ~100 minutes)

Work in `/section-b` of the starter repo. It already has a Next.js app with a catch-all route, a `getLayoutData(path)` function reading the mock files, TypeScript types for the mock JSON, empty component files, SASS set up, and a mock `/api/articles` route. The page currently renders nothing. Your job is to make `/services/cardiology` render correctly.

Visual polish is not graded. Name your CSS classes the way you normally would.

### B1. Placeholder and component factory (10 marks)

- Build a `Placeholder` component and a component factory (name → React component).
- Render every component in File 1, including the nested placeholders inside `TwoColumn`.
- `LegacyWidget` is not implemented. In development, show a visible "missing component" box. In production, render nothing and don't break the page.

### B2. Components with real data (13 marks)

Build `Hero`, `RichTextBlock`, and `DoctorList`. Handle the data as it actually is:

- `Hero.subheading` is empty. Don't render an empty tag.
- `Hero.params.theme` must change the component's styling.
- The CTA is an internal link. Use client-side navigation.
- `RichTextBlock` contains a `<script>` tag. Make sure it's safe, and explain how.
- The second doctor has no photo and no specialty. The card must still look intentional.
- Type your fields properly. No `any` for field shapes.

### B3. Page behaviour (6 marks)

- Unknown paths return a proper 404.
- Page `<title>` and meta description come from `route.fields`.
- In your NOTES.md, say which rendering strategy you'd use for this page in production (SSR, SSG, ISR), what revalidate value, and why.

### B4. Article listing and GraphQL (6 marks)

- Write the GraphQL query you would send to Experience Edge to fetch File 2. Filter by template and tag, paginate with `first` and `after`, and return the fields used. It won't be executed.
- Build `ArticleListing`: server-render the first 3 articles, then a "Load more" button that fetches the next page from `/api/articles?tag=&cursor=` and appends results. Hide the button when `hasNext` is false, and handle loading and error states.
- For pages 2 and 3 of the article data, add your own mock entries in the same shape (7 articles total).

## Section C — Sitecore knowledge (40 marks, ~70 minutes)

Answer all sixteen in `ANSWERS.md`, 2.5 marks each. Keep answers short — a few sentences or bullets each, not an essay.

This section is about how Sitecore itself is set up and how content reaches your frontend: templates, items, fields, presentation, publishing. It isn't about writing backend code, and no C# is expected anywhere.

Where versions differ (XP/XM with JSS vs XM Cloud), say which one you're describing. Use examples from your own projects wherever you can — a concrete "here's how we did it on my project, and here's what went wrong" beats a textbook definition. We may follow up on any of these in the review call.

1. **Standard values.** Authors want every new Service Page to have "Show sidebar" ticked and a default hero image. How do you set this up? What happens to the Service Pages that already exist?
2. **Base templates.** Service Page and News Article both need the same SEO fields. How do you avoid defining them twice? If you add a field to that shared base template next week, what happens to the hundred items already using it?
3. **Datasource vs rendering parameters.** For the `Hero` in File 1, which values belong on the datasource item and which in rendering parameters? Why does the split matter to authors? What is one risk of pointing many pages at one shared datasource?
4. **Where datasources live.** Where in the content tree would you put the Hero's datasource item — under the page itself, or in a shared Data folder? What are the trade-offs? How do you make sure an author clicking "Create new content" lands in the right folder with the right template available?
5. **Presentation details.** An author drags the Hero onto the cardiology page. What actually changes on the item in Sitecore? Explain shared layout vs final layout, and give a case where getting that wrong causes a bug.
6. **Placeholder restrictions.** Authors are dropping a `Hero` into `column-left-1`, which breaks the layout. How do you stop this in Sitecore, without changing frontend code?
7. **Dynamic placeholders.** In File 1, `TwoColumn` has `DynamicPlaceholderId: "1"` and its placeholder keys end in `-1`. Why the number? What goes wrong if an author puts two `TwoColumn` components on the same page and the keys aren't dynamic?
8. **Read the tree from the JSON.** Using File 1, sketch what an author must have built in Sitecore to produce it: which items exist, roughly which templates they use, and which values came from a datasource vs rendering parameters vs the page item itself. A rough tree with notes is fine.
9. **Component data.** In File 1, `DoctorList` has `fields.data.datasource` while `Hero` has flat fields. Why are these shapes different? What has to be set up in Sitecore for a component to get data that way?
10. **Languages and versions.** A page exists in English and an author creates a French version. Which field values carry over and which don't? What's the difference between a versioned field and a shared one, and when has that caught you out?
11. **Media and images.** An author uploads the hero image. Where does it live in Sitecore, and how does your Next.js component end up with a usable URL? What's different about media URLs when content is served through Experience Edge?
12. **Layout Service vs Experience Edge.** What is each, and which does your Next.js app talk to on the live site vs in the editor? What is the "editing host" and why does it exist?
13. **Publishing incident.** An author published a change to the Hero heading 20 minutes ago. The live site still shows the old text. List the causes you'd check, in the order you'd check them, and how you'd confirm each.
14. **Workflow and environments.** Walk through how a content change gets from an author's draft to the live site, including workflow states and who approves. Separately: when a developer adds a new template and rendering, how do those reach QA and production?
15. **Editing mode.** A component shows correctly on the live site, but in Experience Editor / Pages the author can't click to edit its heading. Another component vanishes completely in the editor when its field is empty. Explain both causes and the fix.
16. **Personalization.** How was personalization actually applied in your project — which part decided what a visitor saw, Sitecore or your code? How does personalization work with a statically generated page, and what's the trade-off?

## Marks and submission checklist

| Section | Focus | Marks | Suggested time |
| --- | --- | --- | --- |
| A | Logic building | 25 | 45 min |
| B | Headless frontend build | 35 | 100 min |
| C | Sitecore knowledge | 40 | 70 min |
| **Total** |  | **100** | **~3.5 h** |

Incomplete work still earns marks. If you run short on time, a working B1-B2 with clear notes on what you'd do next beats every task half-done. Don't pad an answer you're unsure about — say what you know and what you'd check.

- [ ] Repo link shared, with commit history
- [ ] `NOTES.md`: how to run it, assumptions, rendering strategy, rich-text safety
- [ ] `/section-a` with tests passing
- [ ] `/section-b` runs with `npm install && npm run dev`
- [ ] `ANSWERS.md`: the A3 note and all sixteen Section C answers
- [ ] Completed without AI assistance, and you can walk through every line in the review call
