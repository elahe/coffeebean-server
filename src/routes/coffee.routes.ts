import { Router } from "express";
import { prisma } from "../prisma/client";

const router = Router()
router.get("/", async(req,res) =>{
    try {
        const coffees = await prisma.coffeeBean.findMany({
            include:{recipes :true}
        })
        res.json(coffees)
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
})

router.get("/:id", async(req,res) =>{
    try {
        const id = Number(req.params.id)
        const coffeeDetail = await prisma.coffeeBean.findMany({
            where :{id}
        })
        res.json(coffeeDetail);
    } catch (error) {
        res.status(500).json({
        error: "Error updating coffee"
        })
    }
})

router.post("/", async(req, res)=>{
    try {
        const {name, origin, roast} =req.body
        const newCoffee = await prisma.coffeeBean.create({
            data:{
                name, 
                origin, 
                roast
            }
        })
        res.json(newCoffee)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

router.put("/:id", async(req,res) =>{
    try {
        const id = Number(req.params.id)
        const {name, origin, roast} =req.body
        const updated = await prisma.coffeeBean.update({
            where :{id},
            data: {name, origin, roast}
        })
        res.json(updated);
    } catch (error) {
        res.status(500).json({
        error: "Error updating coffee"
        })
    }
})

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
  
    await prisma.coffeeBean.delete({
      where: { id }
    });
  
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json(error)
  }
});

export default router