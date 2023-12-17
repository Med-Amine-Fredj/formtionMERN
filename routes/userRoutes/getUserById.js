import Users from "../../Models/users.js";

async function getUserById(req, res) {
  try {
    const userId = req.params.id;

    const user = await Users.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "user successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error getting user by id ", error);
    res.status(500).json({
      message: "Internal server error ",
    });
  }
}

export default getUserById;
