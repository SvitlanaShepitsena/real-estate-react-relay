import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';

import {initialize, navigate} from '../utils/googleAnalytics';
import {connect} from 'react-redux';

import * as urlActions from '../actions/url.js';
if (process.env.BROWSER) {
    require('../assets');
}

export default class App extends Component {
    static contextTypes = {i18n: React.PropTypes.object};

    componentDidMount() {
        this.props.urlChange(this.props.location.pathname);
        initialize();
        navigate({
            page: this.props.location.pathname,
            title: this.props.routes[this.props.routes.length - 1].path
        });

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
        this.props.urlChange(nextProps.location.pathname);
            navigate({
                page: nextProps.location.pathname,
                title: nextProps.routes[nextProps.routes.length - 1].path
            });
        }
    }

    render() {

        return (
            <div id="app-view">
                {this.props.children}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(urlActions, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
