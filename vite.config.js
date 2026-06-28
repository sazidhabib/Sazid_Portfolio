import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin to serve Vercel-style API routes locally via Vite's dev server
function vercelApiPlugin() {
  return {
    name: 'vercel-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Only handle /api/* routes
        if (!req.url || !req.url.startsWith('/api/')) {
          return next()
        }

        // Extract the route name (e.g., /api/contact -> contact)
        const routeName = req.url.replace('/api/', '').split('?')[0]
        const handlerPath = path.join(__dirname, 'api', `${routeName}.js`)

        try {
          // Clear module cache for hot-reload during development
          const modulePath = `file://${handlerPath.replace(/\\/g, '/')}?t=${Date.now()}`
          const mod = await import(modulePath)
          const handler = mod.default

          if (typeof handler !== 'function') {
            res.statusCode = 500
            res.end(JSON.stringify({ error: `No default export in api/${routeName}.js` }))
            return
          }

          // Parse JSON body for POST requests
          if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            const body = await new Promise((resolve) => {
              let data = ''
              req.on('data', (chunk) => { data += chunk })
              req.on('end', () => {
                try { resolve(JSON.parse(data)) }
                catch { resolve({}) }
              })
            })
            req.body = body
          }

          // Create a Vercel-compatible response object
          const originalEnd = res.end.bind(res)
          res.status = (code) => { res.statusCode = code; return res }
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json')
            originalEnd(JSON.stringify(data))
          }

          await handler(req, res)
        } catch (err) {
          console.error(`[API Error] ${req.url}:`, err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Internal Server Error', details: err.message }))
        }
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiPlugin()],
})
