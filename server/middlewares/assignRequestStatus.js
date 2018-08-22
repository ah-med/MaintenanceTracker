const approve = (req, res, next) => {
  req.locals.status = 'approve';
  next();
};

const disapprove = (req, res, next) => {
  req.locals.status = 'disapprove';
  next();
};

const resolve = (req, res, next) => {
  req.locals.status = 'resolve';
  next();
};

export default { approve, disapprove, resolve };

