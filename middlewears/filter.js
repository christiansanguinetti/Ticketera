export default function duildFilter(req, res, next){
    const {status, prority, search} = req.query;
    let filter = {};

    if(status){
        filter.status = status;
    }
    
    if(prority){
        filter.prority = prority;
    }
    if(search){
        filter.$or = [
            {title : {$regex: search, $options: "i"}},
            {description: {$regex: search, $options: "i"}}
        ];
    }
    req.filter = filter;
    next();
}