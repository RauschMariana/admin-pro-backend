const { response } = require('express');
const Doctor = require('../models/doctor');


const getDoctors = async (req, res = response) => {
 
    const doctors = await Doctor.find()
        .populate('user', 'name img')
        .populate('hospital', 'name img');
    res.json({
        ok: true,
        doctors
    });

}

const getDoctorById = async (req, res = response) => {
    const id = req.params.id;

    const doctor = await Doctor.findById(id)
        .populate('hospital', 'name img');
    res.json({
        ok: true,
        doctor
    });

}

const createDoctor = async (req, res = response) => {
    const uid = req.uid;

    const doctor = new Doctor({
        user: uid,
        ...req.body
    });

    try {
        const doctorDB = await doctor.save();
        res.json({
            ok: true,
            doctor: doctorDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const updateDoctor = async (req, res = response) => {

    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor no encontrado'
            });
        }

        const changesDoctor = {
            ...req.body,
            user: req.uid
        }

        const doctorUpdated = await Doctor.findByIdAndUpdate(id, changesDoctor, { new: true });

        res.json({
            ok: true,
            doctor: doctorUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deleteDoctor = async (req, res = response) => {

    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor no encontrado'
            });
        }

        await Doctor.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Doctor eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


module.exports = {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
}