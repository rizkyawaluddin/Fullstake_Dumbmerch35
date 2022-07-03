// Models
const { user, profile, product, transaction } = require("../../models");

// Controller
exports.addUser = async (req, res) => {
  try {
    await user.create(req.body);
    res.status(201).send({
      status: "Success",
      message: "Add User Success",
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

// ============== GET USER ========================
exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: profile,
          as: "profile",
          attributes: {
            exclude: ["idUser", "createdAt", "updatedAt"],
          },
        },
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: transaction,
          as: "buyerTransactions",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: transaction,
          as: "sellerTransactions",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(200).send({
      status: "Success",
      message: "Get Users Success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

// get User
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await user.findAll({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    res.status(200).send({
      status: "Success",
      message: `Get User ${id} Success `,
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

// ============== UPDATE USER ========================
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.update(req.body, {
      where: { id },
    });

    res.status(200).send({
      status: "Success",
      message: `Update User id: ${id} Success `,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

// ============== DELETE USER ==================
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: { id },
    });

    res.status(200).send({
      status: "Success",
      message: `Delete User id: ${id} Success `,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Delete Failed",
      message: "Server Error",
    });
  }
};
