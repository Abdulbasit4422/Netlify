# Abdulbasit Oyetunji — Personal Portfolio

A responsive, multi-page portfolio for Abdulbasit Oyebamiji Oyetunji, presenting his medical training, AI/ML engineering, medical imaging research, conference presentations, experience and recognition.

## Pages

- `index.html` — Home and selected work
- `about.html` — Profile, interests and education
- `research.html` — Research, projects and conference presentations
- `experience.html` — Professional experience, leadership, grants, honours and skills
- `contact.html` — Contact details and professional links

## Run locally

No build step or package installation is required. Open `index.html` in a browser, or serve the folder with any static web server.

For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to Netlify from GitHub

1. Create a new GitHub repository and upload the contents of this folder (the files should be at the repository root, not inside another nested folder).
2. In Netlify, choose **Add new site → Import an existing project** and connect the GitHub repository.
3. Use the following build settings:
   - Build command: leave blank
   - Publish directory: `.`
4. Deploy. The included `netlify.toml` provides the static publish configuration and basic response headers.

The site is static HTML, CSS and JavaScript. It does not require a server, database, environment variables or paid dependencies.

## Updating content

Edit the relevant page's HTML. Shared design lives in `styles.css`; navigation, theme toggle, mobile menu, reveal effects and research filters live in `script.js`. Replace `assets/Abdulbasit_Oyetunji_CV.pdf` when updating the downloadable CV.

## Contact and profile links

The website currently uses the contact details and profile URLs supplied in the CV: `abdulbasitoyetunji88@gmail.com`, GitHub `Abdulbasit4422`, and LinkedIn `oyetunjiabdulbasitoyebamiji`.
