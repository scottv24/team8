'use server'

import { getUserId } from '@/cookies'
import { prisma } from '@/lib/prisma'

export async function updateTimes({ productTimer }: { productTimer: number }) {
  try {
    console.log('here')
    const userId = getUserId()
    if (!userId) return
    console.log(productTimer)
    await prisma.$queryRaw`
    UPDATE "Basket" 
    SET "idvProductTime" = "idvProductTime" + ${productTimer}
    WHERE "userId" = ${userId} AND "completed" = false;
    `
  } catch (err) {
    console.log(err)
  }
}

export async function updateOverallATB() {
  try {
    const userId = getUserId()
    if (!userId) return

    await prisma.$queryRaw`
    UPDATE "Basket" 
    SET "atbBrowseClicks" = "atbBrowseClicks"+1
    WHERE "userId" = ${userId} AND "completed" = false;
    `
  } catch (err) {
    console.log(err)
  }
}

export async function updateProductATB() {
  try {
    const userId = getUserId()
    if (!userId) return

    await prisma.$queryRaw`
      UPDATE "Basket" 
      SET "atbProductClicks" = "atbProductClicks"+1
      WHERE "userId" = ${userId} AND "completed" = false;
      `
  } catch (err) {
    console.log(err)
  }
}

export async function updateBasketClicks() {
  try {
    const userId = getUserId()
    if (!userId) return

    await prisma.$queryRaw`
        UPDATE "Basket" 
        SET "basketClicks" = "basketClicks"+1
        WHERE "userId" = ${userId} AND "completed" = false;
        `
  } catch (err) {
    console.log(err)
  }
}

export async function updateBasketTimes(pageTimer: number) {
  try {
    const userId = getUserId()
    if (!userId) return

    await prisma.$queryRaw`
      UPDATE "Basket" 
      SET "checkoutTime" = "checkoutTime"+${pageTimer}
      WHERE "userId" = ${userId} AND "completed" = false;
      `
  } catch (err) {
    console.log(err)
  }
}

export async function updateProductsPageTime() {
  try {
    const userId = getUserId()
    if (!userId) return

    await prisma.$queryRaw`
          UPDATE "Basket" 
          SET "productsViewTime" = "productsViewTime"+5
          WHERE "userId" = ${userId} AND "completed" = false;
          `
  } catch (err) {
    console.log(err)
  }
}
