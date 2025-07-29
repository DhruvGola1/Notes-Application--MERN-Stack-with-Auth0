import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider = ({ children }) => {
  return (
    <Auth0Provider
      domain="dev-tae7yw0z4q6lb3f0.us.auth0.com"
      clientId="abyBzMNtYiQXlI4nwwnhAmVONPOfI1Ny"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-tae7yw0z4q6lb3f0.us.auth0.com/api/v2/", // Your Auth0 API Audience
        scope: "openid profile email", // Request standard scopes
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
