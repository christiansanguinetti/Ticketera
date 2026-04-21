import joi from 'joi';


const ticketSchema = joi.object({
    user: joi.string().required(),
    title: joi.string().required(),
    description: joi.string().min(5).required(),
    prority: joi.string().valid("low","medium","high").required(),
    status: joi.string().valid("open","closed","in-progress"),

})
export default ticketSchema