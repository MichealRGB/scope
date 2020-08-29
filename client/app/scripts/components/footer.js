import React from 'react';
import { connect } from 'react-redux';

import Plugins from './plugins';
import { trackAnalyticsEvent } from '../utils/tracking-utils';
import {
  clickDownloadGraph,
  clickForceRelayout,
  toggleHelp,
  toggleTroubleshootingMenu,
  setContrastMode
} from '../actions/app-actions';


class Footer extends React.Component {
  handleContrastClick = (ev) => {
    ev.preventDefault();
    this.props.setContrastMode(!this.props.contrastMode);
  }

  handleRelayoutClick = (ev) => {
    ev.preventDefault();
    trackAnalyticsEvent('scope.layout.refresh.click', {
      layout: this.props.topologyViewMode,
    });
    this.props.clickForceRelayout();
  }

  render() {
    const {
      hostname, version, versionUpdate, contrastMode
    } = this.props;

    const otherContrastModeTitle = contrastMode
      ? 'Switch to normal contrast' : 'Switch to high contrast';
    const forceRelayoutTitle = 'Force re-layout (might reduce edge crossings, '
      + 'but may shift nodes around)';
    const versionUpdateTitle = versionUpdate
      ? `New version available: ${versionUpdate.get('version')} Click to download`
      : '';

    return (
      <div className="footer">
        <div className="footer-status">
          {versionUpdate
            && (
              <a
                className="footer-versionupdate"
                title={versionUpdateTitle}
                href={versionUpdate.get('downloadUrl')}
                target="_blank"
                rel="noopener noreferrer">
                Update available:
                {' '}
                {versionUpdate.get('version')}
              </a>
            )
          }
          <span className="footer-label">Version</span>
          {version || '...'}
          <span className="footer-label">on</span>
          {hostname}
        </div>

        <div className="footer-plugins">
          <Plugins />
        </div>

        <div className="footer-tools">
          <button
            type="button"
            className="footer-icon"
            onClick={this.handleRelayoutClick}
            title={forceRelayoutTitle}>
            <i className="fa fa-sync" />
          </button>
          <button
            type="button"
            onClick={this.handleContrastClick}
            className="footer-icon"
            title={otherContrastModeTitle}>
            <i className="fa fa-adjust" />
          </button>
          <button
            type="button"
            onClick={this.props.toggleTroubleshootingMenu}
            className="footer-icon"
            title="Open troubleshooting menu"
            href=""
          >
            <i className="fa fa-bug" />
          </button>
          <button
            type="button"
            className="footer-icon"
            onClick={this.props.toggleHelp}
            title="Show help">
            <i className="fa fa-question" />
          </button>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contrastMode: state.get('contrastMode'),
    hostname: state.get('hostname'),
    topologyViewMode: state.get('topologyViewMode'),
    version: state.get('version'),
    versionUpdate: state.get('versionUpdate'),
  };
}

export default connect(
  mapStateToProps,
  {
    clickDownloadGraph,
    clickForceRelayout,
    setContrastMode,
    toggleHelp,
    toggleTroubleshootingMenu
  }
)(Footer);
