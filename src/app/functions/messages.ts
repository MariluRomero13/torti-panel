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
    { type: 'required', message: 'La antigua contraseña es obligatoria' },
    { type: 'min', message: 'El mínimo de caracteres es 5' }
  ],
  newPassword: [
    { type: 'required', message: 'La contraseña nueva es obligatoria' },
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
    { type: 'required', message: 'El teléfono es obligatorio' },
    { type: 'max', message: 'El límite de caracteres es 10' }
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

export const stockMessage = {
  initial_stock:[
    {type: 'required',message: 'Sólo se admiten numeros'}
  ],
  product: [
    {type: 'required', message: 'Seleccione un producto'}
  ]
}

export const AssignmentProductMessage = {
  employee: [
    {type: 'required', message: 'Seleccione un empleado'}
  ],
  quantity: [
    {type: 'required', message: 'La cantidad es obligatoria'}
  ],
  product: [
    {type: 'required', message: 'Seleccione un producto'}
  ]
}

export const assignMessage = {
  employee: [
    { type: 'required', message: 'El empleado es obligatorio' }
  ],
  customers: [
    { type: 'required', message: 'Los clientes son obligatorios' }
  ]
};

export const customerMessage = {
  name: [
    {type: 'required', message: 'El nombre es obligatorio'}
  ],
  phone: [
    {type: 'required', message: 'El telefono es obligatorio'}
  ],
  address:[
    {type: 'required', message: 'La dirección es obligatoria'}
  ],
  latitude:[
    {type: 'required', message: 'La latitud es obligatoria'}
  ],
  longitude:[
    {type: 'required', message: 'La longitud es obligatoria'}
  ]
}
export const deliveryMessage = {
  deliveryDate: [
    { type: 'required', message: 'La fecha de entrega es obligatoria' }
  ],
};
