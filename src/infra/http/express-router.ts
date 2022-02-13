import { Controller } from '@/application/controllers'
import { RequestHandler } from 'express'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const response = await controller.handle({ ...req.body })

    if (response.statusCode === 200) {
      res.status(200).json(response.data)
    } else {
      res.status(response.statusCode).json({ error: response.data.message })
    }
  }
}
