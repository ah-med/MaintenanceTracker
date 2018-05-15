import app from './server/index';

// Listen for requests
const port = process.env.PORT || 8000;
app.listen(port, () => {
  // console.log(`Hi there, listening on http://localhost:${port}`);
});

export default app;
