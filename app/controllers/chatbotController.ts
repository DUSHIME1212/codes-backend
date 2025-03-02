import type { Request, Response } from "express"
import { generateChatResponse } from "../services/geminiService"
import { validateChatMessage } from "../validators/chatbotValidator"

// Get chatbot response
export async function getChatbotResponse(req: Request, res: Response) {
  try {
    const { message } = validateChatMessage(req.body)

    const prompt = `You are an AI assistant for a learning management system for children. The system includes features for parents, children, and admins. It offers lessons, games, and group activities. Please provide information about the following query: ${message}`

    const response = await generateChatResponse(prompt)
    res.json({ response })
  } catch (error) {
    res.status(500).json({ error: "Failed to generate chatbot response" })
  }
}

