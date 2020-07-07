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

export const employeeMessages = {
  username: [
    { type: 'required', message: 'El nombre de usuario es obligatorio' }
  ],
  email: [
    { type: 'required', message: 'El correo es obligatorio' },
    { type: 'pattern', message: 'El correo es inválido' },
    { type: 'email', message: 'El correo es inválido' }
  ],
  password: [
    { type: 'required', message: 'La contraseña es obligatoria' }
  ],
  name: [
    { type: 'required', message: 'El nombre del empleado es obligatorio' }
  ],
  paternal: [
    { type: 'required', message: 'El apellido paterno es obligatorio' }
  ],
  maternal: [
    { type: 'required', message: 'El apellido materno es obligatorio' }
  ],
  role: [
    { type: 'required', message: 'El rol es obligatorio' }
  ],
  phone: [
    { type: 'required', message: 'El teléfono es obligatorio' }
  ],
};

export const productMessage = {
  name: [
    { type: 'required', message: 'El nombre del producto es obligatorio' }
  ],
  price: [
    { type: 'required', message: 'El precio del producto es obligatorio' }
  ]
};
