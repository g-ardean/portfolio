# Portfolio content

Edit the locale JSON file for the language you want to change:

- `de.json` — German
- `en.json` — English
- `it.json` — Italian

The files contain translated page copy and section headings. The portrait description remains localized.

Skills and the technology list are in [../skills.json](../skills.json). Add a skill object to the `locales.en`, `locales.de`, and `locales.it` arrays; each object has a `title` and `description`. Add technologies to the shared `technologies` array.

Work history is in [../experience.json](../experience.json). Add a job object to each language array (`en`, `de`, and `it`) with `category`, `title`, `company`, `dates`, and `description`. The optional `points` array adds bullet points. The Skills and Experience components render each array entry automatically, so adding an item does not require editing Vue templates.

Shared, non-translated contact details are in [../contact.json](../contact.json): name, email, phone, GitHub, and LinkedIn. Edit that file once to update these details in every language. Leave `phone` empty to hide the phone link.

The Vue page reads the language files through Nuxt i18n and the contact file directly. Skills and work history are rendered by `app/components/SkillsSection.vue` and `app/components/ExperienceSection.vue`. You normally do not need to edit Vue files to add or update entries. Keep the JSON valid when editing it; strings must use double quotes and commas must separate fields.
