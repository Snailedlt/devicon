To ensure our SVGs/icons are easy to use, please ensure your SVGs meet the following standards:

* The background must be transparent.
* The icon is centered horizontally and vertically.
* The icon must have no padding, i.e. it should fill the entire viewbox.
* Each SVG contains one icon with `viewBox="0 0 128 128"`. You can use a service like [`resize-image`](https://www.iloveimg.com/resize-image/resize-svg) for scaling the SVG).

![SVG Standards Img](https://github.com/user-attachments/assets/ce74d14f-f6a6-44e2-90b1-4a34e5bc7167)

* The `plain` and `line` versions (with or without `wordmark`) need to stay as simple as possible. They must have only one color and the paths should be united.
* The icon strokes and texts must be fills. This is to satisfy our conversion website [requirements](https://icomoon.io/#docs/stroke-to-fill).

## Note

* You no longer need to convert classes to fill. We now use [SVGO](https://github.com/svg/svgo/blob/main/plugins/prefixIds.js) to ensure all IDs and classes are unique.

