import * as jwt from "jsonwebtoken"
import { Request, Response } from "express"


export const isTokenValid = async (req: Request, res: Response, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET || "secret")
      const t = { id: payload.id, type: payload.type, email: payload.email }
      req.user = t
      next()
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    res.status(401).json({ error })
  }
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------

export const createToken = (user: any) => {
  const id = user._doc._id
  const type = user.type
  const email = user._doc.email
  return jwt.sign({ id, email, type }, process.env.JWT_SECRET || "secret", {
    expiresIn: '30d',
  })
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------  //--------------------------------------------------------------------------------------------------------------------------------------------------------
export const createUserToken = (user: any) => {
  const id = user._doc._id
  const email = user._doc.email
  return jwt.sign({ id, email }, process.env.JWT_SECRET || "secret", {
    expiresIn: '30d',
  })
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
export const verifyToken = async (req: Request, res: Response, next) => {
  try {
    let token = req.params.token
    if (token) {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET || "secret")
      const t = { id: payload.id, email: payload.email }
      req.user = t
      next()
    }
  } catch (error) {
    res.status(401).json({ error })
  }
}


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM…TQ3fQ.EDVsfs6aqY_hJGZvcq-1fIJTpnK08E3NAjap7qAOvvw
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2ZjMDdmMGFjODY1YzBkOTdkYTU5NyIsImVtYWlsIjoidGVzdDIyMEB5YWhvby5jb20iLCJ0eXBlIjoiZW1wbG95ZWVyIiwiaWF0IjoxNjQ4MzQ1MjE1LCJleHAiOjE2NTA5MzcyMTV9.MPszc8CyhHuqUOgTeMxjWzAULu9heDhXeYZ9EjL_A9s