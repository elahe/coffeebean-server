import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const coffeeNames = [
  "Ethiopia Yirgacheffe",
  "Colombia Supremo",
  "Brazil Santos",
  "Kenya AA",
  "Guatemala Antigua",
  "Costa Rica Tarrazu",
  "Sumatra Mandheling",
  "Honduras Marcala",
  "Peru Organic",
  "Rwanda Bourbon",
  "Nicaragua Jinotega",
  "El Salvador Pacamara",
  "Panama Geisha",
  "Mexico Chiapas",
  "Tanzania Peaberry"
];

const methods = ["V60", "Espresso", "Aeropress", "French Press", "Chemex"];
const grindSizes = ["Fine", "Medium", "Coarse"];

async function main() {
  for (let i = 0; i < coffeeNames.length; i++) {
    const coffee = await prisma.coffeeBean.create({
      data: {
        name: coffeeNames[i],
        origin: coffeeNames[i].split(" ")[0],
        roast: ["Light", "Medium", "Dark"][i % 3]
      }
    });

    const recipes = [];

    for (let j = 0; j < 5; j++) {
      recipes.push({
        title: `${methods[j]} Recipe`,
        method: methods[j],
        grindSize: grindSizes[j % 3],
        ratio: "1:15",
        notes: "Tasty and balanced",
        coffeeId: coffee.id
      });
    }

    await prisma.recipe.createMany({
      data: recipes
    });
  }

  console.log("🌱 Real coffee seed done");
}

main()
  .catch(console.error)
  .then(() => prisma.$disconnect());