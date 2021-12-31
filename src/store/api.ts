const server =
  process.env.NODE_ENV == 'production'
    ? 'https://selco.herokuapp.com'
    : 'http://localhost:3000';

const sendReq = async (
  endpoint: string,
  method = 'GET',
  body: undefined | Record<string, any> = undefined
) => {
  const url = `${server}${endpoint}`;
  const ops: Record<string, any> = {};
  if (body) {
    ops.method = method;
    ops.headers = { 'Content-Type': 'application/json' };
    ops.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, ops);
    if (response.status != 200) {
      const err = await response.text();
      throw new Error(err);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export { sendReq };
