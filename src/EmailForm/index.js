import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { apiCall } from '../store/modules/api'
import './emailForm.scss'

const EmailForm = () => {
    const submitedData = useSelector(state => state.api.data);
    const formError = useSelector(state => state.api.error);
    const dispatch = useDispatch();

    const [payload, setPayload] = useState({})
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setEmailError] = useState(null)

    function validateEmail(emailField) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(emailField) == false) {
            setEmailError('Invalid Email Address');
            return false;
        } else {
            setEmailError(null)
        }

        return true;

    }
    const handleChange = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
        if (e.target.name === "emailAddress") {
            validateEmail(e.target.value)
        }
    }
    const handleValidation = () => {
        let formIsValid = true;
        if (!payload["firstName"]) {
            formIsValid = false;
            setFirstNameError("First Name Cannot be empty")
        } else {
            setFirstNameError(null)
        }
        if (!payload["lastName"]) {
            formIsValid = false;
            setLastNameError("Last Name Cannot be empty")
        } else {
            setLastNameError(null)
        }
        if (payload["firstName"] && payload["lastName"] && !emailError) {
            // handleSubmit(payload)
            apiCall(payload)(dispatch)
        }
        return formIsValid;
    }
    const handleReset = () => {
        setPayload({})
        setFirstNameError(null)
        setLastNameError(null)
        setEmailError(null)
    }

    return (
        <div data-test={'container'} className='container'>
            {submitedData && submitedData.status ?
                (<Fragment>
                    <h2>{submitedData.status}</h2>
                    <p>{submitedData.message}</p>
                </Fragment>) :
                (<Fragment>
                    <h2>Sign up for email updates</h2>
                    <p>*Indicates Required Field</p>
                    <div data-test={'TopGrid'} className='SGrid'>
                        <div>
                            <div>
                                <span data-test={'fisrtName'} className='Serror'><i>{firstNameError}</i></span><br />
                        FIRST NAME*
                        </div>
                            <input className={firstNameError ? 'SError' : 'SInput'} value={payload.firstName || ''} name='firstName' onChange={handleChange} />
                        </div>
                        <div>
                            <div><span className='Serror'><i>{lastNameError}</i></span><br />LAST NAME*</div>
                            <input className={lastNameError ? 'SError' : 'SInput'} value={payload.lastName || ''} name='lastName' onChange={handleChange} />
                        </div>
                        <div>
                            <div>
                                <div><span className='Serror'><i>{emailError}</i></span><br />EMAIL ADDRESS*</div>
                                <input className={lastNameError ? 'SError' : 'SInput'} value={payload.emailAddress || ''} name='emailAddress' onChange={handleChange} />
                            </div>
                        </div>
                        <div data-test={'selectResident'} style={{ paddingTop: '18px' }}>
                            <div>ORGANIZATION</div>
                            <input className={'SInput'} value={payload.organization || ''} name='organization' onChange={handleChange} />
                        </div>
                        <div>
                            <div>EU RESIDENT</div>
                            <div>
                                <select className='Sselect' value={payload.euResident || "- SELECT ONE"} name="euResident" onChange={handleChange}>
                                    <option selected value="- SELECT ONE">- SELECT ONE -</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                        <div></div>
                        <div data-test={'advances'} className='selectGrid'>
                            <div className='SCheckboxDiv'>
                                <div>
                                    <input name="advances" className={'SCheckbox'} type="checkbox" value={!payload.checkbox || false} onChange={handleChange} />
                                </div>
                                <div className='checkboxLabels'>ADVANCES</div>
                            </div>
                            <div className='SCheckboxDiv'>
                                <div>
                                    <input name="alerts" className={'SCheckbox'} type="checkbox" value="alerts" onChange={handleChange} />
                                </div>
                                <div className='checkboxLabels'>ALERTS</div>
                            </div>
                            <div className='SCheckboxDiv' data-test={'comunications'}>
                                <div>
                                    <input name="comunications" className={'SCheckbox'} type="checkbox" value="communications" onChange={handleChange} />
                                </div>
                                <div className='checkboxLabels'>
                                    OTHER COMMUNICATIONS
                            </div>

                            </div>
                        </div>
                    </div>
                    <div data-test={'button'} className='buttonDiv'>
                        <button className='SsubmitButton' onClick={handleValidation}>SUBMIT</button>
                        <button className='SresetButton' onClick={handleReset}>RESET</button>
                    </div></Fragment>)}
        </div>
    )
}

export default EmailForm