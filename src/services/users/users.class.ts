import { Paginated, Params, Id, NullableId } from '@feathersjs/feathers';
import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import  appconfig from "../../appconfig"

interface UserInterface {
  _id?: string,
  admin: boolean,
  email: string,
  password: string,
  facebookId?: string,
  twitterId?: string,
  googleId?: string,
  githubId?: string,
  portfolioAddress?: string,
}

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  // Create an user.
  create (data: UserInterface, params?: Params) {
    const { email, password, facebookId, twitterId, googleId, githubId, portfolioAddress } = data

    const userData = {
      admin: email === appconfig.admin,
      email,
      password,
      facebookId,
      twitterId,
      googleId,
      githubId,
      portfolioAddress,
    }

    return super.create(userData, params)
  }

  // Get all users.
  find (params?: Params | undefined): Promise<any[] | Paginated<any>> {
    return super.find(params)
  }

  // Get one user by id.
  get (id: Id, params?: Params | undefined): Promise<any> {
    return super.get(id, params)
  }

  // Patch an user password.
  patch(id: NullableId, data: Partial<any>, params?: Params | undefined): Promise<any> {
    return super.patch(id, data)
  }
}
