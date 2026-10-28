Besides making the SVG files, you must also add the icon's data. This is essential for our build script to work and to document your work.

Each icon's data lives next to its SVGs, in `icons/<name>/<name>.json`, for example `icons/redhat/redhat.json`. The icon's name is its folder name (see [Naming Conventions](https://github.com/devicons/devicon/wiki/Naming-Conventions)), so it isn't repeated in the file.

Don't edit the `devicon.json` in the root of the repository: it's generated from these files in the weekly build, and the check-bot rejects PRs that edit it.

Here is the interface your file must have:

```javascript
{
    // list of alternative names for this technology
    // used for the searchbar on the https://devicon.dev website.
    "altnames": string[],

    // list of tags relating to the technology for categorization/search purpose
    "tags": string[],

    // keeps track of the different versions that you have.
    "versions": {
        // list all the SVGs that you have
        "svg": VersionString[],

        // list only the SVGs that can be converted to fonts:
        // one colour, one path. Usually the `plain` and `line` versions.
        // DO NOT list aliases here (see below).
        "font": VersionString[]
    },

    // the official/main color of the logo. Only track 1 color. Format is "#abcdef"
    "color": string,

    // keeps track of the aliases for the font versions ONLY. Read on for more details.
    // If you don't use it, still include the attribute with an empty array `[]`.
    "aliases": AliasObj[]
}
```

For example, `icons/redhat/redhat.json`:

```json
{
    "altnames": [],
    "tags": ["server", "linux"],
    "versions": {
        "svg": ["original", "original-wordmark", "plain", "plain-wordmark"],
        "font": ["plain", "plain-wordmark"]
    },
    "color": "#e93442",
    "aliases": []
}
```

VS Code checks the file for you: the repository's settings validate `icons/*/*.json` against its schema.

## `VersionString`
Here is what VersionString means:

1.  It's the version part of an `SVG` file's name
2.  If you have `html5-original`, the version string would be `original`
3.  If you have `react-line-wordmark`, the version string would be `line-wordmark`

See [SVG Versions](https://github.com/devicons/devicon/wiki/SVG-Versions) for more details

## `aliases` and `AliasObj`

The `aliases` attribute serves as a way to generate multiple font icon class names from just one SVG file. For example:
* We have a `apple-plain.svg`, which when generated into icon, would create the class name `.apple-plain`.
* However, since the Apple logo can also be used as an `original` version, we rename it to `apple-original.svg` (see [SVG Versions](https://github.com/devicons/devicon/wiki/SVG-Versions#note) for the reason why)
* Now, our class name will be `.apple-original`. If you want a class name of `.apple-plain`, you'd need to create `apple-plain.svg`, which is a copy of `apple-original.svg`.
* Instead of doing that, you can use `aliases` to specify the new class name `.apple-plain` for the `apple-original.svg` file.

Here is the `AliasObj` interface:

```javascript
{
  "base": VersionString, // the SVG file that you have
  "alias": VersionString // the alias that you want to create.
}
```

So for this example, we would make it:
```javascript
"aliases": [ // `aliases` is an array of objects
  {
    "base": "original", // the SVG file we are using as source for the alias
    "alias": "plain" // the new name (alias) that we want to generate
  }
]
```

Now, when we generate the font for `apple`, we can access the same logo using either `.apple-original` or `.apple-plain`.

Aliases provide no benefits for SVG files. So, if `apple-original` can't be made into a font, it won't work.

When a logo is the technology's name itself (a wordmark), also add `-wordmark` aliases, so classes like `.nx-original-wordmark` work too.
