# Project Notes

## Added Dependency

`isomorphic-dompurify` is used to sanitize HTML from Sitecore rich-text fields before rendering it in React.

Install it using:

npm install isomorphic-dompurify


## How to Start the Project

1. Open a terminal in the project folder.
2. Install dependencies:

npm install

3. Start the development server:

npm run dev

4. Open the local URL shown in the terminal, usually `http://localhost:3000`.


To run tests:


npm test


## DOMPurify Usage

Sitecore rich-text fields can contain HTML. Before rendering HTML using React's `dangerouslySetInnerHTML`, sanitize it with DOMPurify to reduce the risk of cross-site scripting (XSS).

Example:

import DOMPurify from "isomorphic-dompurify";

const sanitizedHtml = DOMPurify.sanitize(rawHtml);

return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;

DOMPurify removes unsafe HTML and attributes while allowing supported formatting. Always sanitize CMS HTML before rendering it.

## SSR, SSG, ISR and Revalidation

SSR (Server-Side Rendering) generates HTML on the server for a request. It is useful when content needs to be fresh or depends on request-specific data.

SSG (Static Site Generation) generates HTML at build time. It works well for pages whose content changes infrequently.

ISR (Incremental Static Regeneration) allows statically generated pages to be regenerated after deployment without rebuilding the entire application.

In Next.js, `revalidate` sets the refresh interval for eligible cached route output or data.

Example:


export const revalidate = 60;

This sets a 60-second revalidation interval. After the interval, a request can trigger regeneration. Depending on the caching behavior, the existing cached page may be served while regeneration happens.