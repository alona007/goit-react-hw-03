import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import clsx from "clsx";
import css from "./ContactForm.module.css";

export default function ContactForm({ onAdd }) {
  const id = useId();

  const phone = /^\d{3}-\d{2}-\d{2}$/;

  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Must be more than 3 characters!")
      .max(50, "Must be less than 50 characters!")
      .required("Required!"),
    number: Yup.string()
      .matches(phone, "Required format ххх-хх-хх!")
      .required("Required!"),
  });

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    onAdd(newContact);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={UserSchema}
    >
      <Form className={clsx(css.form)}>
        <div className={clsx(css.fieldWrapper)}>
          <label className={clsx(css.label)} htmlFor={`${id}-name`}>
            Name
          </label>
          <Field
            className={clsx(css.field)}
            id={`${id}-name`}
            name="name"
            type="text"
          />
          <ErrorMessage
            className={clsx(css.error)}
            name="name"
            component="span"
          />
        </div>
        <div className={clsx(css.fieldWrapper)}>
          <label className={clsx(css.label)} htmlFor={`${id}-number`}>
            Number
          </label>
          <Field
            className={clsx(css.field)}
            id={`${id}-number`}
            name="number"
            type="tel"
          />
          <ErrorMessage
            className={clsx(css.error)}
            name="number"
            component="span"
          />
        </div>
        <button className={clsx(css.button)} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
