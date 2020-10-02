import API from "./service";

export const baseUrl = "https://ticketex.co/server/public/api/v1/";
export const oAuth = "https://ticketex.co/api/public/oauth/token";

// https://ticketex.co/server/public/api/v1/user/profile
// https://ticketex.co/server/public/api/v1/users/login?mobile=8240656739
// https://ticketex.co/server/public/api/v1/ticket/purchased

const Api = new API({
  baseUrl: baseUrl,
  oAuth: oAuth,
});

export default Api;
