import { connect } from 'react-redux';

import { Map as MapComp }  from '../components/Map';
import * as actions  from '../actions/index'; 
import { addActions } from '../actions/index'

const mapStateToProps = state => ({
  hasRendered: state.mapHasRendered,
  options: state.mapOptions,
  data: state.mapData
});

const mapDispatchToProps = dispatch => ({
    generate: () => {
        return dispatch(actions.generateMap());
    },
    setHasRendered: () => {
        return dispatch(actions.mapRendered());
    }
});

export const Map = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MapComp);
  