import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";
import httpStatus from "http-status";

const registerHandler = async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = await encryptPassword(password);
  const user = await userService.createUser({
    name,
    email,
    password: hashPassword,
  });
  console.log(user);
  res.json({ user }).status(httpStatus.CREATED);
};

export const registerController = errorHandlerWrapper(registerHandler);
