import React, { Component, PropTypes } from 'react';
import tracker from 'utils/tracker.js';

export default class AbstractScene extends Component {
    constructor(props) {
        super(props);
        this.sceneEntity = "default_scene";
        this.sceneTopic = "";
    }
    componentWillMount() {
        tracker.trackPage(this.sceneEntity, this.sceneTopic);
    }
}
