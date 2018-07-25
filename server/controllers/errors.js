const errors = {
  serverError: res => res.status(500).json({
    error: {
      status: 500,
      title: 'INTERNAL_SERVER_ERROR',
      description: 'something unexpected occured. try again later'
    }
  })
};

export default errors;
