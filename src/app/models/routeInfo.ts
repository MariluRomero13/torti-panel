export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class?: string;
}

export const appRoutes: RouteInfo[] = [
  { path: '/panel/dashboard', title: 'Dashboard', icon: 'view-dashboard' },
  { path: '/panel/empleados', title: 'Empleados', icon: 'account-supervisor-circle' },
  { path: '/panel/clientes', title: 'Clientes', icon: 'account-tie' },
  { path: '/panel/productos', title: 'Productos', icon: 'bottle-tonic' },
  { path: '/panel/inventario', title: 'Inventario', icon: 'package-variant' },
  { path: '/panel/asignar-productos', title: 'Asignar productos', icon: 'swap-horizontal' },
  { path: '/panel/asignar-clientes', title: 'Asignar clientes', icon: 'account-switch' },
  { path: '/panel/entregas', title: 'Entregas', icon: 'moped' },
  { path: '/panel/ventas', title: 'Ventas', icon: 'sale' },
  { path: '/panel/pagos-pendientes', title: 'Pagos pendientes', icon: 'currency-usd-off' },
  { path: '/panel/devoluciones', title: 'Devoluciones', icon: 'package-variant-closed' },
  { path: '/panel/reportes', title: 'Reportes', icon: 'file-chart' }
];

