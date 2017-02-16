import React from 'react';

const renderCustomOption = ({ submitting, submitSucceeded, disableInput, input, label, type, meta: { error, warning } }) => (
  <span className={`form-inline ${error ? 'has-error' : ''}`}>
    <label style="margin-right:10px;" className="control-label">{label}</label>
    <input {...input} style="max-width:184px" className="form-control" type={type} disabled={disableInput || submitSucceeded || submitting}/>
    {((error && <span className="control-label">{error}</span>) || (warning && <span>{warning}</span>))}
  </span>
)

export default renderCustomOption;
                