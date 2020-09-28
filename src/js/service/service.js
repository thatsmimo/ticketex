// import AsyncStorage from "@react-native-community/async-storage";

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
            const obj = { message: "Something went wrong!", status: false };
            return obj;
          }
          response.json().then((responseJson) => {
            resolve(responseJson);
          });
        })
        .catch((error) => reject(error)); //to catch the errors if any
    });
  }

  async httpRequest(method, url, params, header = null) {
    // let token = await AsyncStorage.getItem('userToken');
    const token = undefined;

    return new Promise((resolve, reject) => {
      let options;
      if (method == "GET") {
        options = {
          headers: header
            ? header
            : {
                // "Content-Type": "application/json",
                Authorization: token != null && token,
              },
          method: method,
        };
      } else {
        options = {
          // headers: {
          //   "Content-Type": "application/json",
          //   Authorization: token != null && "Bearer " + token,
          // },
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
            const obj = { message: "Something went wrong!", status: false };
            return obj;
          }
          response.json().then((responseJson) => {
            resolve(responseJson);
          });
        })
        .catch((error) => reject(error)); //to catch the errors if any
    });
  }

  async httpRequestForFormData(method, url, params) {
    // let token = await AsyncStorage.getItem('userToken');

    return new Promise((resolve, reject) => {
      let options = {
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Content-Type': 'multipart/form-data',
        //   'Authorization': token != null && 'Bearer ' + token
        // },
        method: method,
        body: params,
      };

      console.log("api -> " + url);
      console.log("params -> ", options);

      fetch(url, options)
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => reject(error)); //to catch the errors if any
    });
  }
}
