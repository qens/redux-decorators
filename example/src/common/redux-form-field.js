import React from 'react';
import {Checkbox, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {uniqueId} from "lodash/util";
import classNames from "classnames";

export const FieldTypes = {
    checkbox: 'checkbox',
    text: 'text',
    number: 'number',
    email: 'email',
    password: 'password',
    file: 'file',
    image: 'image',
    textarea: 'textarea',
};

export const reduxFormField = (field) => {
    const {
        id, value, name, input = {value: value, name: name}, label, type,
        disabled,
        maxLength, required,
        className, labelClass, valueClass,
        meta: {asyncValidating, touched, error} = {touched: true, dirty: true, error: null, asyncValidating: false}
    } = field;
    const controlId = id || input.name || uniqueId('field');
    const showErrors = touched && error;

    const onChange = e => {
        field.onChange && field.onChange(e);
        input.onChange && input.onChange(e);
    };

    let control, showLabel = true;

    switch (type) {
        case FieldTypes.checkbox :
            showLabel = false;
            control = (<Checkbox {...input} checked={input.value} disabled={disabled} onChange={onChange}>
                <span className="control-label">{label}</span>
            </Checkbox>);
            break;

        case FieldTypes.textarea:
            const {rows, cols} = field;
            control = <FormControl {...input} componentClass="textarea" placeholder={label}
                                   {...{rows, cols, disabled, onChange, maxLength}} />;
            break;
        case FieldTypes.file:
            control = <input type={FieldTypes.file} onChange={ev => {
                onChange(ev)
            }}/>;
            break;
        case FieldTypes.select :
            const {options, valueKey = 'value', labelKey = 'name', renderOption} = field;
            control = (<FormControl {...input}
                                    componentClass="select"
                                    placeholder={label}
                                    disabled={disabled}
                                    onChange={onChange}>
                {input.value ? null : <option value={null} />}
                {options && options.map(option =>
                    <option key={option[valueKey]} value={option[valueKey]}>
                        {renderOption ? renderOption(option) : option[labelKey]}
                    </option>
                )}
            </FormControl>);
            break;
        case FieldTypes.image:
            control = <React.Fragment>
                <input type={FieldTypes.file}
                       accept="image/png, image/jpeg, image/gif"
                       onChange={ev => {
                           onChange(ev)
                       }}/>
                {input.value &&
                <img src={window.URL.createObjectURL(input.value[0])} style={{maxWidth: 50, maxHeight: 50}}/>}
            </React.Fragment>;
            break;
        default:
            control = (
                <FormControl
                    {...input}
                    type={type}
                    placeholder={label}
                    disabled={disabled}
                    onChange={onChange}
                    maxLength={maxLength}
                />
            );
    }

    return (
        <FormGroup
            className={classNames('redux-field-group ', className,
                {
                    'required': required,
                    'asyncValidating': asyncValidating
                },
            )}
            validationState={showErrors ? 'error' : null}
            controlId={controlId}
            bsSize="small"
        >
            {showLabel ? <ControlLabel className={labelClass}>{label}</ControlLabel> : null}
            <div className={classNames('form-field ', valueClass)}>
                {control}
                {showErrors ? error : ''}
            </div>
        </FormGroup>
    );


};
