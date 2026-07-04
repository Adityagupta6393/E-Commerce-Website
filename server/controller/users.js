const userModel = require("../models/users.model.js");
const bcrypt = require("bcrypt");

class User {
  async getAllUser(req, res) {
    try {
      let Users = await userModel
        .find({})
        .sort({ _id: -1 });

      return res.json({ Users });
    } catch (err) {
      console.log(err);
      return res.json({
        error: "Failed to fetch users",
      });
    }
  }

  async getSingleUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let User = await userModel
          .findById(uId)
          .select("name email phoneNumber userImage updatedAt createdAt");
        if (User) {
          return res.json({ User });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postAddUser(req, res) {
    let { allProduct, user, amount, transactionId, address, phone } = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !transactionId ||
      !address ||
      !phone
    ) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let newUser = new userModel({
          allProduct,
          user,
          amount,
          transactionId,
          address,
          phone,
        });
        let save = await newUser.save();
        if (save) {
          return res.json({ success: "User created successfully" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

  async postEditUser(req, res) {
    let { uId, name, phoneNumber } = req.body;
    if (!uId || !name || !phoneNumber) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = userModel.findByIdAndUpdate(uId, {
        name: name,
        phoneNumber: phoneNumber,
        updatedAt: Date.now(),
      },
      {
        new : true
      }
      );
      // currentUser.exec((err, result) => {
      //   if (err) console.log(err);
      //   return res.json({ success: "User updated successfully" });
      // });
      try {
        let update = await currentUser.exec();
        if (update) {
          return res.json({ success: "User updated successfully", user: update });
        }
      } catch (err) {
        console.log(err);
      }

    }
  }

  async getDeleteUser(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = userModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      },
      {
        new: true
      }
      );
      // currentUser.exec((err, result) => {
      //   if (err) console.log(err);
      //   return res.json({ success: "User updated successfully" });
      // });
      try {
        let update = await currentUser.exec();
        if (update) {
          return res.json({ success: "User updated successfully", user: update });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      const data = await userModel.findOne({ _id: uId });
      if (!data) {
        return res.json({
          error: "Invalid user",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = userModel.findByIdAndUpdate(uId, {
            password: newPassword,
          },
          {
            new: true
          }
          );
          // passChange.exec((err, result) => {
          //   if (err) console.log(err);
          //   return res.json({ success: "Password updated successfully" });
          // });
          try {
            let update = await passChange.exec();
            if (update) {
              return res.json({ success: "Password updated successfully", user: update });
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          return res.json({
            error: "Your old password is wrong!!",
          });
        }
      }
    }
  }
}

const ordersController = new User();
module.exports = ordersController;