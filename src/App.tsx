import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { validateEmail } from "./utils/validateEmail";
import qrcode from "qrcode-generator";

type TInputs = {
  username: string;
  email: string;
  usernameVK: string;
  usernameGitHub: string;
};

function App() {
  const [imageTag, setImageTag] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TInputs>();
  const onSubmit: SubmitHandler<TInputs> = (data) => {
    const qrc = qrcode(4, "L");
    qrc.addData(`Username: ${data.username}\n`);
    qrc.addData(`Email: ${data.email}\n`);
    if (data.usernameVK.length > 0) {
      qrc.addData(`VK: ${data.usernameVK}\n`);
    }
    if (data.usernameGitHub.length > 0) {
      qrc.addData(`GitHub: ${data.usernameGitHub}\n`);
    }
    qrc.make();
    setImageTag(qrc.createSvgTag(4));
  };

  function handleCancel() {
    reset();
    setImageTag("");
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form_fields">
          <label>Username:</label>
          <div className="form_field">
            <input
              {...register("username", {
                required: true,
                minLength: 1,
              })}
            />
            {errors.username && <span>Это обязательное поле</span>}
          </div>
          <label>
            <span>Email:</span>
            <br />
          </label>
          <div className="form_field">
            <input
              {...register("email", {
                required: true,
                validate: validateEmail,
              })}
            />

            {errors.email && errors.email.type == "required" && (
              <span>Это обязательное поле</span>
            )}
            {errors.email && errors.email.type == "validate" && (
              <span>
                В этом поле должен быть корректный адрес электронной почты
              </span>
            )}
          </div>
          <label>VK:</label>
          <div className="form_field">
            <input {...register("usernameVK")} />
          </div>
          <label>GitHub:</label>
          <div className="form_field">
            <input {...register("usernameGitHub")} />
          </div>
        </div>
        <input className="submit_btn" type="submit" value="Создать" />
        <input type="button" value="Отменить" onClick={handleCancel} />
      </form>
      {imageTag && <div dangerouslySetInnerHTML={{ __html: imageTag }} />}
    </div>
  );
}

export default App;
