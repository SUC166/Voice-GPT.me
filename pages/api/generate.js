import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.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,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      } 
    });
    return;
  }



  



  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please say someting...",
      }
    });
    return false;
  }

  try {
    let completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0,
      max_tokens: 256,
    });

    res.status(200).json({ result: completion.data.choices[0].text });
    return false
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
      return false
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
      return false
    }
  }
}

function generatePrompt(animal) {
    animal = `answer "` + animal + `"`
    return(animal)
}
