// Libraries
const React = require('react');

// Styles
require('./style.scss');

const {
  Content,
  Template,
  Theme,
  Layout
} = require('../panels');
const PanelButton = require('./PanelButton');

// Sidebar class
class Sidebar extends React.Component {

  constructor (props) {
    super(props);

    let defaultPanel;
    if (this.props.templates) {
      defaultPanel = 'template';
    } else if (this.props.layouts) {
      defaultPanel = 'layout';
    } else if (this.props.themes) {
      defaultPanel = 'theme';
    } else {
      defaultPanel = 'content';
    }

    this.state = {
      panel: defaultPanel
    }

    this.handleConfigurationChange = this.handleConfigurationChange.bind(this);
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.updateConfiguration = this.updateConfiguration.bind(this);
    this.openPanel = this.openPanel.bind(this);
    this.isPanel = this.isPanel.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  updateConfiguration (e) {
    const configuration = this.props.configuration;

    this.props.onConfigurationChange(configuration);
  }

  openPanel (panel) {
    // ! Toggle side panel is not desired
    // * Toggle the canvas display to fill screen when side panel is collapsed
    // if (panel === this.state.panel) {
      // this.props.onSidebarChange(false);
    // } else {
      // this.props.onSidebarChange(true);
    // }

    // * Toggle side panel open/closed if active button is clicked on
    // this.setState({
    //   panel: (panel === this.state.panel ? true : panel)
    // });
    this.setState({ panel })
  }

  isPanel (panel) {
    return (this.state.panel === panel);
  }

  handleConfigurationChange (configuration) {
    this.props.onConfigurationChange(configuration);
  }

  handleTemplateChange (template) {
    this.props.onTemplateChange(template);
  }

  handleThemeChange (theme) {
    this.props.onThemeChange(theme);
  }

  handleLayoutChange (layout) {
    console.log('layout chenge...', layout)
    this.props.onLayoutChange(layout);
  }

  renderButton (panelName, panelTitle, options) {
    if (!options) return null;

    return (<PanelButton name={panelName}
      title={panelTitle}
      onClick={this.openPanel}
      active={this.isPanel(panelName)} />);
  }

  render () {
    return (
      <aside className={'sidebar' + (this.state.panel ? ' sidebar--open' : '')}>
        <main className="panels">
          {(() => {
            if (this.props.templates) {
              return (<Template templates={this.props.templates}
                template={this.props.template}
                active={this.isPanel('template')}
                onTemplateChange={this.handleTemplateChange} />);
            }
          })()}

          {(() => {
            if (this.props.layouts) {
              console.log('sidebar layouts', this.props.layouts, this.props.layout)
              return (<Layout
                layouts={ this.props.layouts }
                layout={this.props.layout}
                active={this.isPanel('layout')}
                onLayoutChange={this.handleLayoutChange} />);
            }
          })()}

          {(() => {
            if (this.props.themes) {
              return (<Theme themes={this.props.themes}
                theme={this.props.theme}
                configuration={this.props.configuration}
                active={this.isPanel('theme')}
                onThemeChange={this.handleThemeChange} />);
            }
          })()}

          {(() => {
            if (this.props.configuration) {
              return (<Content configuration={this.props.configuration}
                active={this.isPanel('content')}
                onConfigurationChange={this.handleConfigurationChange} />);
            }
          })()}
        </main>

        <ul className="buttons">

          {this.renderButton('template', 'Template', this.props.templates)}
          {this.renderButton('layout', 'Size', this.props.layouts)}
          {this.renderButton('theme', 'Themes', this.props.themes)}
          {this.renderButton('content', 'Content', this.props.configuration)}

          <li className="pull-bottom">
            <button onClick={this.props.onRequestDownload}>Save</button>
          </li>

        </ul>

      </aside>
    );
  }

}

Sidebar.propTypes = {
  onRequestDownload: React.PropTypes.func.isRequired,
  onConfigurationChange: React.PropTypes.func.isRequired,
  onSidebarChange: React.PropTypes.func.isRequired,
  onThemeChange: React.PropTypes.func.isRequired,
  onTemplateChange: React.PropTypes.func.isRequired,
  onLayoutChange: React.PropTypes.func.isRequired,
  configuration: React.PropTypes.object.isRequired,
  theme: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ]),
  themes: React.PropTypes.object,
  template: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ]),
  templates: React.PropTypes.object,
  layout: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ]),
  layouts: React.PropTypes.object
}

// Export
module.exports = Sidebar;
