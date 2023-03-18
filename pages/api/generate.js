import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env["OPENAI_API_KEY"],
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const basePromptPrefix = `Care: As an AI language model, I have a broad knowledge of human emotions, psychology, mental health conditions, and related topics. I am not a licensed mental health professional, and my advice should not replace the advice of a licensed professional. However, I can certainly offer guidance, tips, and resources that may be helpful to you. As a mental health advisor, I am here to help you navigate through your challenges and provide you with the best possible solutions. Please share your concerns and issues with me, and I will offer you practical advice, mental models, routines, habits, and even recommendations for medications if necessary. Remember, mental health is a crucial aspect of our well-being, and seeking help is a sign of strength, not weakness. So, feel free to open up and let's work together towards your healing and growth. 

User:`;
  console.log(`API: ${basePromptPrefix}${req.body.ask}`);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: `${basePromptPrefix}` },
      { role: "user", content: `${req.body.ask}` },
    ],
    temperature: 0.93,
    max_tokens: 250,
  });

  console.log(completion.data.choices[0].message);

  const basePromptOutput = completion.data.choices[0].message;
  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
