import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { data, error } = await supabase.from("videos").select();

  return NextResponse.json({ data });
}
