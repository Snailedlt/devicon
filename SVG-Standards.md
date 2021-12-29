To ensure our SVGs/icons are easy to use, please ensure your SVGs meet the following standards:

* The background must be transparent.
* The icon is centered horizontally and vertically.
* Each SVG contains one icon with `viewBox="0 0 128 128"`. You can use a service like [resize-image](https://www.iloveimg.com/resize-image/resize-svg) for scaling the SVG.)
* The `plain` and `line` versions (with or without `wordmark`) need to stay as simple as possible. They must have only one color and the paths are united.
* The icon's strokes and texts must be fills. This is to satisfy our conversion website's [requirements](https://icomoon.io/#docs/stroke-to-fill).

## Note:
* You no longer need to convert classes to fill. We now use [SVGO](https://github.com/svg/svgo/blob/main/plugins/prefixIds.js) to ensure all ids and classes are unique.

