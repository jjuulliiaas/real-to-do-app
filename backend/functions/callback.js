const { Issuer } = require("openid-client");

exports.handler = async (event) => {
  
  const COGNITO_ISSUER_URL = "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_lJPKahius";
  const COGNITO_CLIENT_ID = "1kfpnbj6cv5q59uh02nenr2na5";
  const REDIRECT_URI_CALLBACK = "https://j4akexqfyd.execute-api.eu-north-1.amazonaws.com/dev/callback";
  const FRONTEND_URL = "https://d1sqafv8qee333.cloudfront.net";

  try {
    const issuer = await Issuer.discover(COGNITO_ISSUER_URL);
    const client = new issuer.Client({
      client_id: COGNITO_CLIENT_ID,
      token_endpoint_auth_method: 'none'
    });

    const { code } = event.queryStringParameters || {};
    if (!code) return { statusCode: 400, body: "No code" };

    const tokenSet = await client.callback(REDIRECT_URI_CALLBACK, { code });
    const userinfo = await client.userinfo(tokenSet.access_token);

    return {
      statusCode: 302,
      headers: {
        Location: `${FRONTEND_URL}#sub=${userinfo.sub}`
      }
    };
  } catch (err) {
    console.error("❌ CALLBACK ERROR:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", detail: err.message })
    };
  }
};
