/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IUserInteractor } from '../../application/interfaces/IUserInteractor'
// import { Patient } from '../../domain/entities/Patient'

export class UserController {
  private readonly interactor: IUserInteractor

  constructor (interactor: IUserInteractor) {
    this.interactor = interactor
  }

  async onCreateUser (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const newProfile = await this.interactor.createUser(req.body)
      res.json(newProfile)
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async onGetAllUsers (req: Request, res: Response, next: NextFunction) {
    try {
      const results = await this.interactor.getAllUsers()
      res.status(200).json(results)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async onGetUserById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.interactor.getUserById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async login (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.params
      const results = await this.interactor.login(email, password)
      res.status(200).json(results)
      next()
    } catch (error) {
      next(error)
      console.log(error)
    }
  }
}
