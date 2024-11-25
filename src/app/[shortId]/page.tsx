import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";

export default async function RedirectPage({
  params,
}: {
  params: { shortId: string };
}) {
  const { shortId } = params;

  const db = await dbConnect();
  const collection = db.collection("urls");
  const url = await collection.findOne({ shortId });

  if (!url) {
    redirect("/404"); // Redirect to a 404 page if the short URL is invalid
  }

  redirect(url.originalUrl); // Redirect to the original URL
}
