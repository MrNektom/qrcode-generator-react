import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { validateEmail } from "./utils/validateEmail";
import qrcode from "qrcode-generator";
import { TextField } from "./components/TextField/TextField";

type TInputs = {
  username: string;
  email: string;
  usernameVK: string;
  usernameGitHub: string;
};

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TInputs>();

  // const [imageTag, setImageTag] = useState("");
  const [imageURL, setImageURL] = useState("");

  const onSubmit: SubmitHandler<TInputs> = (data) => {
    const qrc = qrcode(7, "L");
    qrc.addData(`Username: ${data.username}\n`);
    qrc.addData(`Email: ${data.email}\n`);
    if (data.usernameVK.length > 0) {
      qrc.addData(`VK: ${data.usernameVK}\n`);
    }
    if (data.usernameGitHub.length > 0) {
      qrc.addData(`GitHub: ${data.usernameGitHub}\n`);
    }
    qrc.make();
    // setImageTag(qrc.createSvgTag(4));
    setImageURL(qrc.createDataURL(4));
  };

  function onCancel() {
    reset();
    setImageURL("");
    // setImageTag("");
  }

  return (
    <div className="App">
      <div className="header">
        <span>React QR-Code generator</span>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_fields">
            <div className="form_field">
              <TextField
                label="Username"
                {...register("username", {
                  required: true,
                  minLength: 1,
                })}
              />
              {errors.username && <span>Это обязательное поле</span>}
            </div>
            <div className="form_field">
              <TextField
                label="Email"
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
            <div className="form_field">
              <TextField label="VK" {...register("usernameVK")} />
            </div>
            <div className="form_field">
              <TextField label="GitHub" {...register("usernameGitHub")} />
            </div>
            <div className="form_field">
              <input
                className="submit_btn form_button"
                type="submit"
                value="Создать"
              />
            </div>
            <div className="form_field">
              <input
                className="form_button"
                type="button"
                value="Отменить"
                onClick={onCancel}
              />
            </div>
          </div>
        </form>
        <output>
          {/* {imageTag && <div dangerouslySetInnerHTML={{ __html: imageTag }} />} */}
          {imageURL && <img src={imageURL} />}
        </output>
      </div>
    </div>
  );
}

export default App;
