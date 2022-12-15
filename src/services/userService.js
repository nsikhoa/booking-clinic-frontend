import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (id) => {
  return axios.get(`/api/users?id=${id}`);
};

const getAllCodeService = (inputdata) => {
  return axios.get(`/api/allcode?type=${inputdata}`);
};

const deleteUserService = (userId) => {
  return axios.delete(`/api/users`, {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/users", inputData);
};

const createUserService = (data) => {
  return axios.post("/api/users", data);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/doctors-home?limit=${limit}`);
};

const getAllDoctorService = () => {
  return axios.get(`/api/doctors`);
};

const createDoctorInfoService = (data) => {
  return axios.post("/api/doctors", data);
};

const getDetailDoctor = (id) => {
  return axios.get(`/api/doctors/info?id=${id}`);
};

const createDoctorSchedule = (data) => {
  return axios.post(`/api/doctors/schedules`, data);
};

const getScheduleDoctorDate = (doctorId, date) => {
  return axios.get(`/api/schedules_date?doctorId=${doctorId}&date=${date}`);
};

const getDetailDoctorExtraInfoById = (doctorId) => {
  return axios.get(`/api/doctors-extrainfo?id=${doctorId}`);
};

const getDoctorProfileById = (doctorId) => {
  return axios.get(`/api/doctors/profile?id=${doctorId}`);
};

const bookingAppointment = (data) => {
  return axios.post(`/api/patient-booking`, data);
};

const verifyBookingAppointment = (data) => {
  return axios.post(`/api/verify-booking`, data);
};

const createMedicalSpecialty = (data) => {
  return axios.post(`/api/specialties`, data);
};

const getAllMedicalSpecialty = () => {
  return axios.get("/api/specialties");
};

const getSpecialtyById = (data) => {
  return axios.get(`/api/specialties/${data.id}?location=${data.location}`);
};

const getUserByEmail = (email) => {
  return axios.get(`/api/users/email?email=${email}`);
};

const createClinic = (data) => {
  return axios.post("/api/clinics", data);
};

const getAllClinic = () => {
  return axios.get(`/api/clinics`);
};

const getDetailClinic = (id) => {
  return axios.get(`/api/clinics/${id}`);
};

const getSchedulePatients = (data) => {
  return axios.get(
    `/api/doctors/patients?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const sendMedicalBill = (data) => {
  return axios.post(`/api/doctors/medicalBookingBill`, data);
};

const getNumberPatientsByDoctorId = (doctorId) => {
  return axios.get(`/api/doctors/patients/count?doctorId=${doctorId}`);
};

const getListPatientHistory = (doctorId) => {
  return axios.get(`/api/doctors/patients/history?doctorId=${doctorId}`);
};

const cancelBookingAppointment = (data) => {
  return axios.post(`/api/cancel-booking`, data);
};

const getAllPatientHistory = (patientId) => {
  return axios.get(`/api/patient/history?patientId=${patientId}`);
};

const getListPatientHistoryDistinctByDoctorId = (doctorId) => {
  return axios.get(
    `/api/doctors/patients/historydistinct?doctorId=${doctorId}`
  );
};

const getListPatientHistoryDetail = (doctorId, patientId) => {
  return axios.get(
    `/api/doctors/patients/historydetail?doctorId=${doctorId}&patientId=${patientId}`
  );
};

export {
  handleLogin,
  getAllUsers,
  getAllCodeService,
  createUserService,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorService,
  createDoctorInfoService,
  getDetailDoctor,
  createDoctorSchedule,
  getScheduleDoctorDate,
  getDetailDoctorExtraInfoById,
  getDoctorProfileById,
  bookingAppointment,
  verifyBookingAppointment,
  createMedicalSpecialty,
  getAllMedicalSpecialty,
  getSpecialtyById,
  getUserByEmail,
  createClinic,
  getAllClinic,
  getDetailClinic,
  getSchedulePatients,
  sendMedicalBill,
  getNumberPatientsByDoctorId,
  getListPatientHistory,
  cancelBookingAppointment,
  getAllPatientHistory,
  getListPatientHistoryDistinctByDoctorId,
  getListPatientHistoryDetail,
};
