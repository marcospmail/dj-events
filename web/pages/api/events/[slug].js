import { events } from './data.json'

export default (req, res) => {
  const eventsFound = events.filter(v => v.slug === req.query.slug)

  if (req.method === 'GET') {
    return res.status(200).json(eventsFound)
  }

  res.setHeader('Allow', ['GET'])
  res.status(405).json({ message: `Method ${req.method} is not allowed`})
}