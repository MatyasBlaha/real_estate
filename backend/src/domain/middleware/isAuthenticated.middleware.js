import HttpStatus from '../../utils/HttpStatus.utils.js'
import Response from '../../models/response.js'

const isAuthenticated = (req, res, next) => {
  if(req.session && req.session.userId) {
      return next();
  } else {
      return res.status(HttpStatus.UNAUTHORIZED.code).json(new Response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Unauthorized', null));
  }
}

export default isAuthenticated;