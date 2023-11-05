For the technology name, make the file and folder name lowercase and concatenate them. If the name starts with a number, use letters instead. These will be used in the `devicon.json`, the folder name, and the file names. For example:
*   AngularJS becomes `angularjs`
*   Amazon Web Services becomes `amazonwebservices`
*   Microsoft SQL Server becomes `microsoftsqlserver`
*   3ds Max becomes `threedsmax`

For SVG file names, ensure your file names match this format and accurately reflect its content: 

* RegExp: `(name)-(original|plain|line)(-wordmark?)`
* Layperson explanation: 
  * Technology name, follows by one of the version names: original, plain, wordmark. If it's a wordmark version, add a 'wordmark' at the end. Each word is separated by a `-`.

Example:
* `react-original`
* `npm-plain`
* `javascript-line-wordmark`

For info on what each version means, see [SVG Versions](https://github.com/devicons/devicon/wiki/SVG-Versions).