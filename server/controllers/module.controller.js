const {
    getModuleById,
    createModule,
    updateModule,
    deleteModule,
} = require("../services/module.service");

const GetModule = async (req, res) => {
    try {
        const module = await getModuleById(req.params.id);
        res.status(200).json({ success: true, module });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const CreateModule = async (req, res) => {
    try {
        const module = await createModule(req.params.courseId, req.body);
        res.status(201).json({ success: true, module });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const UpdateModule = async (req, res) => {
    try {
        const module = await updateModule(req.params.id, req.body);
        res.status(200).json({ success: true, module });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const DeleteModule = async (req, res) => {
    try {
        const result = await deleteModule(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

module.exports = { GetModule, CreateModule, UpdateModule, DeleteModule };
