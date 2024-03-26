const socket = io();

const button = document.querySelector("#button");

const deleteItem = (id) => {
    const data = Number(id);
    socket.emit("deleteProduct", data);

    // Toastify({
    //     text: "Producto eliminado",
    //     duration: 3000,
    //     newWindow: true,
    //     close: true,
    //     gravity: "top", // `top` or `bottom`
    //     position: "right", // `left`, `center` or `right`
    //     style: {
    //         background: "linear-gradient(to right, #353434, #000)",
    //         color: "#ebce0f",
    //     },
    // }).showToast();
};

button.addEventListener("click", (e) => {
    e.preventDefault();

    const form = document.getElementById("addProductForm");

    const title = document.querySelector("#title");
    const category = document.querySelector("#category");
    const description = document.querySelector("#description");
    const price = document.querySelector("#price");
    const code = document.querySelector("#code");
    const stock = document.querySelector("#stock");

    const newProduct = {
        title: title.value,
        category: category.value.toUpperCase(),
        description: description.value,
        price: Number(price.value),
        code: code.value.toUpperCase(),
        stock: Number(stock.value),
    };
    socket.emit("addForForm", newProduct);

    form.reset();

});

socket.on("listProduct", (data) => {
    const logProduct = document.querySelector("#listProducts");

    let listProducts = "";

    data.forEach((element) => {
        listProducts += `<div class="card">
                            <div class="flex">
                                <div>
                                    <img class="img" class="img" src="img/${element.thumbnail}">
                                </div>
                                <div class="info">
                                    <div class="cardInfo1">
                                        <h3>${element.title}</h3>
                                        <div>
                                            <h5>Categoria: ${element.category}</h5>
                                            <p>${element.description}</p>
                                        </div>
                                    </div>
                                    <div class="cardInfo2">
                                        <p>Codigo: ${element.code}  -  Stock: ${element.stock}</p>
                                        <h5>$ ${element.price}.-</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="delete">
                                <button class="btn" onClick="deleteItem('${element.id}')">Borrar</button>
                            </div>
                        </div>`;
    });

    logProduct.innerHTML = listProducts;
});
