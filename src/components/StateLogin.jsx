import { useState } from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength, isEqualsToOtherValue } from "../util/validation";

//record and react on every keystroke.

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({ email: false, password: false });

  const emailIsInvalid = didEdit.email && !isNotEmpty(enteredValues.email) && !isEmail(enteredValues.email);
  const passwordIsInvalid = didEdit.password && hasMinLength(enteredValues.password, 6);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
  }

  function handleInputChange(identifier, event) {
    setEnteredValues((prevValue) => ({
      ...prevValue,
      [identifier]: event.target.value,
    }));

    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  }

  //default behavior
  //form button default: type=submit, change it to type= button
  //
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input label="Email" id="email" type="email" name="email" onBlur={() => handleInputBlur("email")} onChange={(event) => handleInputChange("email", event)} value={enteredValues.email} error={emailIsInvalid && "Please enter a valid email."} />
        <Input label="Password" id="password" type="password" name="password" onBlur={() => handleInputBlur("password")} onChange={(event) => handleInputChange("password", event)} value={enteredValues.password} error={passwordIsInvalid && "Please enter a valid password."} />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
