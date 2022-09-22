import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import isAdmin from '../../hooks/isadmin';
import isOwner from '../../hooks/isowner';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [  authenticate('jwt'), isAdmin(), hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt'), isAdmin() ],
    patch: [hashPassword('password'), authenticate('jwt'), isOwner()],
    remove: [ authenticate('jwt'), isAdmin() ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
