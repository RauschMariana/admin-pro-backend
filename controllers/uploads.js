const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');


const uploadFile = async(req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    // Validar tipo
    const validTypes = ['hospitals', 'doctors', 'users'];
    if (! validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo no es valido'
        });
    }

    // Validar la existencia de un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen
    const file = req.files.image;
    const splitName = file.name.split('.');
    const extension = splitName[splitName.length - 1];

    // Validar extension
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'La extensión no es valida'
        });
    }

    // Generar el nombre del archivo
    const fileName = `${ uuidv4() }.${ extension }`;

    // Guardar la imagen
    const path = `./uploads/${ type }/${ fileName }`;

    // Mover la imagen

    file.mv( path, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });

        res.json({
            ok: true,
            msg: 'File uploaded!',
            fileName
        });

        // Actualizar base de datos
        updateImage( type, id, fileName );

    });

    
}

const returnImage = async(req, res = response) => {
    const type = req.params.type;
    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/${ type }/${ img }`);

    // Imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }

}


module.exports = {
    uploadFile,
    returnImage
}