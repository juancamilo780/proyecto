import { http, HttpResponse } from 'msw'
import { items } from './data'

export const handlers = [
  http.get('/api/items', ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category') || ''
    const city = (url.searchParams.get('city') || '').toLowerCase()
    const min = Number(url.searchParams.get('min') || '0')
    const max = Number(url.searchParams.get('max') || '99999999')

    const filtered = items.filter((it) =>
      (category ? it.categoryId === category : true) &&
      (city ? it.city.toLowerCase().includes(city) : true) &&
      it.priceFrom >= min && it.priceFrom <= max
    )
    return HttpResponse.json(filtered)
  }),

  http.get('/api/items/:id', ({ params }) => {
    const found = items.find((i) => i.id === params.id)
    if (!found) return new HttpResponse('Not found', { status: 404 })
    return HttpResponse.json(found)
  }),
]
