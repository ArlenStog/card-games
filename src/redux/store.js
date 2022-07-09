import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { cardReducer } from './blackjack/cards.slice'

const middlewares = [logger, thunk]

export const store = configureStore({
  reducer: cardReducer,
  middleware: middlewares
})