import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["NEXT_PUBLIC_OPENAI_API_KEY"],
});

export async function generateStatement(formData: Record<string, string>) {
  const userContent = ` 
  The following is a data of a user for creating a statement of purpose (SOP) to come to Canada as an international student.
  The government of canada need this sop to make the decision if the user is qualified to obtain an study permit or not.
  Just give me the statement ready for copy. Be pricise and to the point and avoid super complicated words.
  The user data is as follows: ${JSON.stringify(formData, null, 2)}`;

  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a professional assistant specializing in writing Statements of Purpose based on user-provided data.",
      },
      { role: "user", content: userContent },
    ],
    model: "gpt-4",
  });

  return chatCompletion.choices[0].message?.content || "No response generated.";
}
