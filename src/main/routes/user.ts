import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeDeleteProfilePictureController } from '@/main/factories/controllers'

import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.delete('/users/picture', auth, adapt(makeDeleteProfilePictureController()))
}
