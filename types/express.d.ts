// types/express.d.ts

import { IUser } from '../src/modules/users/domain/user'

declare global {
    // eslint-disable-next-line
    namespace Express {
        // eslint-disable-next-line
        interface Request {
            user?: IUser;
        }
    }
}
