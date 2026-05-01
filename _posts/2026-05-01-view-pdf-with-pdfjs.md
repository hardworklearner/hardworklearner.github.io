---
title: View PDF in Jekyll using PDF.js
author: Hardwork
categories:
  - Web
  - Jekyll
tags:
  - pdf
  - pdfjs
  - github-pages
background: "/assets/img/bg-theme-post.jpg"
---

# View PDF using PDF.js in Jekyll

This post shows how to display a PDF file directly inside a Jekyll blog using PDF.js.

## Step 1: Add PDF.js to your project

Download PDF.js from:
https://github.com/mozilla/pdf.js

Copy these folders into your project:

/pdfjs/web/
/pdfjs/build/

## Step 2: Add your PDF file

Place your PDF inside your repository:

/assets/sample.pdf

## Step 3: Embed the viewer in your post

Use an iframe to load the PDF viewer:

```html
<iframe
  src="{{ '/pdfjs/web/viewer.html?file=/assets/pdf/assessment decription.pdf' | relative_url }}"
  width="100%"
  height="700px"
>
</iframe>
```

<iframe
  src="{{ '/pdfjs/web/viewer.html?file=/assets/pdf/assessment decription.pdf' | relative_url }}"
  width="100%"
  height="700px"
>
