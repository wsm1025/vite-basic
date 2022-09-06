let handleError = null;

function registerErrorHandler(fn) {
  handleError = fn;
}
function callWithErrorHandling(fn) {
  try {
    fn && fn();
  } catch (error) {
    handleError(error);
  }
}
export { registerErrorHandler };
export default callWithErrorHandling;
