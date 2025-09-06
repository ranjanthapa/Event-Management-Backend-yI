
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number,
        email: string,
        role: string
      }; // now req.user is available everywhere
    }
  }
}
export{};