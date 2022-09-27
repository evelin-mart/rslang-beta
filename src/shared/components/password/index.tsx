import React from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface PasswordFormControlProps {
  required: boolean;
  value: unknown;
  error?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
export const PasswordFormControl = ({ required, value, error, onChange }: PasswordFormControlProps) => {
  const [ showPassword, setShowPassword ] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" sx={{
        color: error ? "error.main" : "default",
        "&.Mui-focused": {
          color: error ? "error.main" : "default",
        }
      }}>
        Password{required && ' *'}
      </InputLabel>
      <OutlinedInput
        required={required}
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        error={error}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  )
}