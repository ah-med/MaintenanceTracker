const errors = {
  serverError: res => res.status(500).json({
    error: {
      status: 500,
      title: 'INTERNAL_SERVER_ERROR',
      description: 'something unexpected occured. try again later'
    }
  }),
  validationError: (res, errObj) => res.status(422).json({
    error: {
      status: 422,
      title: 'FIELDS_VALIDATION_ERROR',
      description: 'one or more field raised validation error',
      fields: errObj
    }
  }),
  errorNotFound: res => res.status(404).json({
    error: {
      status: 404,
      title: 'ERROR_NOT_FOUND',
      description: 'resource does not exist'
    }
  }),
  wrongPassword: res => res.status(400).json({
    error: {
      status: 400,
      title: 'WRONG PASSWORD',
      description: 'password doesn\'t match'
    }
  }),
  unauthorizedError: res => res.status(401).json({
    error: {
      status: 401,
      title: 'UNAUTHOURIZED_ACCESS',
      description: 'an access token or other authorization credential is required'
    }
  }),
  forbidden: (res, description) => res.status(403).json({
    error: {
      status: 403,
      title: 'ACTION_NOT_ALLOWED',
      description
    }
  }),
};

export default errors;
