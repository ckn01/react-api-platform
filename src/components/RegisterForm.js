import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../form';

class RegisterForm extends React.Component {
    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    <form>
                        <Field name="username" label="username:" type="text" component={ renderField } />
                        <Field name="password" label="Passowrd:" type="password" component={ renderField } />
                        <Field name="retypedpassword" label="Re-type Password:" type="password" component={ renderField } />
                        <Field name="email" label="E-Mail:" type="text" component={ renderField } />
                        <Field name="name" label="Full Name:" type="text" component={ renderField } />

                        <div className="form-check form-group">
                            <input className="form-check-input" type="checkbox" value={ false } />
                            <label className="form-check-label">I agree to the terms and conditions</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-big btn-block">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'RegisterForm'
})(RegisterForm);