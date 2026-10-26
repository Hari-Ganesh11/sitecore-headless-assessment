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

Amswer: 
https://www.fastly.com/documentation/guides/concepts/cache/request-collapsing/
while refering the the above blog,I would use an in-flight request cache (a map keyed by the content key) to store the Promise for each network request. When 10 simultaneous requests use the same key, they reuse that Promise, resulting in only one network call. Once it settles, I’d remove the Promise from the in-flight cache and use a separate TTL cache if I also need to reuse the result for future requests.


---

# Section C — Sitecore knowledge

*2.5 marks each. Where versions differ (XP/XM with JSS vs XM Cloud), say which
one you're describing, and use examples from your own projects wherever you can.*

### C1. Standard values

*Authors want every new Service Page to have "Show sidebar" ticked and a default
hero image. How do you set this up? What happens to the Service Pages that
already exist?*
Answer: (based on sitecore 10.4 xp with JSS)
We can provide standard values at template level so that the values will be pupolated at the time a new service page is created.Existing Service Pages would also receive the standard values for fields they haven't explicitly overridden, but their existing field values would generally remain unchanged.



### C2. Base templates

*Service Page and News Article both need the same SEO fields. How do you avoid
defining them twice? If you add a field to that shared base template next week,
what happens to the hundred items already using it?*


Answer: (based on sitecore 10.4 xp with JSS)
I would create a shared SEO base template with the common SEO fields and make both the Service Page and News Article templates inherit from it. In Sitecore 10.4 XP, adding a field to that base template makes it available to all existing items using those templates too. The new field will be empty unless a standard value is configured or an author fills it in.

### C3. Datasource vs rendering parameters

*For the `Hero` in File 1, which values belong on the datasource item and which
in rendering parameters? Why does the split matter to authors? What is one risk
of pointing many pages at one shared datasource?*

Answer: (based on sitecore 10.4 xp with JSS)
I would put the heading, subheading, hero image, and CTA text/link on the Hero datasource item. Rendering parameters would contain display settings such as the theme This split helps authors edit content separately from the component's appearance and reuse the same component with different settings. One risk of sharing a datasource across many pages is that changing its content could unintentionally change the Hero on every page using it.

sources refered: https://doc.sitecore.com/xp/en/developers/sxa/104/sitecore-experience-accelerator/data-sources-1188183.html
https://www.cmsbestpractices.com/sitecore-rendering-parameters-best-practices-part-one/



### C4. Where datasources live

*Under the page item, or a shared Data folder? Trade-offs? How do you make sure
an author clicking "Create new content" lands in the right folder with the right
template available?*

Answer: (based on sitecore 10.4 xp with JSS)
the best practise to store datasources are
page specific datasources -> lives in page data
common datasource that can be used for multiple pages -> lives under shared data folder.To make Create new content open the right folder with the correct template, I would configure the rendering's Datasource Location and Datasource Template. I would also set the appropriate insert options on the folder's standard values so authors only see the relevant templates


### C5. Presentation details

*An author drags the Hero onto the cardiology page. What actually changes on the
item in Sitecore? Shared layout vs final layout, and a case where getting it
wrong causes a bug.*

Answer: (based on sitecore 10.4 xp with JSS)
Source: https://doc.sitecore.com/xp/en/users/100/sitecore-experience-platform/edit-the-layout-of-an-item.html

based on the above source refered
The shared layout – stores the presentation details that are shared by all the versions of the item in every language. These presentation details are based on the standard values of the template that the item is based on.
The final layout – stores the combination of the presentation details on the selected version of the item and the presentation details of the shared layout. This is the layout that your visitors see on your website.



### C6. Placeholder restrictions

*Authors are dropping a `Hero` into `column-left-1`, which breaks the layout.
How do you stop this in Sitecore, without changing frontend code?*

Answer: (based on sitecore 10.4 xp with JSS)
we can use placeholder settings. Where we'll be albe to edit the allowed controls for that particular place holder. Allowed controls are used to restrict the un desired components to be added to the placeholder

### C7. Dynamic placeholders

*Why does `TwoColumn` have `DynamicPlaceholderId: "1"` and keys ending in `-1`?
What goes wrong with two `TwoColumn` components on a page if the keys aren't
dynamic?*

Answer: (based on sitecore 10.4 xp with JSS)
In Sitecore 10.4 XP with JSS, DynamicPlaceholderId: "1" gives the TwoColumn component unique placeholder keys, such as column-left-1 and column-right-1.

If two TwoColumn components use the same static keys, Sitecore can confuse their placeholders, causing content to appear in the wrong column or be duplicated across both components. Dynamic keys keep each component's content separate.


### C8. Read the tree from the JSON

*Using File 1, sketch what an author must have built in Sitecore: which items
exist, roughly which templates, and which values came from a datasource vs
rendering parameters vs the page item itself. A rough tree with notes is fine.*



### C9. Component data

*Why does `DoctorList` have `fields.data.datasource` while `Hero` has flat
fields? What has to be set up in Sitecore for a component to get data that way?*

Hero gets its fields directly from its datasource item, so its fields appear flat under fields. DoctorList uses fields.data.datasource because its data is nested — it includes the list heading and child doctor items, likely shaped by a GraphQL query or a custom rendering contents resolver.

To set this up, create a datasource template for the component, configure the rendering's Datasource Template and Datasource Location, and assign a datasource item. For DoctorList, configure a Rendering Contents Resolver to return the datasource's child items, or use an integrated GraphQL query to shape the data as needed

Source: https://doc.sitecore.com/xp/en/developers/hd/22/sitecore-headless-development/customizing-the-layout-service-rendering-output.html

### C10. Languages and versions

*An author creates a French version of a page. Which field values carry over and
which don't? Versioned vs shared fields, and when has that caught you out?*

shared fileds are carried over.


### C11. Media and images

*Where does an uploaded hero image live in Sitecore, and how does your Next.js
component end up with a usable URL? What's different about media URLs through
Experience Edge?*

the images are usually stored under media library and sitecore resolves the media url along with the server url. so that the image is present in both editing and rendering hosts


### C12. Layout Service vs Experience Edge

*What is each, and which does your app talk to on the live site vs in the editor?
What is the "editing host" and why does it exist?*


A layout service resolver gives the layout data for the page, components present in that page and the datasources for thoose components.
whereas exp edge delivers published content in the cd.
editing host is the next js app configured for EE.


### C13. Publishing incident

*An author published a Hero heading change 20 minutes ago; the live site still
shows the old text. List the causes you'd check, in order, and how you'd confirm
each.*

the primay check is to check sitecore jobs as the publishing may get queued.
the second step is to check if the publishing is done properly by  checking the new change is present in web database 
and the final way is to check if the data is being received by CD.



### C14. Workflow and environments

*How does a content change get from an author's draft to the live site, including
workflow states and who approves? Separately: how do a developer's new template
and rendering reach QA and production?*

based on my real project experiences we usually follow the below approach
Authors edit and submit content for review; an approver approves it, then it is published to the Web database or Experience Edge for the live site.

Developers commit template, rendering and Next.js changes to source control, then deploy them to QA for testing and to production after approval.

### C15. Editing mode

*A component renders on the live site but its heading isn't clickable in
Experience Editor / Pages. Another vanishes in the editor when its field is
empty. Explain both causes and the fix.*

The reason the heading is not clickable is that may be a plain text instead of a Link. we need to make sure to use LinkField for all clickable links

The reason for component vanishes in EE is when the datasource is empty then the component will display nothing basically this will be done as a part for front end clean UI best practise. but we need to add a condition in EE mode when data source is empty a plain placeholder or a span has to be shown to selct a datasource.

the EE falback approach was based on real project outcomes


### C16. Personalization

*How was personalization actually applied in your project — which part decided
what a visitor saw, Sitecore or your code? How does it work with a statically
generated page, and what's the trade-off?*

Actually I not very sure about this personalization as we are in the baby steps in implementing the personalization inour project.


