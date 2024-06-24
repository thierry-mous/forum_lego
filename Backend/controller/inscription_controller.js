const Inscription = require('../modeles/inscription_modeles');
const bcrypt = require('bcrypt');

class ControllerInscription {
    static async postInscription(req, res) {
        try {
            const { username, email, password } = req.body;

            // Valider les données ici (exemple simple)
            if (!(username && email && password)) {
                return res.status(400).send("Toutes les données sont requises");
            }

            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insérer dans la base de données (exemple hypothétique)
            const newUser = await Inscription.create({
                username,
                email,
                password: hashedPassword
            });

            // Réponse de succès
            res.status(201).json({
                message: "Utilisateur créé avec succès",
                utilisateur: newUser
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erreur lors de la création de l'utilisateur");
        }
    }
}

module.exports = ControllerInscription;