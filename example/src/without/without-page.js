import * as React from 'react';
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {reducerName} from "./reducer";
import {triggerAction, getDataAction} from "./actions";
import {withReducer} from "../with/reducer";

class WithoutPage extends React.PureComponent {

    componentDidMount() {
        this.props.getData();
    }

    render() {
        return <div>
            {this.renderSimpleTrigger()}
            {this.renderData()}
        </div>
    }

    renderSimpleTrigger() {
        const {trigger, triggerAction} = this.props;

        return <Button onClick={() => triggerAction(!trigger)}>Set to {trigger ? 'true' : 'false'}</Button>
    }

    renderData() {
        const {data, loading} = this.props;

        return <div>
            {loading ? <span>loading...</span> : null}
            {data && data.map((item, key) => <div key={key}>{item}</div>)}
        </div>;
    }

}

export default connect((rootState, props) => {
    const state = rootState[reducerName];
    const trigger = state.get('trigger');
    const data = state.get('data');
    const loading = state.get('loading');
    return {
        loading,
        data,
        trigger
    };
}, dispatch => {
    return {
        getData: bindActionCreators(getDataAction, dispatch),
        triggerAction: bindActionCreators(triggerAction, dispatch)
    };
})(WithoutPage);