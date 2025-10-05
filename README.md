# Luxury Retail - Adobe Commerce Storefront

A luxury retail storefront built on AEM Edge Delivery Services with Adobe Commerce integration. Cloned from [Adobe Commerce Boilerplate](https://github.com/adobe/aem-boilerplate-commerce) with Universal Editor support via [DA-block-collection](https://github.com/aemsites/da-block-collection).

**Features:** Commerce integration • Universal Editor • Responsive design • Design tokens • Accessibility

## Quick Start

```bash
npm install
npm start                # Local development
npm run build:json       # Build UE config
npm run lint             # Check code quality
```

**Requirements:** Node.js 18+, Adobe Commerce instance, DA.live account

## Project Structure

- `blocks/` - Custom blocks (footer-columns, newsletter, luxury-events, etc.)
- `scripts/` - Core JS and Commerce dropins
- `styles/` - Global styles and design tokens
- `ue/` - Universal Editor configuration

## Development

**Design Tokens:** All spacing, colors, and typography use CSS variables in `styles/styles.css`

**Universal Editor:** Uses centralized mutation observers in `ue/scripts/ue.js` for blocks that transform DOM (footer-columns, luxury-events, newsletter)

**Adding Blocks:**
1. Create `blocks/my-block/my-block.{js,css}`
2. Add UE config in `ue/models/blocks/my-block.json`
3. Register in `ue/models/section.json`
4. Run `npm run build:json`

## Resources

- [AEM Edge Delivery Docs](https://www.aem.live/docs/)
- [DA.live Docs](https://docs.da.live/)
- [Universal Editor Reference](https://docs.da.live/developers/reference/universal-editor)
- [Adobe Commerce Storefront Docs](https://experienceleague.adobe.com/developer/commerce/storefront/)

## Updating Drop-in dependencies

You may need to update one of the drop-in components, or `@adobe/magento-storefront-event-collector` or `@adobe/magento-storefront-events-sdk` to a new version. Besides checking the release notes for any breaking changes, ensure you also execute the `postinstall` script so that the dependenices in your `scripts/__dropins__` directory are updated to the latest build. This should be run immediately after you update the component, for example:

```bash
npm install @dropins/storefront-cart@2.0. # Updates the storefront-cart dependency in node_modules/
npm run postinstall # Copies scripts from node_modules into scripts/__dropins__
```

This is a custom script which copies files out of `node_modules` and into a local directory which EDS can serve. You must manually run `postinstall` due to a design choice in `npm` which does not execute `postinstall` after you install a _specific_ package.

## Changelog

Major changes are described and documented as part of pull requests and tracked via the `changelog` tag. To keep your project up to date, please follow this list:

<https://github.com/hlxsites/aem-boilerplate-commerce/issues?q=label%3Achangelog+is%3Aclosed>
