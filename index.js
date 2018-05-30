import app from './server/index';
import admin from './server/admin';

// Listen for requests
const port = process.env.PORT || 8000;
app.listen(port, () => {
  admin.register();
});

export default app;
