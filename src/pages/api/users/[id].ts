import { NextApiRequest, NextApiResponse } from 'next'
export default function handle(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log(request.query)

  const users = [
    { id: 1, name: 'felipe' },
    { id: 2, name: 'diego' },
    { id: 3, name: 'kelyane' },
  ]

  return response.json(users)
}

// LANDING PAGE

// SERVERLESS

// AUTHENTICATION - JWT(storage)
// NEXT-AUTH (login social)
