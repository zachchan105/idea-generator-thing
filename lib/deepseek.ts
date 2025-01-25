interface DeepseekMessage {
  role: string
  content: string
}

interface DeepseekParams {
  messages: DeepseekMessage[]
}

export const deepseek = {
  chat: {
    completions: {
      create: async (params: DeepseekParams) => {
        try {
          const response = await fetch(`${process.env.DEEPSEEK_API_URL}/chat/completions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.DEEPSEEK_SECRET}`
            },
            body: JSON.stringify({
              model: process.env.DEEPSEEK_MODEL,
              messages: params.messages,
              temperature: 0.7,
              max_tokens: 500
            })
          })

          if (!response.ok) {
            const errorData = await response.json()
            console.error('Deepseek API Error:', errorData)
            throw new Error(`Deepseek API error: ${response.statusText}`)
          }

          return await response.json()
        } catch (error) {
          console.error('Deepseek API Request Failed:', error)
          throw error
        }
      }
    }
  }
} 