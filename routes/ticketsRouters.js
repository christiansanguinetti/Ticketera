import express from 'express';
import mongoose from 'mongoose';
import Ticket from '../Models/Ticket.js';
import auth from '../middlewears/Auth.js';
import admin from '../middlewears/Admin.js'
import paginate from '../middlewears/paginate.js'
import buildFilter from '../middlewears/filter.js'
import ticketSchema from '../validations/ticketvalidation.js';


const router = express.Router();
//GET all tickets
//GET /api/tickets?pageSize=10&page=1
//Get /api/tickets?status=open&priority=high
//GET /api/tickets?search=bug
//GET api/tickets
//PUBLIC
router.get('/', buildFilter, paginate(Ticket), async (req, res)=> {
   res.status(200).json(req.paginatedResult);
});

//Create ticket
//PRIVATE ( Only logged in users con create tickets)
//TICKET schema: user, title, description, prority, status
//POST api/tikets
router.post('/', auth, async(req, res)=> {
    const{error} = ticketSchema.validate(req.body)
    if(error){
        res.status(400).json({message: error.details[0].message})
    }
    
  const ticket = new Ticket({
    //user: req.body.userID,  Es el viejo pero lo use para probar y ahora con el auth agregado se cambia por la siguiente 
    user: req.user._id,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,

  });
  try{
    const newTicket = await ticket.save();
    res.status(201).json({ ticket: newTicket})
  }catch(err){
    res.status(500).json({message: "Server Error"+ err.message});
  }
});


//GET TIcket by ID 
//PUBLIC
//GET api/tickets/:id
router.get('/:id', async (req, res)=>{ 
    try{
       
        const ticket = await Ticket.findOne({id: req.params.id})
        if(!ticket){
            return res.status(404).json({message: "Ticket not found"})
        }
        res.status(200).json({ticket: ticket})
    }catch(err){
        res.status(500).json({message: "Server Erorr"+ err.message});
    }
})

//UPDATE a ticket by Id
//PUT /api/tickets/:id
//TICKET schema: user, title, description, priority, status
//PRIVATE only loged users con update tickets
router.put('/id', auth, async (req, res)=>{ 
    const updates = req.body;
    try{
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, updates, {new: true});
        if(!ticket){
            return res.status(404).json({message:"Ticket not found"});
        }
        res.status(200).json({ticket: ticket})
    }catch(err){
        res.status(500).json({message:"Server Error" + err.message})
    }
})


//DELETE TICKET by ID
//PRIVATE ONLY admin users, con deleteTICKETS 
router.delete('/:id', [auth, admin], async (req, res)=>{ 
    try{
        const ticket = await Ticket.findOneAndDelete(req.params.id);
        if(!ticket){
            return res.status(404).json({message:"Ticket not found"})
        }
        res.status(200).json({ticket: ticket})
    }catch(err){
        res.status(500).json({message:"Server Error" + err.message})
    }
})

export default router