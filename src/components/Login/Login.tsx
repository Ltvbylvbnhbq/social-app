import * as Yup from 'yup'
import React from "react";
import {AppStateType} from "../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {validateEmailField} from "../../utils/validation/validators";
import {login} from "../../redux/auth-reducer";
import s from '../../utils/validation/ErrorMessage.module.css'


const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min (2, `Enter at least  2 characters`)
        .max(15, `Enter no more than 15 characters`)
        .required(`Required 2`)
})

export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector(
        (state:AppStateType) => state.auth.captchaUrl
    )

    const isAuth = useSelector(
        (state:AppStateType) => state.auth.isAuth
    )
    const dispatch = useDispatch()

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false,
                    general: '',
                    captcha: ''
                }}
                validate={validateEmailField}
                validationSchema={validationSchema}
                onSubmit={(
                    values,
                        bagWithMethods
                ) => {
                    let {setStatus, setFieldValue, setSubmitting} = bagWithMethods

                dispatch(login(
                    values,
                    setStatus,
                    setFieldValue,
                    setSubmitting))
                }}
            >
                {(propsF) => {
                    let {status, values, isSubmitting} = propsF
                    return (
                        <Form>
                            <div>
                                {values.general &&
                                <div>
                                    _.{values.general} - with setFieldValue
                            </div>}
                                {status &&
                                <div className={s.validationErrorMessage}>
                                    ..{status}
                                </div>}

                                {status && captchaUrl &&
                                <div>

                                    <div>
                                        <img src={captchaUrl} alt={status} />
                                    </div>

                                    <div>
                                        <Field
                                            name={'captcha'}
                                            type={'text'}/>
                                    </div>
                                </div>
                                }
                                <div>
                                    <Field
                                        name={'email'}
                                        type={'text'}
                                        placeholder={'email'}/>
                                </div>
                                <div className={s.validationErrorMessage}>
                                    <ErrorMessage name='email' />
                                </div>
                                <div>
                                    <Field
                                    type={'password'}
                                    name={'password'}
                                    placeholder='password' />
                                </div>
                                <div className={s.validationErrorMessage}>
                                    <ErrorMessage name='password' />
                                </div>
                                <div>
                                    <Field
                                        type ={'checkbox'}
                                        name={'rememberMe'}
                                        id='rememberMe' />
                                    <label htmlFor={'rememberMe'}> remember me </label>
                                </div>

                                <button type={'submit'}
                                        disabled={isSubmitting}>
                                    {isSubmitting ? 'Please wait...' : 'Submit'}
                                </button> <br/><br/>
                            </div>
                        </Form>
                    )
                }
                }
            </Formik>
        </div>
    )
}