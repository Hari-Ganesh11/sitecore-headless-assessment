# Answers

Write your answers under each heading. Keep them short and specific — a few
sentences or bullets each, not an essay.

"I don't know, but here's how I'd find out" is a good answer, and a better one
than a confident guess. So is "I never set that up myself, but here's what I
saw its effects look like."

---

## A3. Caching a content fetch

*Two or three sentences: how would you cache a content fetch so that 10
simultaneous requests for the same key trigger only one network call? No code
needed.*



---

# Section C — Sitecore knowledge

*2.5 marks each. Where versions differ (XP/XM with JSS vs XM Cloud), say which
one you're describing, and use examples from your own projects wherever you can.*

### C1. Standard values

*Authors want every new Service Page to have "Show sidebar" ticked and a default
hero image. How do you set this up? What happens to the Service Pages that
already exist?*



### C2. Base templates

*Service Page and News Article both need the same SEO fields. How do you avoid
defining them twice? If you add a field to that shared base template next week,
what happens to the hundred items already using it?*



### C3. Datasource vs rendering parameters

*For the `Hero` in File 1, which values belong on the datasource item and which
in rendering parameters? Why does the split matter to authors? What is one risk
of pointing many pages at one shared datasource?*



### C4. Where datasources live

*Under the page item, or a shared Data folder? Trade-offs? How do you make sure
an author clicking "Create new content" lands in the right folder with the right
template available?*



### C5. Presentation details

*An author drags the Hero onto the cardiology page. What actually changes on the
item in Sitecore? Shared layout vs final layout, and a case where getting it
wrong causes a bug.*



### C6. Placeholder restrictions

*Authors are dropping a `Hero` into `column-left-1`, which breaks the layout.
How do you stop this in Sitecore, without changing frontend code?*



### C7. Dynamic placeholders

*Why does `TwoColumn` have `DynamicPlaceholderId: "1"` and keys ending in `-1`?
What goes wrong with two `TwoColumn` components on a page if the keys aren't
dynamic?*



### C8. Read the tree from the JSON

*Using File 1, sketch what an author must have built in Sitecore: which items
exist, roughly which templates, and which values came from a datasource vs
rendering parameters vs the page item itself. A rough tree with notes is fine.*



### C9. Component data

*Why does `DoctorList` have `fields.data.datasource` while `Hero` has flat
fields? What has to be set up in Sitecore for a component to get data that way?*



### C10. Languages and versions

*An author creates a French version of a page. Which field values carry over and
which don't? Versioned vs shared fields, and when has that caught you out?*



### C11. Media and images

*Where does an uploaded hero image live in Sitecore, and how does your Next.js
component end up with a usable URL? What's different about media URLs through
Experience Edge?*



### C12. Layout Service vs Experience Edge

*What is each, and which does your app talk to on the live site vs in the editor?
What is the "editing host" and why does it exist?*



### C13. Publishing incident

*An author published a Hero heading change 20 minutes ago; the live site still
shows the old text. List the causes you'd check, in order, and how you'd confirm
each.*



### C14. Workflow and environments

*How does a content change get from an author's draft to the live site, including
workflow states and who approves? Separately: how do a developer's new template
and rendering reach QA and production?*



### C15. Editing mode

*A component renders on the live site but its heading isn't clickable in
Experience Editor / Pages. Another vanishes in the editor when its field is
empty. Explain both causes and the fix.*



### C16. Personalization

*How was personalization actually applied in your project — which part decided
what a visitor saw, Sitecore or your code? How does it work with a statically
generated page, and what's the trade-off?*


