import express from "express";
import { prisma } from "../prisma/client";

const router = express.Router()

router.get("/", async(req,res)=>{
    try {
        const recipes = await prisma.recipe.findMany({
            include :{coffee :true}
        })
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching recipes" });
        console.log(error)
    }
})
router.post("/", async(req, res) =>{
    try {
        const { title, method, grindSize, ratio, notes, coffeeId } = req.body;
        const newRecipe = await prisma.recipe.create({
        data: {
            title,
            method,
            grindSize,
            ratio,
            notes,
            coffeeId: Number(coffeeId) 
        }
        });
        res.json(newRecipe);
    } catch (error) {
        res.status(500).json({ error: "Error creating recipe" });
        console.log(error)
    }
})
export default router