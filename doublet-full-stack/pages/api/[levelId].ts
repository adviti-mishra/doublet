import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../src/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let levelIdParam = req.query.levelId; // Correctly access the levelId parameter

  let levelId = "";

  // Ensure levelIdParam is a string. Handle the case where it could be an array.
  if (Array.isArray(levelIdParam)) {
    // Option 1: Use the first value if it's an array
    levelId = levelIdParam[0];
  } else {
    // Ensure levelIdParam is defined and is a string
    if (typeof levelIdParam !== "string") {
      // Respond with an error or handle the case where levelIdParam is not a valid string
      return res
        .status(400)
        .json({ error: "Invalid or missing levelId parameter." });
    }
    levelId = levelIdParam;
  }

  try {
    const { data, error } = await supabase
      .from("levels")
      .select("*")
      .eq("levelId", levelId)
      .single();
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    // Assert that error is of type Error to access its message property
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      // If it's not an Error instance, send a generic error message
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}
