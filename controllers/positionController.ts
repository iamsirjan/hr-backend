import { Request, Response } from "express";
import PositionModel, { IPosition } from "../models/position.model";
import positionModel from "../models/position.model";

export const getAllPosition = async (req: Request, res: Response) => {
  try {
    const position: IPosition[] = await PositionModel.find();
    res.status(200).json({ position });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPosition = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const existingPosition = await PositionModel.findOne({ name });
    if (existingPosition) {
      return res.status(400).json({ error: "this position already exists" });
    }

    const newPosition: IPosition = await PositionModel.create({ name });
    res.status(201).json({
      data: newPosition,
      message: "Position created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePosition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingPosition = await positionModel.findById(id);
    if (!existingPosition) {
      return res.status(404).json({ error: "Position not found" });
    }

    existingPosition.name = name;
    const updatePosition = await existingPosition.save();
    res.status(200).json({
      data: updatePosition,
      message: "Position updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePosition = async (req: Request, res: Response) => {
  try {
    const positionID = req.params.id;

    if (!positionID) {
      return res.status(400).json({ error: "Position Id is required" });
    }
    const deletedPosition = await positionModel.findOneAndDelete({
      _id: positionID,
    });

    if (!deletedPosition) {
      return res.status(404).json({ error: "Position not found" });
    }
    res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPositionById = async (req: Request, res: Response) => {
  try {
    const positionId = req.params.id;
    if (!positionId) {
      return res.status(400).json({ error: "Position Id is required" });
    }
    const position = await PositionModel.findById(positionId);

    if (!position) {
      return res.status(400).json({ error: "Position not found" });
    }

    res.status(200).json({ data: position });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
