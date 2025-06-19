import { Router } from "express";
import { TodoModel } from "../models/TodoModel";

const router = Router();

//POST /
router.post("/", async (req, res) => {
  try {

    const { body } = req;
    console.log({body})
    const newTodo = await TodoModel.create(body);
    res.status(201).json({ success: true, data: newTodo });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

//GET /
router.get("/", async (req, res) => {
  try {
    const fetchedTodos = await TodoModel.find({});
    if (!fetchedTodos || !fetchedTodos.length)
      res.status(404).json({ success: true, data: [] });
    res.status(201).json({ success: true, data: fetchedTodos });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});
//GET /:id
router.get("/:id", async (req, res) => {
  try {
    const fetchedTodo = await TodoModel.findOne({ _id: req.params.id });
    if (!fetchedTodo) res.status(404).json({ success: true, data: null });
    res.status(201).json({ success: true, data: fetchedTodo });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});
//PUT /:id
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTodo)
      res
        .status(404)
        .json({ success: false, error: "Todo with that id does not exist" });
    res.status(201).json({ success: true, data: updatedTodo });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

// DELETE / :id
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);
    if (!deletedTodo)
      res
        .status(404)
        .json({ success: false, error: "Todo with that id does not exist" });
    res.status(201).json({ success: true, data: deletedTodo });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Error => " + error.message });
  }
});

export { router as todoRouter };
