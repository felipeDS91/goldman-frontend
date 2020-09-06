import React, { forwardRef, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { ToastError } from '~/components/Message';
import { FormWrapper } from './styles';

const Form = forwardRef(({ children, schema, onSubmit, ...props }, ref) => {
  if (!ref) ref = useRef(null);

  const handleSubmit = useCallback(
    async data => {
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
    },
    [onSubmit, ref, schema]
  );

  return (
    <FormWrapper ref={ref} onSubmit={handleSubmit} {...props}>
      {children}
    </FormWrapper>
  );
});

export default Form;

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  schema: PropTypes.instanceOf(Yup.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
