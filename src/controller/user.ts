import{transporter2, sendVerification, sendReset} from "../notifications/verification"
import { createUserToken } from './../middleware/authontication';
import UserSchema from "../db/user"
import { from, Observable, of, forkJoin, tap } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import bcrypt from "bcrypt"
import { User } from '../models/User';


export class UserController {
  public static addUser(body): Observable<any> {
    const user = new User(body)

    return of(user).pipe(
      mergeMap((m) => from(bcrypt.hash(m.password, 10))),
      mergeMap((m) => from(UserSchema.create({ ...user, password: m }))),
      map((m) => {
        return { token: createUserToken(m) }
      }),
      tap((m) => console.log(`http://localhost:3000/confirmation/${m.token}`)),
      // mergeMap((m) => from(transporter2.sendMail(sendVerification(user.email, `${process.env.HOST}/${m.token}`)))),
    )
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  public static sendTokenTouser(email): Observable<any> {

    return of(email).pipe(
      mergeMap(() => from(UserSchema.findOne({ email }))),
      map((m) => {
        return { token: createUserToken(m) }
      }),
      tap((m) => console.log(`http://localhost:3000/reset/${m.token}`)),
      // mergeMap((m) => from(transporter2.sendMail(sendReset(email, `http://localhost:3001/reset/${m.token}`)))),
    )
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  public static verfieEmail(user): Observable<any> {
    return of(user).pipe(
      mergeMap(() => from(UserSchema.findByIdAndUpdate(user.id, { verified: true }, { new: true }))),
      map((m) => {
        return { token: createUserToken(m) }
      }),
    )
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  public static resetPassword(password, user): Observable<any> {
    console.log(password, user)
    return of(password).pipe(
      mergeMap((m) => from(bcrypt.hash(m, 10))),
      mergeMap((m) => from(UserSchema.findByIdAndUpdate(user.id, { password: m }, { new: true })))
    )
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------


}