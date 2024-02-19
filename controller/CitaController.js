import { CitaModel } from "../models/CitaModel";
import { UserModel } from "../models/UserModel";
import { Op } from "sequelize";

export const  getAvailableSpecialties = async (req, res) => {
    try {
      const availableDoctors = await UserModel.findAll({
        where: {
          state: true,
          especialidad: { [Op.not]: null },
        },
        attributes: ['id', 'name', 'especialidad'],
        include: [
          {
            model: CitaModel,
            attributes: ['fechaHora'],
            where: {
              fechaHora: {
                [Op.gt]: new Date(),
              },
            },
            required: false,
          },
        ],
      });
      const specialties = Array.from(
        new Set(availableDoctors.map((doctor) => doctor.especialidad))
      );
      const result = specialties.map((specialty) => {
        const doctorsInSpecialty = availableDoctors
          .filter((doctor) => doctor.especialidad === specialty)
          .map((doctor) => ({
            id: doctor.id,
            name: doctor.name,
            availableDates: doctor.citas
              ? doctor.citas.map((cita) => cita.fechaHora)
              : [],
          }));
        return {
          specialty,
          doctors: doctorsInSpecialty,
        };
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };







