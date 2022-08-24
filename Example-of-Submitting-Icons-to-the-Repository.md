As an example, let's assume you have created the SVGs for Redhat and Amazon Web Services logos.\
For the Redhat SVG, you have the `original`, `original-wordmark`, `plain`, and `plain-wordmark` [versions](https://github.com/devicons/devicon/wiki/SVG-Versions).

For the Amazon Web Services SVGs, you have the `original`, `original-wordmark`, and `plain-wordmark` versions. The `original` version is simple enough to be a `plain` version as well.

1.  Put the SVGs for each logo that you have into its own folders in `/icons`
    *   This means you would create two folders: one for `amazonwebservices` and one for `redhat`. See [Naming Convention](https://github.com/devicons/devicon/wiki/Naming-Conventions) for more details.
    *   **Note**: don't do this in the same commits; we want to have each Icon in its own PR.
2.  [Update the `devicon.json`](https://github.com/devicons/devicon/wiki/Updating-the-%60devicon.json%60)
    *   For `redhat`, you would do this

```javascript
{
  "name": "redhat",
  "altnames": [], // alternative names for the icon
  "tags": [
    "server",
    "linux"
  ],
  "versions": {
    "svg": [ // here are the versions that are available in svgs
      "original",
      "original-wordmark",
      "plain",
      "plain-wordmark"
    ],
    "font": [ // here are the versions that will be used to create icons
      "plain",
      "plain-wordmark"
    ]
  },
  "color": "#e93442", // note the '#' character
  "aliases": [] // no aliases in this case
},
``` 

* For the `amazonwebservices`, you would do this
        
```javascript
{
  "name": "amazonwebservices", 
  "altnames": ["aws"],
  "tags": [
    "cloud",
    "hosting",
    "server"
  ],
  "versions": {
    "svg": [ // here are the versions that are available in SVGs
       "original",
       "original-wordmark",
       "plain-wordmark"
  ],
    "font": [ // here are the versions that will be used to create icons
      "original", // "original" is simple enough to be used as the plain icon so we'll add "plain" to the aliases below
      "plain-wordmark",
       // note that the alias "plain" is not listed here. It must be listed in the `aliases` attribute
    ]
  },
  "color": "#F7A80D", // note the '#' character
  "aliases": [
    {
      "base": "original", // here is the SVG that we will upload to Icomoon
      "alias": "plain" // this is its alias. Our script will create a reference so users can use "original" or "plain" when referencing it
      // note that this is now optional (Jan 2022). You do not need to create aliases from now on. However, the attribute needs to stay so just put an empty `[]` if you are not using it.
    }
  ]
}
``` 

For more info on `aliases`, see [this](https://github.com/devicons/devicon/wiki/Updating-the-%60devicon.json%60#aliases-and-aliasobj).
                
3.  Create a separate pull request (PR) for each Icon.
    *   This means you would have to create one PR for Amazon Web Services and one PR for Redhat.
4.  Include the name of the icon in the pull request. Follow this format: `new icon: Icon name (versions)`
    *   For Amazon Web Services, your PR title should be `new icon: amazonwebservices (original, original-wordmark, plain-wordmark)`
    *   For Redhat, your PR title should be `new icon: redhat (original, original-wordmark, plain, plain-wordmark)`
5.  For the rest of the steps, you can follow [Overview on Submitting Icon](https://github.com/devicons/devicon/wiki/Overview-on-Submitting-Icons)