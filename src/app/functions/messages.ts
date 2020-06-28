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
