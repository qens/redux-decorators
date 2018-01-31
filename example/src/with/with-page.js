import * as React from 'react';
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {reducerName, withReducer} from "./reducer";
import {Field, Form, reduxForm} from "redux-form";
import {FieldTypes, reduxFormField} from "../common/redux-form-field";

class WithPage extends React.PureComponent {

    componentDidMount() {
        this.props.getData();
    }

    render() {
        return <div>
            {this.renderSimpleTrigger()}
            {this.renderData()}
            {this.renderSimpleForm()}
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

    renderSimpleForm() {
        const {handleSubmit, reset, pristine, submitting, onSubmit} = this.props;
        return <Form onSubmit={handleSubmit}>
            <Field name="username" type={FieldTypes.text} component={reduxFormField}/>
            <Field name="password" type={FieldTypes.password} component={reduxFormField}/>
            <Button type="submit" disabled={pristine || submitting}>Login</Button>
            <Button type="button" onClick={reset} disabled={pristine || submitting}>Clear</Button>
        </Form>
    }

}

const WithPageForm = reduxForm({
    form: reducerName
})(WithPage);

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
        getData: bindActionCreators(withReducer.getData, dispatch),
        onSubmit: withReducer.login,
        triggerAction: bindActionCreators(withReducer.trigger, dispatch)
    };
})(WithPageForm);