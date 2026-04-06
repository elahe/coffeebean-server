-- CreateTable
CREATE TABLE "CoffeeBean" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "roast" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoffeeBean_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "grindSize" TEXT,
    "ratio" TEXT,
    "notes" TEXT,
    "coffeeId" INTEGER NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "CoffeeBean"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
