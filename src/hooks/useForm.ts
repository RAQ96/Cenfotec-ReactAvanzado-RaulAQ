import { useReducer, useCallback } from 'react';

type FormErrors<T> = Partial<Record<keyof T, string>> & { submit?: string };

interface FormState<T> {
  values: T;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

function initialState<T>(initialValues: T): FormState<T> {
  return {
    values: initialValues,
    errors: {} as FormErrors<T>,
    touched: {},
    isSubmitting: false,
  };
}

type FormAction<T> =
  | { type: 'SET_FIELD'; field: keyof T; value: unknown }
  | { type: 'SET_ERRORS'; payload: FormErrors<T> }
  | { type: 'SET_TOUCHED'; field: keyof T }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET'; payload: T };

function formReducer<T>(state: FormState<T>, action: FormAction<T>): FormState<T> {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value as T[keyof T],
        },
        errors: {
          ...state.errors,
          [action.field]: '',
        },
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case 'RESET':
      return initialState<T>(action.payload);
    default:
      return state;
  }
}

type UseFormArgs<T> = {
  initialValues: T;
  validate?: (values: T) => FormErrors<T>;
  onSubmit?: (values: T) => Promise<void> | void;
};

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate = () => ({}),
  onSubmit = async () => {},
}: UseFormArgs<T>) {
  const [state, dispatch] = useReducer(formReducer<T>, initialState<T>(initialValues));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, type, value } = e.target;
      let fieldValue: unknown;
      if (type === 'checkbox') {
        fieldValue = (e.target as HTMLInputElement).checked;
      } else {
        fieldValue = value;
      }
      dispatch({ type: 'SET_FIELD', field: name as keyof T, value: fieldValue });
    },
    []
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      dispatch({ type: 'SET_TOUCHED', field: name as keyof T });
    },
    []
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault();
      const errors = validate(state.values);
      if (Object.keys(errors).length > 0) {
        dispatch({ type: 'SET_ERRORS', payload: errors });
        return;
      }

      dispatch({ type: 'SET_SUBMITTING', payload: true });
      try {
        await onSubmit(state.values);
        dispatch({ type: 'RESET', payload: initialValues });
      } catch (error) {
        const err = error as Error;
        dispatch({
          type: 'SET_ERRORS',
          payload: {
            ...state.errors,
            submit: err?.message || 'Error en el envío',
          } as FormErrors<T>,
        });
      } finally {
        dispatch({ type: 'SET_SUBMITTING', payload: false });
      }
    },
    [state.values, state.errors, validate, onSubmit, initialValues]
  );

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET', payload: initialValues });
  }, [initialValues]);

  const setValues = useCallback((values: T) => {
    dispatch({ type: 'RESET', payload: values });
  }, []);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  };
}
