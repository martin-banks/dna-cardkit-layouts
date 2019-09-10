// Libraries
const React = require('react');


// Styles
require('./base.scss');

// Elements
const {
  Header,
  Sidebar,
  Canvas
} = require('./elements');

// UI class
class UI extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      configuration: this.props.configuration,
      template: ((this.props.templates) ? Object.keys(this.props.templates)[0] : false),
      theme: ((this.props.themes) ? Object.keys(this.props.themes)[0] : false),
      layout: ((this.props.layouts)
        ? this.props.defaultLayout || Object.keys(this.props.layouts)[0]
        : false
      ),
      sidebarOpen: true,
    };

    console.log('ui state', this.state)
    console.log('ui props', this.props)

    this.updateConfiguration = this.updateConfiguration.bind(this);
    this.updateTemplate = this.updateTemplate.bind(this);
    this.updateTheme = this.updateTheme.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.downloadCard = this.downloadCard.bind(this);
    this.handleSidebarChange = this.handleSidebarChange.bind(this);
  }

  updateConfiguration (configuration) {
    console.log('configuration change', this.state.configuration)
    console.log('new configuration', configuration)
    this.setState({
      configuration: configuration
    });
  }

  updateTemplate (template) {
    console.log('updating template')
    const configuration = this.props.cardKit.computeConfiguration({
      template: template,
      theme: this.state.theme,
      layout: this.state.layout
    });

    this.setState({
      configuration: configuration,
      template: template
    });
  }

  updateLayout (layout) {
    // ! activeCardLayout is a global variable in the config file
    // ! It is used to dynamically set x-position on some child elements
    window.activeCardWidth = window.layouts[layout].card.width
    console.log(window.layouts, window.activeCardWidth, layout)
    const configuration = this.props.cardKit.computeConfiguration({
      template: this.state.template,
      theme: this.state.theme,
      layout: layout
    });

    configuration.layout = layout

    this.setState({
      configuration: configuration,
      layout: layout
    });
  }

  updateTheme (theme) {
    const configuration = this.props.cardKit.computeConfiguration({
      template: this.state.template,
      theme: theme,
      layout: this.state.layout
    });

    this.setState({
      configuration: configuration,
      theme: theme
    });
  }

  downloadCard () {
    // This is dumb, but allows us to get at the SVG element on the DOM, which we can then send off for download
    this.props.cardKit.download(2, this.refs.canvas.refs.card.refs.svg)
    ga('send', {
      hitType: 'event',
      eventAction: 'download',
      eventCategory: 'CardKit save',
      eventLabel: this.state.configuration,
    })
  }

  handleSidebarChange (state) {
    this.setState({
      sidebarOpen: state
    });
  }

  componentWillReceiveProps (nextProps) {
    this.updateConfiguration(nextProps.configuration);
  }

  render () {
    return (
      <div>
        {/* <Header /> */}

        <main className="main">

          <Sidebar
            configuration={this.state.configuration}

            template={this.state.template}
            templates={this.props.templates}

            theme={this.state.theme}
            themes={this.props.themes}

            layout={this.state.layout}
            layouts={
              Object.keys(this.props.layouts)
                .filter(key => Object.keys(this.props.configuration.template.layerItems).includes(key))
                .reduce((output, key) => {
                  const update = output
                  update[key] = this.props.layouts[key]
                  return update
                }, {})
            }

            onConfigurationChange={this.updateConfiguration}
            onTemplateChange={this.updateTemplate}
            onThemeChange={this.updateTheme}
            onLayoutChange={this.updateLayout}

            onRequestDownload={this.downloadCard}
            onSidebarChange={this.handleSidebarChange}
          />

          <Canvas ref="canvas"
            sidebarOpen={this.state.sidebarOpen}
            configuration={this.state.configuration}
            layout={ this.state.layout }
          />

        </main>

      </div>
    );
  }

}

UI.propTypes = {
  templates: React.PropTypes.object,
  layouts: React.PropTypes.object,
  themes: React.PropTypes.object,
  cardKit: React.PropTypes.object.isRequired,
  configuration: React.PropTypes.object.isRequired
}

// Export
module.exports = UI;
