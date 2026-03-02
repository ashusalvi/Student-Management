const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");
const { processDBRequest } = require("../../utils");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents();
    res.json({ students });

});

const handleAddStudent = asyncHandler(async (req, res) => {
    const {
        userId,
        name,
        gender,
        phone,
        email,
        dob,
        currentAddress,
        permanentAddress,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        systemAccess,
        class: className,
        section,
        admissionDate,
        roll
    } = req.body;

    const payload = {
        userId: userId || null,
        name,
        gender,
        phone,
        email,
        dob,
        currentAddress,
        permanentAddress,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        systemAccess,
        class: className,
        section,
        admissionDate,
        roll: roll ? Number(roll) : null
    };
    const message = await addNewStudent(payload);
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        userId,
        name,
        gender,
        phone,
        email,
        dob,
        currentAddress,
        permanentAddress,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        systemAccess,
        class: className,
        section,
        admissionDate,
        roll
    } = req.body;

    const payload = {
        userId: id || null,
        name,
        gender,
        phone,
        email,
        dob,
        currentAddress,
        permanentAddress,
        fatherName,
        fatherPhone,
        motherName,
        motherPhone,
        guardianName,
        guardianPhone,
        relationOfGuardian,
        systemAccess,
        class: className,
        section,
        admissionDate,
        roll: roll ? Number(roll) : null
    };
    console.log("Payload for updating student:", payload);
    const message = await updateStudent(payload);
    res.json(message);

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const studentDetail = await getStudentDetail(id);
    res.json(studentDetail);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    //write your code

});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
