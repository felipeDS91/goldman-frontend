import React, { forwardRef, useRef } from 'react';
import * as Yup from 'yup';

import { ToastError } from '~/components/Message';
import { FormWrapper } from './styles';

const Form = forwardRef(({ children, schema, onSubmit, ...props }, ref) => {
  if (!ref) ref = useRef(null);

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      ref.current.setErrors({});

      const validatedData = await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed
      onSubmit(validatedData);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        ToastError('Erro ao validar campos');
        ref.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <FormWrapper ref={ref} onSubmit={handleSubmit} {...props}>
      {children}
    </FormWrapper>
  );
});

export default Form;
