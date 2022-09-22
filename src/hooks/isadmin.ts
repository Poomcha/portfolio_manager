// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Forbidden, BadRequest } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if (context.params.user) {
      const user = context.params.user;
      if (!user.admin) {
        throw new Forbidden("Reserved for admin.");
      }
    } else {
      throw new BadRequest("No user specified in request.")
    }
    
    return context;
  };
};
