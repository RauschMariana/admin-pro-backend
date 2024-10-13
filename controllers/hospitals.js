const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async(req, res = response) => {

    const hospitals = await Hospital.find()
        .populate('user', 'name img');          
    res.json({ 
        ok: true,
        hospitals
    });
}


const createHospital = async(req, res = response) => { 

    const uid = req.uid;

    const hospital = new Hospital({
        user: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


const updateHospital = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        const changesHospital = {
            ...req.body,
            user: req.uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, changesHospital, { new: true } );

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }
}


const deleteHospital = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }

}


module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}