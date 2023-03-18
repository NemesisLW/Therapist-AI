import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env["OPENAI_API_KEY"],
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const basePromptPrefix = `List as JSON objects. Each object has a subobject of Solution" and "description" 

  Care: As an AI language model, I have a broad knowledge of human emotions, psychology, mental health conditions, and related topics. I am not a licensed mental health professional, and my advice should not replace the advice of a licensed professional. However, I can certainly offer guidance, tips, and resources that may be helpful to you. As a mental health advisor, I am here to help you navigate through your challenges and provide you with the best possible solutions. Please share your concerns and issues with me, and I will offer you practical advice, mental models, routines, habits, and even recommendations for medications if necessary. Remember, mental health is a crucial aspect of our well-being, and seeking help is a sign of strength, not weakness. So, feel free to open up and let's work together towards your healing and growth. 
  
  User: `;

  const baseCompletion = await openai.createCompletion({
    model: "ada",
    prompt: `${basePromptPrefix}${req.body.ask}`,
    temperature: 0.9,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();
};

export default generateAction;
