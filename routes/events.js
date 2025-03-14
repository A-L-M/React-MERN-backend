const { Router } = require("express");
const { check } = require("express-validator");

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

/*
    Event Routes
    /api/events
*/

const router = Router();

// Se aplica un middleware a todas las peticiones
router.use(validarJWT);

//Todas tienen que pasar por la validacion del JWT
// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos,
    ],
    crearEvento
);

// Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos,
    ],
    actualizarEvento
);

// Borrar evento
router.delete(
    '/:id',
    [
        validarCampos,
    ],
    eliminarEvento,
);

module.exports = router;