import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";


import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";


const app = express();
const PORT = 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


 //Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);


//Servidor
const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


//Socket
const  io = new Server(httpServer);

import { ProductManager } from "./manager/ProductManager.js";
const manager = new ProductManager("./src/data/productos.json");

io.on("connection", async (socket) => {
    console.log ("Un cliente se conecta");

    socket.emit("listProduct", await manager.getProducts());

    socket.on("deleteProduct", async (data) => {
        console.log(data)
        await manager.deleteProduct(data);
        socket.emit("listProduct", await manager.getProducts());
    });

    socket.on("addForForm", async (data) => {
        console.log(data);
        await manager.addProduct(data);
        socket.emit("listProduct", await manager.getProducts());
        // socketClient.emit("resultado", "Producto agregado"); //Aplicar la respuesta para mostrar en pantalla.-
    });
})





