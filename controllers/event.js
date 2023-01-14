const { response } = require('express');
const Event = require('../models/Event');

const obtainEvents = async(req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.status(201).json({
        ok: true,
        events
    });
}

const createEvent = async(req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const eventSave = await event.save();

        res.status(201).json({
            ok: true,
            evento: eventSave,
            msg: `Evento ${event.title} se ha creado correctamente`
        }); 
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error!, favor comuniquese con el administrador'
        });
    }
}

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if(!event){

            return res.status(404).json({
                ok: false,
                msg: 'Error!, evento no existe por ese id'
            });
        }

        if(event.user.toString() !== uid){

            return res.status(401).json({
                ok: false,
                msg: `No tiene el privilegio de editar ese evento`
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.status(201).json({
            ok: true,
            eventUpdate,
            msg: `Evento actualizado`
        });
    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error!, favor comuniquese con el administrador'
        });
    }
}

const deleteEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if(!event){

            return res.status(404).json({
                ok: false,
                msg: 'Error!, evento no existe por ese id'
            });
        }

        if(event.user.toString() !== uid){

            return res.status(401).json({
                ok: false,
                msg: `No tiene el privilegio de eliminar ese evento`
            });
        }

        const eventDelete = await Event.findByIdAndDelete(eventId);

        res.status(201).json({
            ok: true,
            eventDelete,
            msg: `Evento eliminado correctamente`
        });
    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error!, favor comuniquese con el administrador'
        });
    }
}

module.exports = {
    obtainEvents,
    createEvent,
    updateEvent,
    deleteEvent
}