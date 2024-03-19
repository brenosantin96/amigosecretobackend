import { RequestHandler } from "express";
import { z } from 'zod'
import * as groups from '../services/groups'

export const getAll: RequestHandler = async (req, res) => {

    const { id_event } = req.params;

    const allGroups = await groups.getAll(parseInt(id_event));

    if (allGroups) return res.json({ groups: allGroups })

    res.json({ error: "An error has ocurried" })

}

export const getGroup: RequestHandler = async (req, res) => {

    const { id, id_event } = req.params;

    const groupItem = await groups.getOne({
        id: parseInt(id),
        id_event: parseInt(id_event)
    })

    if (groupItem) return res.json({ group: groupItem })

    res.json({ error: "An error has ocurried" })

}

export const addGroup: RequestHandler = async (req, res) => {

    const { id_event } = req.params;

    const addGroupSchema = z.object({
        name: z.string()
    })

    const body = addGroupSchema.safeParse(req.body)
    if (!body.success) return res.status(400).json({ error: "No valid data" })

    const newGroup = await groups.add({
        name: body.data.name,
        id_event: parseInt(id_event)
    })

    if (newGroup) return res.status(201).json({ group: newGroup })

    res.json({ error: "An error has ocurried" })

}