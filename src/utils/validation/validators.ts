import {FormikErrors, FormikValues} from "formik";

export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = value => {
    if (value) return undefined;

    return "Field is required";
}

export const maxLengthCreator = (maxLength: number):FieldValidatorType => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}

export const validateEmailField = (values:FormikValues) => {

    let errors: FormikErrors<FormikValues> = {};
    if (!values.email) {
        errors.email = 'Required 1';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( values.email )
    ) {
        errors.email = 'Invalid email address';
    }
    return errors;

}