import prisma from '../configs/database';
import paypack from '../configs/paypack';
import { PaymentStatus } from '@prisma/client';

export async function createPayment(parentId: string, amount: number, lessonId: string) {
  const parent = await prisma.parent.findUnique({
    where: { id: parentId },
    include: { user: true },
  });

  if (!parent || !parent.user.phoneNumber) {
    throw new Error('Parent not found or phone number is missing');
  }

  try {
    const paymentResult = await paypack.cashin({
      number: parent.user.phoneNumber,
      amount: amount,
    });

    const payment = await prisma.payment.create({
      data: {
        amount: amount,
        status: PaymentStatus.PENDING,
        parentId: parentId,
        lessonId: lessonId,
        paypackRef: paymentResult.data.ref,
      },
    });

    return payment;
  } catch (error) {
    console.error('Payment error:', error);
    throw new Error('Payment processing failed');
  }
}

export async function getPaymentStatus(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment) {
    throw new Error('Payment not found');
  }

  try {
    const events = await paypack.events({ offset: 0, limit: 1 });
    const latestEvent = events.data.transactions[0];

    if (latestEvent && latestEvent.data.ref === payment.paypackRef) {
      const newStatus = latestEvent.data.status.toUpperCase() as PaymentStatus;
      await prisma.payment.update({
        where: { id: paymentId },
        data: { status: newStatus },
      });

      return newStatus;
    }

    return payment.status;
  } catch (error) {
    console.error('Error fetching payment status:', error);
    throw new Error('Failed to fetch payment status');
  }
}
