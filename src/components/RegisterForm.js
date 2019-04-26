import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../form';
import { connect } from 'react-redux';
import { userRegister } from '../actions/actions';

const mapDispatchToProps = {
    userRegister
};

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { termsAccepted: false };
    }

    onSubmit(values) {
        // console.log(...Object.values(values));
        // return this.props.userRegister(...Object.values(values))
        console.log(values);
        return this.props.userRegister(values)
            .then(() => {
                this.props.reset();
                this.props.history.push('/');
            });
    }

    onTermsAcceptedClick(e) {
        this.setState(prevState => ({termsAccepted: !prevState.termsAccepted}));
    }

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                        <Field name="username" label="username:" type="text" component={ renderField } />
                        <Field name="password" label="Passowrd:" type="password" component={ renderField } />
                        <Field name="retypePassword" label="Re-type Password:" type="password" component={ renderField } />
                        <Field name="email" label="E-Mail:" type="text" component={ renderField } />
                        <Field name="name" label="Full Name:" type="text" component={ renderField } />

                        <div className="form-check form-group">
                            <input className="form-check-input" type="checkbox" 
                                    value={ false }
                                    onClick={ this.onTermsAcceptedClick.bind(this) } />
                            <label className="form-check-label">I agree to the terms and conditions</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-big btn-block"
                                disabled={ submitting || !this.state.termsAccepted }>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'RegisterForm'
})(connect(null, mapDispatchToProps)(RegisterForm));