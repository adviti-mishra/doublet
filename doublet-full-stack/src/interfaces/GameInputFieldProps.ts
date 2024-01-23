export interface GameInputFieldProps {
  word: string;
  error: boolean;
  helperText: string;
  disabled: boolean;
  handleChange: () => void;
}
