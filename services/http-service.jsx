import React from "react";
import axios from "axios";

// ngRock path
const babySitterUrl = 'http://localhost:3000';

class HttpService {
  static uriMenuImage = {uri: "https://filebucketmatanya7491.s3.us-west-2.amazonaws.com/menu.png"};
  static LOGGED_IN = "loggedIn";
  static LOGGED_OUT = "loggedOut";
  static SOLDIER = "soldier";
  static LOADING = "loading";

  static async getAllEvents() {
    return await axios.get(babySitterUrl + "/getAllEvents");
  }

  static async sendCode(user) {
    return {

    };
    return await axios.post(babySitterUrl + "/sendCodeToMail", user);
  }

  static async getAllUnAuthorizedUsers() {
    console.log(babySitterUrl + "/unAuthorizedUsers");
    return await axios.get(babySitterUrl + "/unAuthorizedUsers",
        await this.getHeader());
  }

  static async login(user3) : any {
    // does not all fields in user
    const user = {
      firstName: "sdvc",
      lastName: "sdc",
      parent: false,
      phone: '0545445444'
    }
    let data;
    data = await axios
      .post(babySitterUrl + "/login", user)
      .then((res) => {
        // return res.data;
        return user;
      })
      .catch(() => {
        return user;
        // throw new Error("בעיית תקשורת עם השרת");
      });

    if (data) {
      const user = JSON.parse(JSON.stringify(data)).user
      return user;
    } else {
      return user;
      // throw new Error("מייל או סיסמה אינם נכונים");
    }
  }

  static async registration(user) {
    return await axios
      .post(babySitterUrl + "/newUser", user, await this.getHeaderForLoggedOutUser())
      .then((user) => {
      });
  }

  static async updateUserPassword(user) {
    return await axios.put(
        babySitterUrl + "/updateUser",
        user,
        await this.getHeaderForLoggedOutUser()
    );
  }

  static async deleteUser(user) {
    return await axios.post(
      babySitterUrl + "/deleteUser",
      user,
      await this.getHeader()
    );
  }

  static async getHeader() {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer ",
    };
    let currUser = {};
    // await LocalStorageService.getUser().then((user) => (currUser = user));
    // headers.Authorization += currUser.token;
    return {
      headers: headers,
    };
  }

  static async getHeaderForLoggedOutUser() {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer ",
    };
    let token = {};
    // await LocalStorageService.getNonUserToken().then((t) => (token = t));
    // headers.Authorization += token;
    return {
      headers: headers,
    };
  }

  static async doesUserExist(email){
    return  {};
    // let res = await axios.post(
    //     babySitterUrl + "/doesUserExist",
    //     email
    // );
    //
    // return res.data
  }

  static async checkCodeOfVerifyMail(user) {
      let data = null;
      await axios
          .post(babySitterUrl + "/checkCode", user)
          .then(async (res) => {
              // data = res.data;
              data = {};
          })
          .catch(() => {
            data = {};

            // throw new Error("בעיית תקשורת עם השרת");
          });

      // if (data.errorMessage) {
      //     throw new Error(data.errorMessage);
      // } else {
      //     return data;
      // }
    return  {};
  }
}

export default HttpService;
