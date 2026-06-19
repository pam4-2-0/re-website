import { MemoryRouter } from 'react-router-dom'

export default function RouterProvider({ children }) {
  return <MemoryRouter>{children}</MemoryRouter>
}
