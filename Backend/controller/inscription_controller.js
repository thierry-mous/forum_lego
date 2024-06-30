
const userModel = require('../modeles/inscription_modeles.js');



const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.getUserById(id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        return res.status(200).send(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};

const updateUsers = async (req, res) => {
    const { id } = req.params;
    const { biography } = req.body;

    try {
        const user = await userModel.getUserById(id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        await userModel.updateUsers(id, biography);

        const updatedUser = await userModel.getUserById(id);

        return res.status(200).json(updatedUser); 
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};



module.exports = {

    getUserById,
    updateUsers
};
