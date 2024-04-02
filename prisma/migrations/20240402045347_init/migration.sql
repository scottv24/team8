/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Basket" (
    "basketId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("basketId")
);

-- CreateTable
CREATE TABLE "ProductQuantity" (
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "basketId" INTEGER NOT NULL,

    CONSTRAINT "ProductQuantity_pkey" PRIMARY KEY ("productId","basketId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" SERIAL NOT NULL,
    "name" VARCHAR(70) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" DECIMAL(5,2) NOT NULL,
    "img" VARCHAR(255) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "user_basket_fk" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQuantity" ADD CONSTRAINT "product_order_fk" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQuantity" ADD CONSTRAINT "basket_item_fk" FOREIGN KEY ("basketId") REFERENCES "Basket"("basketId") ON DELETE CASCADE ON UPDATE CASCADE;
