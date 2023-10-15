// code not used for now
import React from 'react';
import { Field, Formik, Form } from 'formik';

const RTE = ({ name, label, defaultValue = "" }) => {
    return (
        <div className='w-full'>
            { label && <label className='inline-block mb-1 pl-1'>{ label }</label> }

            <Formik
                initialValues={ { [name || 'content']: defaultValue } }
                onSubmit={ (values) => {
                    // Handle form submission
                    console.log(values);
                } }
            >
                { ({ values, handleChange }) => (
                    <Form>
                        <Field name={ name || 'content' }>
                            { ({ field }) => (
                                <textarea
                                    rows="10" // You can adjust the number of rows as needed
                                    className="w-full border rounded p-2"
                                    { ...field }
                                    onChange={ handleChange } // Use handleChange to update the form state
                                />
                            ) }
                        </Field>
                        <button type="submit">Submit</button>
                    </Form>
                ) }
            </Formik>
        </div>
    );
};

export default RTE;
