// Initializes the `employee` service on path `/employee`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Employee } from './employee.class';
import createModel from '../../models/employee.model';
import hooks from './employee.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'employee': Employee & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/employee', new Employee(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('employee');

  service.hooks(hooks);
}
