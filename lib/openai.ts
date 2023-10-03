import { Configuration, OpenAIApi } from "openai-edge";
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Your an powerfull and creative AI to help me generate thumbnail for my note app. Your output will be fed into the DALLE API to generate a thumbnail. I want the description should be flat styled. You're not gonna generate image with any text inside it, just the flat-styled image.  And you should be generated only one image, not more",
        },
        {
          role: "user",
          content: `I want to generate an image for my note app. The note name is ${name}`,
        },
      ],
    });
    const data = await response.json();
    const image_description = data.choices[0].message.content;
    return image_description as string;
  } catch (error) {
    console.log(error);
    throw new Error("Error generating image prompt");
  }
}

export async function generateImage(image_description: string) {
  try {
    const response = await openai.createImage({
      prompt: image_description,
      n: 1,
      size: "256x256",
    });
    const data = await response.json();
    const image_url = data.data[0].url;
    return image_url as string;
  } catch (error) {
    console.error(error);
  }
}
