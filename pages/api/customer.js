import Customer from "../../models/Customer";
import dbConnect from "../../middleware/dbConnect";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, balance } = req.body;

    try {
      await dbConnect();
      if (name && email && balance) {
        const customer = await Customer.create({ name, email, balance });
        res.status(201).json({
          status: "Success",
          data: customer,
        });
        return;
      }
      throw new Error("err");
    } catch (err) {
      res.status(422).json({
        status: "Fail",
        message: "Data Incomplete",
      });
      return;
    }
  }

  res.status(422).json({
    status: "Fail",
    message: "Request method not supported",
  });
};

export default handler;
