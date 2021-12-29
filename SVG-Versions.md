Each icon/SVG can come in different versions:

  <table>
    <tr>
      <td style='width: 33%'>
          <p><code>original</code>: the original logo. Can contain multiple colors, gradients and other complex SVG elements. </p>
          <img src='https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-original.svg' height='100px' width='100px' /> 
          <h4>devicon-original.svg</h4>
      </td>
      <td style='width: 33%'>
          <p><code>plain</code>: a one-color version of the original logo. Could be in the original color, all black, or all white.</p>      
          <img src='https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-plain.svg' height='100px' width='100px' />
          <h4>devicon-plain.svg</h4>
      </td>
      <td style='width: 33%'>
          <p><code>line</code>: a one-color, line version of the original logo.</p>      
          <img src='https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-line.svg' height='100px' width='100px' />
          <h4>devicon-line.svg</h4>
      </td>
    </tr>
    <tr>
      <td style='width: 33%'>
        <p><code>original-wordmark</code>: similar to the above but must contain the name of the technology. </p>      
        <img src='https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-original-wordmark.svg' height='100px' width='100px' /> 
        <h4>devicon-original-wordmark.svg</h4>
      </td>
      <td style='width: 33%'>
          <p><code>plain-wordmark</code>: similar to the above but must contain the name of the technology.</p>      
          <img src='https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-plain-wordmark.svg' height='100px' width='100px' />
          <h4>devicon-plain-wordmark.svg</h4>
      </td>
      <td style='width: 33%'>
          <p><code>line-wordmark</code>: similar to the above but must contain the name of the technology.</p>      
          <img src='https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-line-wordmark.svg' height='100px' width='100px' />
          <h4>devicon-line-wordmark.svg</h4>
      </td>
    </tr>
  </table>

## Note
1. `plain` and `line` versions (including their `wordmark` versions) will be used to generate the font icon. Thus, they will get their color removed via Icomoon during the font creation process. This means the SVG version and the font version can have different colors.
2. You don't need to create all 6 versions for each icon. You only need at least one `original` version and one version that can be made into an icon. As seen in node #3 (below), both can be one SVG file. 
3. Sometime, a logo can serve as multiple versions at the same time. 
  * For example, the original Apple logo can be named either `original` or `plain`. 
  * In these cases, you only need to submit one version and follow this rule for naming them: `original > plain > line`. If it can fit multiple version, choose the version with the higher value. 
    * So in the case of Apple, you only need to create `apple-original.svg` to cover both `original` and `plain`.