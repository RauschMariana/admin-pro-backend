const fs = require('fs');

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        // borrar imagen anterior
        fs.unlinkSync(path);
    }

}

const updateImage = async(type, id, fileName) => {
    

    switch (type) {
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No se encontro el hospital');
                return false;
            }

            const pathOldHospital = `./uploads/hospitals/${hospital.img}`;
            deleteImage(pathOldHospital);

            hospital.img = fileName;
            await hospital.save();
            return true;
        break;

        case 'doctors':
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                console.log('No se encontro el doctor');
                return false;
            }

            const pathOldDoctor = `./uploads/doctors/${doctor.img}`;
            deleteImage(pathOldDoctor);

            doctor.img = fileName;
            await doctor.save();
            return true;
        break;
    
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                console.log('No se encontro el usuario');
                return false;
            }

            const pathOldUser = `./uploads/users/${user.img}`;
            deleteImage(pathOldUser);

            user.img = fileName;
            await user.save();
            return true;
        break;
    }

}


module.exports = {
    updateImage
}