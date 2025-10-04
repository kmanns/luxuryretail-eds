# Blocks Without Universal Editor Instrumentation

This document explains why certain blocks in the `/blocks` directory do not have Universal Editor (UE) instrumentation files in `/ue/models/blocks/`.

## Programmatic/System Blocks (Intentionally Excluded)

These blocks are not meant to be edited by content authors in Universal Editor:

### `enrichment`
**Type:** Dynamic Content Loader  
**Why excluded:** This block programmatically loads and injects fragments based on product SKU or category. It reads from an index and dynamically inserts content. Authors should edit the fragments themselves, not the enrichment block configuration.

**Usage:** Automatically loads contextual content on product/category pages.

### `targeted-block`
**Type:** Personalization Container  
**Why excluded:** Uses Adobe dropins for personalization based on customer segments, groups, and cart rules. The personalization logic is handled by the dropin system, not editable content. Authors should edit the fragments/content being targeted, not the targeting rules.

**Usage:** Shows different content based on customer personalization data.

### `modal`
**Type:** Utility Function  
**Why excluded:** This is not a content block but a JavaScript utility function that creates modal dialogs programmatically. It's called by other blocks/scripts and doesn't contain editable content itself.

**Usage:** `createModal(contentNodes)` - Called by other features to display modal overlays.

## Commerce Blocks (Dropin-Based)

These blocks use Adobe Commerce dropins and have their own configuration systems:

- `commerce-*` (all commerce blocks)
- `product-details`
- `product-list-page`
- `product-recommendations`

**Why excluded:** These blocks render Adobe Commerce dropins which have their own configuration and data management. They don't follow the traditional block content model.

## Content Blocks with UE Instrumentation

All other blocks in `/blocks` that contain editable content have corresponding JSON files in `/ue/models/blocks/`:

- `accordion` (with mutation observer in `ue.js`)
- `cards` (with mutation observer in `ue.js`)
- `cards-circular`
- `cards-list`
- `carousel` (with mutation observer in `ue.js`)
- `columns`
- `fragment`
- `hero`
- `luxury-events` (with mutation observer in `ue.js`)
- `newsletter` (with mutation observer in `ue.js`)
- `promotional-hero`
- `quote`
- `search`
- `tabs`
- `video`

Plus standard components: `image`, `text`, `page`, `section`

### Blocks with Mutation Observers

The following blocks modify the DOM during decoration and require mutation observers in `/ue/scripts/ue.js` to preserve Universal Editor instrumentation:

- **`accordion`**: Replaces `div` rows with `<details>` elements
- **`cards`**: Replaces `div` structure with `<ul>/<li>` elements
- **`carousel`**: Transforms rows into carousel slides
- **`luxury-events`**: Removes original rows and creates card elements
- **`newsletter`**: Replaces entire block content with form structure

These observers use the `moveInstrumentation()` utility to transfer `data-aue-*` attributes from original elements to their transformed counterparts.

## Adding New Blocks

When creating a new content block that should be editable in Universal Editor:

1. Create `/ue/models/blocks/your-block.json` with definitions, models, and filters
2. Add the block to the components list in `/ue/models/section.json`
3. Run `npm run build:json` to regenerate consolidated files
4. Test in Universal Editor

If creating a programmatic/system block, document it in this file.
