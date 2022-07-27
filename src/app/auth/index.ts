import axios from "axios";

export interface Credential {
  email: string;
  password: string;
}

export const signIn = (credential: Credential) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth", credential)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    axios
      .delete("/api/token")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
