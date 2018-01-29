import * as React from 'react';
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {reducerName, withReducer} from "./reducer";
import {Field, Form, reduxForm} from "redux-form";
import {FieldTypes, reduxFormField} from "../common/redux-form-field";

class WithoutPage extends React.Component {

    render() {
        return <div>
            {this.renderSimpleTrigger()}
            {this.renderSimpleForm()}
        </div>
    }

    renderSimpleTrigger() {
        const {trigger, triggerAction} = this.props;

        return <Button onClick={() => triggerAction(!trigger)}>Set to {trigger ? 'true' : 'false'}</Button>
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

const WithoutPageForm = reduxForm({
    form: reducerName
})(WithoutPage);

export default connect((rootState, props) => {
    const state = rootState[reducerName];
    const trigger = state.get('trigger');
    return {
        trigger
    };
}, dispatch => {
    return {
        onSubmit: withReducer.login,
        triggerAction: bindActionCreators(withReducer.trigger, dispatch)
    };
})(WithoutPageForm);