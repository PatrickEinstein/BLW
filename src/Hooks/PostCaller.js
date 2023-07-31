const PostCaller = async (body, route, headers) => {
  try {
    const savedUserResponse = await fetch(
      `http://localhost:8080/${route}`,

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const SignedUpUser = await savedUserResponse.json();
    return SignedUpUser;
  } catch (err) {
    return err;
  }
};

//  {
//   Authorization: `Bearer ${token}`,
//   "Content-Type": "application/json",
// }, This is the actual headers
export const PostCallerAdmin = async (body, route, headers) => {
  try {
    const savedUserResponse = await fetch(
      `http://localhost:8080/${route}`,

      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const SignedUpUser = await savedUserResponse.json();
    return SignedUpUser;
  } catch (err) {
    return err;
  }
};

export default PostCaller;
