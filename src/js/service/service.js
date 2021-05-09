// import AsyncStorage from "@react-native-community/async-storage";

import AsyncStorage from "@react-native-community/async-storage";
import { useContext } from "react";
import { Languages } from "../common";

export default class API {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.oAuth = options.oAuth;
  }

  postOAuth(params) {
    return this.httpRequestOAuth(this.oAuth, params);
  }

  get(endpoint, params, header) {
    return this.httpRequest("GET", this.baseUrl + endpoint, params, header);
  }

  post(endpoint, params, header) {
    return this.httpRequest("POST", this.baseUrl + endpoint, params, header);
  }

  upload(endpoint, params) {
    return this.httpRequestForFormData("POST", this.baseUrl + endpoint, params);
  }

  async httpRequestOAuth(url, params) {
    return new Promise((resolve, reject) => {
      const options = {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log("api -> " + url);
      console.log("params -> ", options);

      fetch(url, options)
        .then((response) => {
          console.log("____response____ ", response);
          if (response.status === 400) {
            const obj = {
              message: Languages.SomethingWentWrong,
              status: false,
            };
            return obj;
          }
          response.json().then((responseJson) => {
            resolve(responseJson);
          });
        })
        .catch((error) => {
          console.log("error: ", error);
          reject(error);
        }); //to catch the errors if any
    });
  }

  async httpRequest(method, url, params, header = null) {
    let token = JSON.parse(await AsyncStorage.getItem("userToken"));
    console.log(token);

    return new Promise((resolve, reject) => {
      let options;
      if (method == "GET") {
        options = {
          headers: header
            ? header
            : {
                Authorization:
                  token !== null && `${token.token_type} ${token.access_token}`,
                // Authorization:
                //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg3NzJjN2UxNjk1NDIzMmJlYTM5MjEwZGViMGE2NThiMGNlYTM2NjM4MmM0Nzc2Yzc1YTczZmQ1MGJmNTk0Y2U4YmI5ZDdlMmNlM2JmMTRjIn0.eyJhdWQiOiI5IiwianRpIjoiODc3MmM3ZTE2OTU0MjMyYmVhMzkyMTBkZWIwYTY1OGIwY2VhMzY2MzgyYzQ3NzZjNzVhNzNmZDUwYmY1OTRjZThiYjlkN2UyY2UzYmYxNGMiLCJpYXQiOjE2MDEyNTY1NTIsIm5iZiI6MTYwMTI1NjU1MiwiZXhwIjoxNjMyNzkyNTUyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.x7hP3tT92gALeXBBYSt9WbheQV--ngYYWWJ9zcyrODjCUYMrl-ugSQb0cSAF7HnGFgBbV4TCnEZqyZj6YJ0nWEFrcVLCjHI1tr6fmNq2dixgXeFovSTC3OETjzCK29khKK5CcJeLERuPmGftN3CGMY9uWBLMOH9TSPO4IpgzIrgh3oHKNmrfrZ811Y09jhik2Gj3AyIpgkwP40i5Hq6G5jFFeHoC8Nq3kPVWVUHfYsZsNCPoiCLKrnB-_qwKQvV1ChGyIo583BAzCDL91wWTdYYxeLusxrgfLz3y-ie9MTeoFXx9600zCq0iJZQAkPJFZ15oqPOuschBV03pYvSGKxxrLERlw8zrtuediPVrhbkKj1GWrAmKsmVNDj9OCR0WQOsWvpGvTRTuvrAjIsIxXpWygdCmewuXltUgK-MpbXGZpq9zDWig4_ORXsfX7ZpI3Ydf-ktIj4gL1NXYinl1aAHqWbsLr_OgyYsafOQzgdjLE7dIXotbPGHBVs9RuYEGT0_3vifLgr5ReWD8LwKlar3MeUmXQEYzV50xmXOhZJ-keoTXPtqSNYc2HvCskEHPwvTPkQ1f5W057475XuzO88rHtv6fdWhzy5qN4J9kimTQZ59hybOGmSizVAF9jB41fdHDUJ7n_fT68QmUPZDknkLzJVEhd5EmbKw0QqgpuwI",
                // "Content-Type": "application/json",
              },
          method: method,
        };
      } else {
        options = {
          headers: header
            ? header
            : {
                Authorization: `${token.token_type} ${token.access_token}`,
                "Content-Type": "application/json",
              },
          method: method,
          body: JSON.stringify(params),
        };
      }

      console.log("api -> " + url);
      console.log("params -> ", options);
      fetch(url, options)
        .then((response) => {
          console.log("____response____ ", response);
          if (response.status === 400) {
            const obj = {
              message: Languages.SomethingWentWrong,
              status: false,
            };
            return obj;
          }
          response.json().then((responseJson) => {
            resolve(responseJson);
          });
        })
        .catch((error) => {
          console.log("error: ", error);
          reject(error);
        }); //to catch the errors if any
    });
  }

  async httpRequestForFormData(method, url, params) {
    let token = JSON.parse(await AsyncStorage.getItem("userToken"));

    return new Promise((resolve, reject) => {
      let options = {
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          // Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg3NzJjN2UxNjk1NDIzMmJlYTM5MjEwZGViMGE2NThiMGNlYTM2NjM4MmM0Nzc2Yzc1YTczZmQ1MGJmNTk0Y2U4YmI5ZDdlMmNlM2JmMTRjIn0.eyJhdWQiOiI5IiwianRpIjoiODc3MmM3ZTE2OTU0MjMyYmVhMzkyMTBkZWIwYTY1OGIwY2VhMzY2MzgyYzQ3NzZjNzVhNzNmZDUwYmY1OTRjZThiYjlkN2UyY2UzYmYxNGMiLCJpYXQiOjE2MDEyNTY1NTIsIm5iZiI6MTYwMTI1NjU1MiwiZXhwIjoxNjMyNzkyNTUyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.x7hP3tT92gALeXBBYSt9WbheQV--ngYYWWJ9zcyrODjCUYMrl-ugSQb0cSAF7HnGFgBbV4TCnEZqyZj6YJ0nWEFrcVLCjHI1tr6fmNq2dixgXeFovSTC3OETjzCK29khKK5CcJeLERuPmGftN3CGMY9uWBLMOH9TSPO4IpgzIrgh3oHKNmrfrZ811Y09jhik2Gj3AyIpgkwP40i5Hq6G5jFFeHoC8Nq3kPVWVUHfYsZsNCPoiCLKrnB-_qwKQvV1ChGyIo583BAzCDL91wWTdYYxeLusxrgfLz3y-ie9MTeoFXx9600zCq0iJZQAkPJFZ15oqPOuschBV03pYvSGKxxrLERlw8zrtuediPVrhbkKj1GWrAmKsmVNDj9OCR0WQOsWvpGvTRTuvrAjIsIxXpWygdCmewuXltUgK-MpbXGZpq9zDWig4_ORXsfX7ZpI3Ydf-ktIj4gL1NXYinl1aAHqWbsLr_OgyYsafOQzgdjLE7dIXotbPGHBVs9RuYEGT0_3vifLgr5ReWD8LwKlar3MeUmXQEYzV50xmXOhZJ-keoTXPtqSNYc2HvCskEHPwvTPkQ1f5W057475XuzO88rHtv6fdWhzy5qN4J9kimTQZ59hybOGmSizVAF9jB41fdHDUJ7n_fT68QmUPZDknkLzJVEhd5EmbKw0QqgpuwI',
          Authorization: `${token.token_type} ${token.access_token}`,
        },
        method: method,
        body: params,
      };

      console.log("api -> " + url);
      console.log("params -> ", options);
      fetch(url, options)
        .then((response) => {
          console.log("_response_ ", response);
          if (response.status === 400) {
            // TODO: all api call else part, do notify
            const obj = {
              message: Languages.SomethingWentWrong,
              status: false,
            };
            return obj;
          }
          response.json().then((responseJson) => {
            resolve(responseJson);
          });
        })
        .catch((error) => {
          console.log("error: ", error);
          reject(error);
        }); //to catch the errors if any
    });
  }
}
