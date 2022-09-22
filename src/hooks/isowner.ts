// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest, Forbidden } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if (context.params.user) {
      const user = context.params.user;
      if (!(user._id === context.data.user._id || user.admin)) {
        throw new Forbidden("Reserved for admin and owner.");
      }
    } else {
      throw new BadRequest("No user specified in request.")
    }
    
    return context;
  };
};
