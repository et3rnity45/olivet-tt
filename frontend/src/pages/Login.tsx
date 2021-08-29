/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import logo from "@Assets/logo/olivet-tt-black.png";
import Input from "@Components/base/Forms/Input";
import Submit from "@Components/base/Forms/Submit";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useLazyQuery } from "@apollo/client";
import LoginQuery from "@Queries/login";
import { useHistory } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "L'email doit être renseigné.",
      "string.email": "L'email doit être valide.",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Le mot de passe doit être renseigné.",
  }),
});

const Login = (): JSX.Element => {
  const history = useHistory();
  const [getToken, { error, data }] = useLazyQuery(LoginQuery);
  if (data) {
    localStorage.setItem("token", data.login.token);
    history.push("/admin");
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = (input) => {
    getToken({ variables: { input } });
    reset();
  };

  return (
    <section className="py-16 mx-4" id="login">
      <div className="rounded shadow-card bg-white px-10 py-8 max-w-sm mx-auto flex flex-col">
        <div className="flex justify-center items-center mb-8">
          <img className="h-32" src={logo} alt="Olivet TT Logo" />
        </div>
        <h3 className="text-xl font-bold">
          Identifiez-vous avec votre adresse email et votre mot de passe
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <Input
            type="email"
            name="email"
            label="Adresse Email"
            register={register}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
          <Input
            className="mt-10"
            type="password"
            name="password"
            label="Mot de Passe"
            register={register}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
          {error && <p className="text-sm text-red-500">{error.message}</p>}
          <Submit className="mt-10" value="Se connecter" />
        </form>
      </div>
    </section>
  );
};

export default Login;
