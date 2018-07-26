const errors = {
  serverError: res => res.status(500).json({
    error: {
      status: 500,
      title: 'INTERNAL_SERVER_ERROR',
      description: 'something unexpected occured. try again later'
    }
  }),
  validationError: (res, errObj) => {
    return res.status(422).json({
      error: {
        status: 422,
        title: 'FIELDS_VALIDATION_ERROR',
        description: 'one or more field raised validation error',
        fields: errObj
      }
    });
  },
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
  })
};

export default errors;
