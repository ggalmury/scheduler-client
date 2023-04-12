import { useState } from "react";

type UseInputProps<T> = [T, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void];

export const useInput = <T>(initialValue: T): UseInputProps<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value as T);
  };

  const resetForm = (): void => {
    setValue(initialValue);
  };

  return [value, onChangeForm, resetForm];
};
