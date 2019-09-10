// Libraries
const React = require('react');

// RVG Elements
const {
  SVG,
  Text,
  Rectangle,
  Circle,
  Ellipse,
  Line,
  // Image,
  Path,
  LinearGradient
} = require('rvg.js');

class DraggableBase extends React.Component {
  constructor(props) {
    super(props);
    this.draggableProps = {};
    if(this.props.draggable) {
      this.draggableProps = {
        'data-draggable': true,
        style: {
          cursor: 'move'
        }
      };
    } else {
      this.draggableProps = {
        style: {
          'pointerEvents': 'none'
        }
      }
    }
  }
}

class Image extends DraggableBase {
  render() {
    const {
      x, y,
      height, width,
      href,
      opacity,
      id,
      preserveAspectRatio,
    } = this.props;

    return (
      <image
        id={ id }
        xlinkHref={href}
        x={x}
        y={y}
        height={height}
        width={width}
        preserveAspectRatio={ preserveAspectRatio || "xMinYMin meet" }
        opacity={opacity}
        {...this.draggableProps}
      />
    );
  }
}

/**
 * @name Card
 * @class The Card React element
 */



class Card extends React.Component {

  /**
   * Calculates the Y position of an element based on any attachments etc.
   * @param {object} layers - The object of all layers
   * @param {object} layer - The layer to calculate the Y position for
   * @return {integer} The Y position
   */
  calculateYPosition (layers, layer) {
    // Get the layer's currently configured Y position
    let attachYLayerPosition = this.getLayerValue(layers, layer, 'y');

    console.log('calculateYPos', { layers, layer })

    // If this is an object and has the attach property
    if (typeof attachYLayerPosition === 'object' && attachYLayerPosition.attach !== 'undefined') {
      // Get the layer to attach to
      // let attachYLayer = layers[layer.y.attach];
      let attachYLayer = layers.find(l => {
        console.log('finding...', l.name, layer.y.attach)
        return l.name === layer.y.attach
      })
      console.log({ attachYLayer })

      // Calculate the Y offset
      let attachYLayerHeight = 0;
      switch (attachYLayer.type) {
        case 'text':
          let attachYLayerText = attachYLayer.text.split('\n');
          if (attachYLayer.text !== '') {
            attachYLayerHeight = (
              attachYLayerText.length * (this.getLayerValue(layers, attachYLayer, 'lineHeight')
              || this.getLayerValue(layers, attachYLayer, 'fontSize'))
            );
          }
          break;
        default:
          if (typeof this.getLayerValue(layers, attachYLayer, 'height') !== 'undefined') {
            attachYLayerHeight = this.getLayerValue(layers, attachYLayer, 'height');
          }
          break;
      }

      // Add any additionally configured offset value
      let attachYLayerOffset = (layer.y.offset || 0);

      // Add them together and recursively call this function if the next layer has an attachment
      attachYLayerPosition = attachYLayerHeight + this.calculateYPosition(layers, attachYLayer) + attachYLayerOffset;
    }

    // Return the value
    return attachYLayerPosition;
  }

  /**
   * Returns the value for a given layer property
   * @param {object} layers - The object of all layers
   * @param {object} layer - The layer to get the value for
   * @param {object} key - The key of the value to get from the layer
   *
   * @return {mixed} The value of the property on the layer
   */
  getLayerValue (layers, layer, key) {
    if (typeof layer[key] === 'function') {
      return layer[key](layers, this.refs.svg);
    }
    console.log('getLayerValue', layer[key])
    return layer[key];
  }

  /**
   * Compute the gradient elements to render to the <defs> element
   * @param {object} layers - The configuration object representing the layers that may require gradients
   *
   * @return {array} An array of React elements to render to the <defs> element
   */
  computeGradients (layers) {
    const array = [];
    let layer, gradient;

    Object.keys(layers).forEach((key) => {
      layer = layers[key];

      if (this.getLayerValue(layers, layer, 'gradient')) {
        gradient = this.getLayerValue(layers, layer, 'gradient');

        array.push(<LinearGradient key={key}
          name={key}
          x1={0} x2={0}
          y1={0} y2={1}
          stops={gradient} />);
      }
    });

    return array;
  }

  /**
   * Compute the layers to render on the Card
   * @param {object} layers - The configuration object representing the layers to render
   *
   * @return {array} An array of React elements to render on the card
   */
  computeLayers (layers) {
    const array = [];
    let layer;

    // Iterate over the layers
    Object.keys(layers).forEach((key) => {
      layer = layers[key];
      console.log('layer key', { key, layers, layer })

      // If the layer is hidden, ignore it
      if (this.getLayerValue(layers, layer, 'hidden') === true) {
        return;
      };

      // Setup an object to contain our layer data
      const layerData = {}
      const layout = this.props.configuration.name
      const layerOptions = this.props.configuration.template.layerItems[layout][key].settings
      console.log({ layerOptions })


      // Iterate over the properties of the layer, and compute the value (handles getters, functions, and object implementations such as `y`)
      Object.keys(layer).forEach((k) => {
        layerData[k] = this.getLayerValue(layers, layer, k);
      });

      // Make the fill value map to a gradient name, if a gradient has been configured
      // See computeGradients() for the creation of gradient definitions
      if (this.getLayerValue(layers, layer, 'gradient')) {
        layerData.fill = `url(#${key})`;
      }

      // Switch over the layer type to ensure we create the card correctly
      switch (layer.type) {
        case 'text':
          // Split by newline
          const text = layerData.text.split('\n');

          array.push(<Text
            x={ layerOptions.x || layerData.x }
            y={ layerOptions.y || this.calculateYPosition(layers, layerData) }
            fontFamily={ layerData.fontFamily }
            fontSize={ layerData.fontSize }
            fontWeight={ layerData.fontWeight }
            lineHeight={ layerData.lineHeight }
            textAnchor={ layerData.textAnchor }
            fill={ layerOptions.fill || layerData.fill }
            draggable={ layerData.draggable }
            transform={ layerData.transform }
            opacity={ layerData.opacity }
            smartQuotes={ layerData.smartQuotes }
            key={ key }
          >
            {text}
          </Text>);
          break;
        case 'image':
          array.push(<Image
            x={ layerOptions.x || layerData.x }
            y={ layerOptions.y || this.calculateYPosition(layers, layerData)} 
            href={ layerOptions.src || layerData.src }
            height={ layerOptions.height || layerData.height }
            width={ layerOptions.width || layerData.width }
            draggable={ layerData.draggable }
            transform={ layerData.transform }
            opacity={ layerOptions.opacity || layerData.opacity }
            preserveAspectRatio={ layerData.preserveAspectRatio }
            key={ key}
          />)
          break

          case 'overlayImage':
          array.push(
            <Image
              x={ layerOptions.x || layerData.x }
              y={ layerOptions.y || this.calculateYPosition(layers, layerData) }
              href={ layerOptions.src || layerData.src }
              height={ layerOptions.height || layerData.height }
              width={ layerOptions.width || layerData.width }
              draggable={ layerData.draggable }
              transform={ layerData.transform }
              opacity={ layerData.opacity }
              preserveAspectRatio={ layerData.preserveAspectRatio }
              key={ key }
            />
          )
          break;

          case 'cropped_image':
            array.push(<g key={ `group-key-${key}` }>
              <defs>
                <clipPath id={ `crop-${layerOptions.label}` }>
                  <rect
                    id={ `crop-rect-${layerOptions.label}` }
                    x={ layerOptions.x }
                    y={ layerOptions.y }
                    width={ layerOptions.width }
                    height={ layerOptions.height }
                  />
                </clipPath>
              </defs>
              <g clipPath={ `url(#crop-${layerOptions.label})` }>
                <rect
                  width="100%"
                  height="100%"
                  fill="#ccc"
                />
                <Image
                  id={ `image-cropped-${layerOptions.label}` }
                  x={layerData.x}
                  y={this.calculateYPosition(layers, layerData)}
                  href={layerData.src}
                  height={layerData.height}
                  width={layerData.width}
                  draggable={layerData.draggable}
                  transform={layerData.transform}
                  opacity={layerData.opacity}
                  key={ `cropped-image-key-${key}` }
                />
              </g>
            </g>);
            break;

            case 'cropped_image_circle':
              array.push(<g key={ `group-key-${key}` }>
                <defs>
                  <clipPath id={ `crop-${layerOptions.label}` }>
                    <circle
                      id={ `crop-rect-${layerOptions.label}` }
                      cx={ layerOptions.cx || 0 }
                      cy={ layerOptions.cy || 0 }
                      r={ layerOptions.r || 0 }
                      // x={ layerOptions.x }
                      // y={ layerOptions.y }
                      // width={ layerOptions.width }
                      // height={ layerOptions.height }
                    />
                  </clipPath>
                </defs>
                <g clipPath={ `url(#crop-${layerOptions.label})` }>
                  <rect
                    width="100%"
                    height="100%"
                    fill="#ccc"
                  />
                  <Image
                    id={ `image-cropped-${layerOptions.label}` }
                    x={layerData.x}
                    y={this.calculateYPosition(layers, layerData)}
                    href={layerData.src}
                    height={layerData.height}
                    width={layerData.width}
                    draggable={layerData.draggable}
                    transform={layerData.transform}
                    opacity={layerData.opacity}
                    key={ `cropped-image-key-${key}` }
                  />
                </g>
              </g>);
            break;

            case 'clip_half_left':
              array.push(<g key={ `group-key-${key}` }>
                <defs>
                  <clipPath id={ `clip-half-left-${layerOptions.label}` }>
                    <rect
                      id={ `rect-half-left-${layerOptions.label}` }
                      x={ layerOptions.x }
                      y={ layerOptions.y }
                      width={ layerOptions.width }
                      height={ layerOptions.height }
                    />
                  </clipPath>
                </defs>
                <g clipPath={ `url(#clip-half-left-${layerOptions.label})` }>
                  <rect
                    width="100%"
                    height="100%"
                    fill="#ccc"
                  />
                  <Image
                    id={ `image-half-left-${layerOptions.label}` }
                    x={layerData.x}
                    y={this.calculateYPosition(layers, layerData)}
                    href={layerData.src}
                    height={layerData.height}
                    width={layerData.width}
                    draggable={layerData.draggable}
                    transform={layerData.transform}
                    opacity={layerData.opacity}
                    key={ `image-key-${key}` }
                  />
                </g>
              </g>);
          break;

          case 'clip_half_right':
              array.push(<g>
                <defs>
                  <clipPath id="clip-half-right">
                    <rect
                      id="rect-half-right"
                      x="51%"
                      y="0"
                      width="49%"
                      height="100%"
                    />
                  </clipPath>
                </defs>
                <g clipPath="url(#clip-half-right)">
                  <rect
                    width="100%"
                    height="100%"
                    fill="#bada55"
                  />
                  <Image
                    id="image-half-right"
                    x={layerData.x}
                    y={this.calculateYPosition(layers, layerData)}
                    href={layerData.src}
                    height={layerData.height}
                    width={layerData.width}
                    draggable={layerData.draggable}
                    transform={layerData.transform}
                    opacity={layerData.opacity}
                    key={key}
                  />
                </g>
              </g>);
              break;

        case 'rectangle':
          array.push(
            <Rectangle
              x={ layerOptions.x || layerData.x }
              y={ layerOptions.y || this.calculateYPosition(layers, layerData) }
              fill={ layerOptions.fill || layerData.fill }
              height={ layerOptions.height || layerData.height }
              width={ layerOptions.width || layerData.width }
              draggable={ layerOptions.draggable || layerData.draggable }
              transform={ layerOptions.transform || layerData.transform }
              key={key}
            />
          )
          break;
        case 'circle':
          array.push(<Circle x={layerData.x}
            y={this.calculateYPosition(layers, layerData)}
            fill={layerData.fill}
            radius={layerData.radius}
            draggable={layerData.draggable}
            transform={layerData.transform}
            key={key} />);
          break;
        case 'ellipse':
          array.push(<Ellipse x={layerData.x}
            y={this.calculateYPosition(layers, layerData)}
            fill={layerData.fill}
            radiusX={layerData.radiusX}
            radiusY={layerData.radiusY}
            draggable={layerData.draggable}
            transform={layerData.transform}
            key={key} />);
          break;
        case 'line':
          array.push(<Line x={[layerData.x1, layerData.x2]}
            y={[layerData.y1, layerData.y2]}
            stroke={layerData.stroke || layerData.fill}
            draggable={layerData.draggable}
            transform={layerData.transform}
            key={key} />);
          break;
        case 'path':
          array.push(<Path d={layerData.path || layerData.d}
            fill={layerData.fill}
            draggable={layerData.draggable}
            transform={layerData.transform}
            key={key} />)
          break;
      }
    });

    return array;
  }

  /**
   * Compute the fonts needed for the card
   * @param {object} fonts - The fonts to use when rendering this card
   *
   * @return {array} An array of React elements to render in the <defs /> element of the SVG
   */
  computeFonts (fonts = {}) {
    return Object.keys(fonts).map((key, index) => {
      let src = fonts[key];
      let format = 'svg';
      if (typeof fonts[key] === 'object') {
        src = fonts[key].src;
        format = fonts[key].format || 'svg';
      }

      return (
        <style key={index}>
          {`@font-face {
              font-family: '${key}';
              src: url("${src}") format("${format}");
              font-weight: normal;
              font-style: normal;
          }`}
        </style>
      );
    });
  }

  /**
   * Renders the card
   * @return {object} JSX for the React Component
   */
  render () {
    // Grab our configuration
    const { card, fonts, layers } = this.props.configuration;
    console.log('card props', this.props)
    // Compute layers, gradients and fonts
    const layerArray = this.computeLayers(layers);
    const gradientsArray = this.computeGradients(layers);
    const fontsArray = this.computeFonts(fonts);

    // Return
    return (
      <div className="card" ref="svg" style={{maxWidth: card.width, maxHeight: card.height}}>
        <SVG height={card.height} width={card.width} fill={card.fill}>

          <defs>
            {fontsArray}
            {gradientsArray}
          </defs>

          {layerArray}

        </SVG>
      </div>
    );
  }

}

Card.propTypes = {
  configuration: React.PropTypes.shape({
    card: React.PropTypes.object,
    fonts: React.PropTypes.object,
    layers: React.PropTypes.object
  })
}

// Export
module.exports = Card;
