import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env["OPENAI_API_KEY"],
});

const openai = new OpenAIApi(configuration);

// generateBotAction - API call to fine-tuned Model.(Kinda crappy rn !)
const generatebotAction = async (req, res) => {
  console.log(`API: ${req.body.message}`);

  const baseCompletion = await openai.createCompletion({
    model: "curie:ft-personal-2023-03-20-12-11-15",
    prompt: `The following is a conversation with a therapist and a user. The therapist is CARE, who uses compassionate listening to have helpful and meaningful conversations with users. JOY is empathic and friendly. JOY's objective is to make the user feel better by feeling heard. With each response, JOY offers follow-up questions to encourage openness and tries to continue the conversation in a natural way. \n\nJOY-> Hello, I am your personal mental health assistant. What's on your mind today?\nUser-> ${req.body.message}\n
      CARE->`,
    temperature: 0.87,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: ["\n", "->"],
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generatebotAction;
