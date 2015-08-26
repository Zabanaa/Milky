# Notes on the folder structure

**Current folder structure**

- Sass - Root

   - 1- Modules (components)
      - buttons.sass
      *should have*
      - forms.sass
      - sections.sass (base styles for all sections and alternate sections)
      *Any other type of re-usable component*

   - rwd (drop it)
      **Drop it**

   - 2- sections / Pages (depending on the project)
      *section / page specific styles (subsections, layouts etc)*

   - 3- tools (util in skeleton)
      - vars
      - mixins
      - placeholders
      - resets
      - fonts

   - 4- vendor
      *Any library or dependecies*
      - bourbon/
      - neat /

   main.sass


**skeleton folder structure**

   - sass (root)

      - base
         - base.scss (base styles for divs, h1, paragraphs and stuff)
         - font-face.scss (font imports)
         - typography.scss (well ...)

      - components
         *same as above*

      - layout
         - footer.scss
         - grid.scss
         - header.scss
         - nav.scss
         - wrapper.scss

      - utils
         - colours.scss
         - mixins.scss
         - placeholders.scss
         - variables.scss

      - vendor
         *libraries and dependecies*

**new folder structure**
