const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)

        }
    }
}
module.exports = asyncWrapper

//  || USE OF NEXT in express
/*  In Express.js, the next function is a callback function that is used to pass control to the next middleware function in the middleware stack.
Here's an example of using next in an Express.js middleware function:

|| function myMiddleware(req, res, next) {
  // Do some processing here

  // Call the next middleware function in the stack
  next();
}



*/