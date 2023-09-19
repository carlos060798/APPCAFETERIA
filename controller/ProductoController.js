//  controladores de producto

const CrearProducto = async (req, res) => {
    res.json({ msg: "crear producto" });
}

const ObtenerProducto = async (req, res) => {
    res.json({ msg: "obtener producto" });
}

const ObtenerProductoById = async (req, res) => {
    res.json({ msg: "obtener producto por id" });
}

const ActualizarProducto = async (req, res) => {
    res.json({ msg: "actualizar producto" });
}

const BorrarProducto = async (req, res) => {
    res.json({ msg: "borrar producto" });
}

export {
    CrearProducto,
    ObtenerProducto,
    ObtenerProductoById,
    ActualizarProducto,
    BorrarProducto
}