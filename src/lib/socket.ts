'use client'

import { io } from 'socket.io-client'

export const socket = io(`ws://${process.env.NEXT_PUBLIC_OWN_IP}:3005/`, {
  autoConnect: false,
})
