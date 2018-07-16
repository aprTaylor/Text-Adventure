import vis from 'vis'
import 'vis/dist/vis-network.min.css'
import React, {Component} from 'react';

export class Map extends Component {
    constructor(props){
        super(props);
        
        props.generate();
    }
    componentDidUpdate(){
        if(!this.props.hasRendered){
            let container = document.getElementById('map');
            let network = new vis.Network(container, this.props.data, this.props.options);
            this.props.setHasRendered();
        }
    }
    render(){
        return <div id="map"></div>;
    }
}