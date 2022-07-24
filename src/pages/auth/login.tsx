import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import axios from "axios";
import { api } from "../../app/api/client/api.client";

interface LoginFormPayload {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const router = useRouter();
  const { mutate: mutate___login } = useMutation(
    async (payload: LoginFormPayload) => {
      // const _fetch = await fetch("https://jwt-auth-api.vercel.app/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(payload),
      // });
      // const _json = await _fetch.json();
      // if (!_fetch.ok) {
      //   return Promise.reject(_json);
      // }
      // return _json;

      return axios.post("https://jwt-auth-api.vercel.app/auth/login", payload);
    },
    {
      onSuccess: async (data) => {
        toast.success("Login successful!");

        const { data: _data } = await api.post("/auth/user", null, {
          headers: {
            Authorization: `Bearer ${data.data.token}`,
          },
        });

        api.post("/api/session", { auth_uid: _data.user._id }).then((res) => {
          console.log(res.data);
          // router.push("/");
        });
      },
      onError: (error: any) => {
        toast.error(error?.message);
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormPayload>({
    defaultValues: {
      email: "example@example.com",
      password: "password",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = (payload: LoginFormPayload) => {
    mutate___login(payload);
  };

  return (
    <div>
      <h1 className="text-xl">Login</h1>

      <form
        action="#"
        method="POST"
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email")}
            className={classNames({
              "border-red-500 focus:ring-red-500": Boolean(errors.email),
            })}
          />
          {Boolean(errors.email) && (
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className={classNames({
              "border-red-500 focus:ring-red-500": Boolean(errors.password),
            })}
          />
          {Boolean(errors.password) && (
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          )}
        </div>

        <div>
          <button className="px-8 py-2 text-white bg-indigo-600">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
