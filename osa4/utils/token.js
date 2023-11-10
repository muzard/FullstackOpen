const tokenGetter = (request, response, next) => {
  let returnRequest = request;

  console.log("tokenGetter called");

  const authorization = request.get("authorization");

  console.log("authorization", authorization);

  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }

  next();
};

module.exports = tokenGetter;
