A LITTLE BOOK FOR MASHA
=======================

1. HOW TO PREVIEW THE BOOK

Open the file named index.html in a modern desktop browser (Chrome, Edge, Firefox, or Safari).
The book itself works without internet. The Spotify player inside the music page needs an
internet connection and a tap on Play; the browser will not start music automatically.

Use the language button marked EN, ES, or RU to cycle between English, Spanish, and Russian.
The current page and reading mode are preserved when the language changes.

If your browser behaves strangely with local files and Node.js is installed, open a
terminal in this folder and run:

    node preview.mjs

Then open http://127.0.0.1:8080 in the browser. This is only a fallback; double-clicking
index.html should normally work.

2. USING IT ON ANDROID OR IPHONE

Mobile Safari and some Android browsers refuse to run an interactive website from a local
file. For phones, publish this folder on an HTTPS static host such as GitHub Pages and send
that web address. This is more reliable than sending index.html or opening it from a ZIP.

3. HOW TO SEND THE OFFLINE COPY

Send the ZIP file containing this whole folder. On a computer, ask her to extract it first,
then open index.html. Do not open index.html from inside the ZIP preview.

4. FILES THAT MUST STAY TOGETHER

Keep index.html, css, js, and assets together in the same folder. Moving or renaming only
one of them can break the photos or the layout.

5. HOW TO REPLACE A PHOTO LATER

Open assets/images and replace the relevant image with another PNG using the exact same
filename. Keep the new photo's proportions natural. The current filenames are:

    masha-bookshelf.png
    masha-fountain.png
    masha-portrait.png
    masha-sea.png
    masha-st-isaac.png
    bon-bon.png
    travel-*.png

6. HOW TO CREATE A ZIP ON WINDOWS

Right-click this folder, choose “Compress to ZIP file” (or “Send to > Compressed folder”),
then send the new ZIP. Extract and test that ZIP once before sending it.

7. ABOUT file:// LIMITATIONS

Some browsers apply extra security rules to files opened directly from the computer. This
book avoids features that normally cause those problems, so index.html should work offline.
If a browser extension blocks local scripts, use a private window, another browser, or the
small local-server option in section 1.

8. WEBSITE DEPLOYMENT

The exact contents of this folder can be uploaded to any static website host. Upload the
contents so index.html sits at the top level. Do not add analytics or third-party scripts if
you want to preserve the private, tracker-free version.
