const pool = require("../config/db");
const { validationResult } = require("express-validator");
const faker = require("faker");
const HttpError = require("../models/http-error");

exports.getAllUsers = async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
};

exports.getUserById = async(req,res,next) => {
    try {
        const id = req.params.id;
        console.log(id);
        const [rows,fields] = await pool.query('SELECT * FROM users WHERE id = ?',[id]);
        if(rows.length === 0) {
            throw Error("cannot find user");
        }
        res.json(rows);
    } catch (err) {
        const error = new HttpError(
            "Fetching users failed, please try again later.",
            500
          );
          return next(error);
    }
}

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  try {
    const { firtname , lastname, email, phone } = req.body;
    const [rows, fields] = await pool.query(
      "INSERT INTO users(firstname,lastname,email,phone) VALUES(?,?,?,?)",
      [firtname,lastname, email, phone]
    );
    res.status(201).json({
      message: "user created",
    });
  } catch (err) {
    const error = new HttpError(
      "Creating users failed, please try again later.",
      500
    );
    return next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  try {
    const id = req.params.id;
    const {
      firstname: updatedFirstName,
      lastname : updatedLastName,
      email: updatedEmail,
      phone: updatedPhone,
    } = req.body;
    const [rows, fields] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw Error("cannot find user");
    }

    await pool.query(
      "UPDATE users SET firstname = ? , lastname = ? , email = ? , phone = ? WHERE id = ? ",
      [updatedFirstName, updatedLastName, updatedEmail, updatedPhone, id]
    );
    res.json({
      message: "updated successfully",
    });
  } catch (err) {
    const error = new HttpError(
      "Updating users failed, please try again later.",
      500
    );
    return next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [rows, fields] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw Error("cannot delete user");
    }

    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({
      message: "deleted successfully",
    });
  } catch (err) {
    const error = new HttpError(
      "Deleting users failed, please try again later.",
      500
    );
    return next(error);
  }
};
