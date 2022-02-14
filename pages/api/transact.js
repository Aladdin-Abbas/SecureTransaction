import Customer from "../../models/Customer";
import Transaction from "../../models/Transaction";
import dbConnect from "../../middleware/dbConnect";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      await dbConnect();

      let { senderName, receiverName, amount } = req.body;
      amount = amount * 1;

      if (senderName === receiverName) {
        throw "Sender and receiver names must be different";
        return;
      }

      const sender = await Customer.findOne({ name: senderName });
      const receiver = await Customer.findOne({ name: receiverName });

      if (!sender || !receiver) {
        throw "There is no such user";
        return;
      }

      if (!amount || amount <= 0) {
        throw "Invalid amount";
        return;
      }

      sender.balance -= amount;

      if (sender.balance < 0) {
        throw "Low balance";
        return;
      }

      receiver.balance += amount;

      const date = new Date();

      const newSender = await Customer.findOneAndUpdate(
        { name: senderName },
        { balance: sender.balance },
        { new: true }
      );

      const newReceiver = await Customer.findOneAndUpdate(
        { name: receiverName },
        { balance: receiver.balance },
        { new: true }
      );

      const transactionResult = await Transaction.create({
        sender: newSender.name,
        receiver: newReceiver.name,
        amount,
        date,
      });

      res.status(200).json({
        status: "success",
        data: { newSender, newReceiver, transactionResult },
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: error,
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
