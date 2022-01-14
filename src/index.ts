/* eslint-disable no-console */

import colors from 'colors';

import app from './app';

const PORT = process.env.PORT ?? 5000;
const server = app.listen(PORT, () => {
  console.log(colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
});

// Catch unhandled promise rejections
// eslint-disable-next-line @typescript-eslint/no-unused-vars
process.on('unhandledRejection', (err: Error, promise) => {
  console.log(colors.red.underline(`Error: ${err.message}`));
  //Close server and exit process
  server.close(() => process.exit(1));
});
