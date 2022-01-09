const adminRouter = require('./adminRouter');
const articleRouter = require('./articleRouter');

const setupRoutes = (app) => {
  app.use('/admin', adminRouter);
  app.use('/articles', articleRouter);
};

module.exports = setupRoutes;
