import { Field, Form, Formik, ErrorMessage } from 'formik'
import React from 'react'
import s from './SearchBar.module.css'
import * as Yup from "yup";

const SearchBar = ({handleChangeQuery}) => {
  const feedbackSchema = Yup.object().shape({
    query: Yup.string()
      .min(3, "Too short!")
      .max(20, "Too long!")
      .required("This field is required!"),
  });
  const handleSubmit = (values, action) => {
    console.log(values);
    handleChangeQuery(values.query);
    action.resetForm();
  }
  return (
    <header className={s.headerStyle}>
      <Formik initialValues={{ query: '' }} 
              onSubmit={handleSubmit} 
              validationSchema={feedbackSchema}
      >
        <Form className={s.fomikInput}>
         <div className={s.formikInput}>
            <Field
              type="text"
              name = "query"
              placeholder="Search images and photos"
            />
            <ErrorMessage name="query" component="span" />
         </div>
          <button type="submit">Search</button>
          
        </Form>
      </Formik>
    </header>

  )
}

export default SearchBar
