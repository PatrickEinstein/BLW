export const PatchCaller = async (body, route) => {
  try {
    const savedUserResponse = await fetch(
      `https://vote-verse-server-production-6153.up.railway.app/${route}`,

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
export const PatchCallerAdmin = async (body, route) => {
  try {
    const savedUserResponse = await fetch(
      `https://vote-verse-server-production-6153.up.railway.app/${route}`,

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
