import RequestModel from '../models/request';

const { getStatus } = RequestModel;

const verifyStatus = {
  isPending: (req, res, next) => {
    const { requestId } = req.params;
    getStatus(requestId, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: 'something went wrong'
        });
      }
      if (result.rowCount === 0) {
        return res.status(404).json({
          error: 'request not found'
        });
      }
      const status = result.rows[0].stat;
      return (status === 'pending') ? next() : res.status(403).json({
        error: 'Action not allowed when status is not pending'
      });
    });
  }
};

export default verifyStatus;

