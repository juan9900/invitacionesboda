import { customAlphabet } from 'nanoid'

// 56 chars, sin 0/O/1/l/I para evitar ambigüedad al teclear
const alphabet =
  '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'

export const newSlug = customAlphabet(alphabet, 6)
