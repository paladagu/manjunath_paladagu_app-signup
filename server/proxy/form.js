const Joi = require('joi');

const validator = require('express-joi-validation').createValidator({})

const querySchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    organization: Joi.string(),
    emailAddress: Joi.string().required(),
    comunications: Joi.string(),
    advances: Joi.string(),
    euResident: Joi.string(),
    alerts: Joi.string(),
})

module.exports = (app) => {
    app.post('/api/form-submit', validator.body(querySchema), (req, res) => {
        const payload = req.body;
        if (payload.firstName)
            res.status(200).send({
                "status": "success",
                "message": "Thank you. You are now subscribed."
            })
    });
}
