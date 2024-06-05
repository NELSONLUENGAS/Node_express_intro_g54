const express = require('express')
const morgan = require('morgan')
const fs = require('fs')

const app = express()


// middlewares
app.use(morgan('dev'))
app.use(express.json())


app.listen(3000, console.log("¡Servidor encendido!"))

/**
 * METHODS  
 * POST ==> Indica Agregar algo nuevo
 * **Normalmente recibe body
 * PUT ==> Editar algo existente
 * **Normalmente recibe body
 * PATCH ==> Editar algo existente
 * **Normalmente recibe body
 * DELETE ==> Eliminare algo
 * GET ==> Obtener o leeer informacion

*/

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get("/home", (req, res) => {

    res.send("Hello World Express Js 😀")
})


app.get("/perfil", (req, res) => {

    res.send(
        `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Perfil de usuario</title>
        </head>

        <body>
            <h1>Hola soy Paquito 😂</h1>
        </body>

        </html>
        `
    )
})


app.get("/productos", (req, res) => {
    const productos = JSON.parse(fs.readFileSync("productos.json"))
    res.json(productos)
})

app.get("/usuarios", (req, res) => {
    const usuarios = JSON.parse(fs.readFileSync("usuarios.json"))
    res.json(usuarios)
})

app.post("/productos", (req, res) => {
    const producto = req.body

    const productos = JSON.parse(fs.readFileSync("productos.json"))

    productos.push(producto)

    fs.writeFileSync("productos.json", JSON.stringify(productos))

    res.send("Producto agregado con éxito!")
})

app.post("/usuarios", (req, res) => {
    const usuario = req.body

    const usuarios = JSON.parse(fs.readFileSync("usuarios.json"))

    usuarios.push(usuario)

    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios))

    res.send("Usuario agregado con éxito!")
})


app.put('/productos/:product_id', (req, res) => {
    const { product_id } = req.params

    const id = parseInt(product_id)

    const productos = JSON.parse(fs.readFileSync("productos.json"))

    const newProducts = productos.map(product => product.id == id ? { ...product, ...req.body } : product)

    fs.writeFileSync("productos.json", JSON.stringify(newProducts))

    res.send("Producto modificado con éxito!")

})

app.delete('/productos/:product_id', (req, res) => {
    const { product_id } = req.params

    const id = parseInt(product_id)

    const productos = JSON.parse(fs.readFileSync("productos.json"))

    const newProducts = productos.filter(product => product.id != id)

    fs.writeFileSync("productos.json", JSON.stringify(newProducts))

    res.send("Producto eliminado con éxito!")

})

