import * as React from 'react';
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {reducerName, withReducer} from "./reducer";

class WithoutPage extends React.Component {

    render() {
        return <div>
            {this.renderSimpleTrigger()}
        </div>
    }

    renderSimpleTrigger() {
        const {trigger, triggerAction} = this.props;

        return <Button onClick={() => triggerAction(!trigger)}>Set to {trigger ? 'true' : 'false'}</Button>
    }

}

export default connect((rootState, props) => {
    const state = rootState[reducerName];
    const trigger = state.get('trigger');
    return {
        trigger
    };
}, dispatch => {
    return {
        triggerAction: bindActionCreators(withReducer.trigger, dispatch)
    };
})(WithoutPage);