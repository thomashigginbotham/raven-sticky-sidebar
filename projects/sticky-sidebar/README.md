# Raven Sticky Sidebar for Angular

An Angular component for making sidebars that stick in place while content around them scrolls as usual.

## Features

* Uses `position:sticky` for better performance
* Gracefully handles sidebars larger than the viewport
* Support for float, flexbox, and grid layouts

## Installation

Install into your Angular project using NPM.

`npm install raven-sticky-sidebar --save`

Import the **StickySidebarModule** into your module.

```ts
import { StickySidebarModule } from 'raven-sticky-sidebar';

@NgModule({
  imports: [
    StickySidebarModule,
    // ...
  ],
  // ...
})
export class AppModule { }
```

## Usage

Add a &lt;raven-sticky-sidebar&gt; element to your template, and use floats, flexbox, or grid to position the sidebar.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <style>
      .wrapper {
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-gap: 1rem;
      }
    </style>

    <div class="wrapper">
      <raven-sticky-sidebar>
        <aside>Sidebar content...</aside>
      </raven-sticky-sidebar>

      <article>
        Main content that scrolls...
      </article>
    </div>
  `,
  styles: []
})
export class AppComponent { }
```

### Options

| Option    | Type   | Description                                              | Default Value
| :-------- | :----- | :------------------------------------------------------- | :------------
| topOffset | number | Space to add to the top while sidebar is stuck (px).     | 0
| container | string | A CSS selector string that points to the parent element. | ""

> Only add the **container** attribute if the sidebar is expected to stick within a parent element that has a limited height with its own scroll bars.

## Browser Compatibility

Internet Explorer does not support **position:sticky** and is not compatible with raven-sticky-sidebar. [Most other major browsers have support](https://caniuse.com/#search=position%3Asticky) (including Edge).

## Development

To contribute to the development of this component, clone its repository and run `npm install`. Then run `ng serve -o` to start a development server and to open a sample page in your browser.

## License.

MIT license.
