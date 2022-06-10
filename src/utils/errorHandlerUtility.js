import StackdriverErrorReporter from "stackdriver-errors-js";

let errorHandler;

// if (process.env.NODE_ENV === "production") {
errorHandler = new StackdriverErrorReporter();
errorHandler.start({
  key: "AIzaSyC6DCCZ9JuGbWloRiqdLq_geVsRtJ7YAX0",
  projectId: "errors-352910",
  // Other optional arguments can be supplied, see above.
});
// } else {
//   errorHandler = { report: console.error };
// }

export default errorHandler;
