import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const userSession = await getServerSession(authOptions);
    const user = userSession?.user;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = await db.user.findUnique({
      where: {
        email: user?.email!,
      },
      select: {
        id: true,
      },
    });
    console.log("got user id");
    if (!userId) {
      return new NextResponse("UserID not found", { status: 404 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
    });
    console.log("got course id");
    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }
    console.log(course.priceInCents! , "this is in cents");

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId?.id!,
          courseId: params.courseId,
        },
      },
    });
    console.log("new purchaser");
    if (purchase) {
      return new NextResponse("You have already purchased it", { status: 400 });
    }
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: course.title!,
          },
          unit_amount: course.priceInCents!,
        },
      }, 
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: userId?.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email!,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: userId?.id!,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
      metadata: {
        courseId: course.id,
        userId: userId.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return new NextResponse("An error occurred", { status: 500 });
  }
}
