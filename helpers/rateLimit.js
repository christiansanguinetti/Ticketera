import rateLimit from "express-rate-limit";

const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //limite
    max: 100 //limit each for IP to 100 request per windowMS
})
export default Limiter