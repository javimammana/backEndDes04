import { Router } from "express";
import { ProductManager } from "../manager/ProductManager.js";

const router = Router();
const manager = new ProductManager("./src/data/productos.json");

router.get("/", async (req, res) => {
    try {
        const products = await manager.getProducts();
        res.render("home", {products});
    } catch (error) {
        res.status(500).json({error: "Error del servicor"});
    }
});

router.get("/realtimeproducts", (req, res) => {
    try {
        res.render("realTimeProducts");
    } catch (error) {
        res.status(500).json({error: "Error del servidor"});
    }
})



export default router;