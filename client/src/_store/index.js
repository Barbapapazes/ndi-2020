import { createStore } from 'vuex'

import { authentication } from './authentication.module.js'
import { users } from './users.module.js'

export const store = createStore({
  modules: {
    authentication,
    users,
  },
})
