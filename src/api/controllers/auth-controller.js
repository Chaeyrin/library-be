import authService from "../services/auth-service.js";

export const registerUser = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await authService.register(request);
    res.status(200).json({
      message: "Data created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const result = await authService.login(req);
    res.status(200).json({ message: "Login successfully", data: result });
  } catch (e) {
    next(e);
  }
};
