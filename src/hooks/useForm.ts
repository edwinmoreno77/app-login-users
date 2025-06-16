import { useState, useCallback } from "react";
import { AxiosError } from "axios";

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    custom?: (value: string) => boolean;
    message?: string;
  };
}

interface UseFormProps<T extends { [key: string]: string }> {
  initialValues: T;
  validationRules: ValidationRules;
  onSubmit: (formData: T) => Promise<void>;
  onSuccess?: () => void;
}

export const useForm = <T extends { [key: string]: string }>({
  initialValues,
  validationRules,
  onSubmit,
  onSuccess,
}: UseFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = useCallback(
    (name: string, value: string): string => {
      const rules = validationRules[name];
      if (!rules) return "";

      if (rules.required && !value.trim()) {
        return rules.message || "Este campo es requerido";
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return rules.message || "Formato inválido";
      }

      if (rules.minLength && value.length < rules.minLength) {
        return rules.message || `Mínimo ${rules.minLength} caracteres`;
      }

      if (rules.custom && !rules.custom(value)) {
        return rules.message || "Valor inválido";
      }

      return "";
    },
    [validationRules]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField, validationRules]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      // Validate the field when it changes
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsLoading(true);
      try {
        await onSubmit(formData);
        if (onSuccess) {
          onSuccess();
        }
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        const errorMessage =
          error.response?.data?.message || "Error al procesar la solicitud";
        setErrors((prev) => ({ ...prev, submit: errorMessage }));
        // Mantenemos el estado del formulario cuando hay un error
        setFormData(formData);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, onSubmit, onSuccess, validateForm]
  );

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
  };
}; 