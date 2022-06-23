import { createUserToken } from './../middleware/authontication';
import UserSchema from "../db/user"
import { Observable, of, throwError, tap, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { createToken } from '../middleware/authontication';
import bcrypt from "bcrypt"

export class LoginController {

  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  public static userLogin(body): Observable<any> {
    const { email, password } = body
    let user;
    return of(true).pipe(
      mergeMap(() => from(UserSchema.findOne({ email }))),
      tap((t) => user = t),
      mergeMap((m: any) => from(bcrypt.compare(password, m.password))),
      mergeMap((m: any) => {
        return user.verified ? of(m) : throwError(() => 401)
      }
      ),
      mergeMap((m) => m ? of({ token: createUserToken({ ...user }), id: user._id }) : throwError(() => 400))
    )
  }
}