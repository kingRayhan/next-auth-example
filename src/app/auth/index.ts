import axios from "axios";

export interface Credential {
  email: string;
  password: string;
}

export const signIn = (credential: Credential) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/login", credential)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const signOut = () => {};
