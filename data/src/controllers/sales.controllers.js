import { getAllSales } from "../services/sales.service.js";

export const getSales = (req, res) => {
  try {
    const result = getAllSales(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
