export const loginMessage = {
  email: [
    { type: 'required', message: 'El correo es obligatorio' },
    { type: 'pattern', message: 'El correo es inválido' },
    { type: 'email', message: 'El correo es inválido' }
  ],
  password: [
    { type: 'required', message: 'La contraseña es obligatoria' }
  ]
};

export const recoveryPasswordMessage = {
  password: [
    { type: 'required', message: 'La contraseña nueva es obligatoria' },
    { type: 'min', message: 'El mínimo de caracteres es 5' }
  ],
  confirmPassword: [
    { type: 'required', message: 'El campo de confirmar contraseña es obligatorio' },
    { type: 'min', message: 'El mínimo de caracteres es 5' }
  ]
};
