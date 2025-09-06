
import * as express from 'express'
import { JwtPayloadI } from '../../interfaces/jwt.payload.interface'

declare global {
	namespace Express {
		interface Request {
			user?: JwtPayloadI
		}
	}
}

export {}