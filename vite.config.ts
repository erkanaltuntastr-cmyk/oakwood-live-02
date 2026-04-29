import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'node:fs/promises'

const stateFile = path.resolve(__dirname, '.runtime', 'app-state.json')
const defaultState = {
  lang: 'en',
  profiles: [],
  activeProfileId: null,
  activeChildId: null,
  isAdminSession: false,
  quizDrafts: [],
  quizSessions: [],
  homework: [],
  directMessages: [],
  noteThreads: [],
  registrationRequests: [],
  inviteCodes: [],
  adminMessages: [],
  registrationDraft: null,
}

async function readState() {
  try {
    const raw = await fs.readFile(stateFile, 'utf8')
    const parsed = JSON.parse(raw)
    return { ...defaultState, ...(parsed.state ?? parsed) }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return defaultState
    }
    throw error
  }
}

async function writeState(state: unknown) {
  await fs.mkdir(path.dirname(stateFile), { recursive: true })
  const payload = {
    state: { ...defaultState, ...(typeof state === 'object' && state ? state : {}) },
    updatedAt: new Date().toISOString(),
  }
  const tempFile = `${stateFile}.tmp`
  await fs.writeFile(tempFile, JSON.stringify(payload, null, 2), 'utf8')
  await fs.rename(tempFile, stateFile)
  return payload
}

function readBody(req: NodeJS.ReadableStream): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function statePersistencePlugin() {
  const handler = async (req: any, res: any, next: () => void) => {
    if (!req.url?.startsWith('/api/state')) return next()

    try {
      if (req.method === 'GET') {
        const state = await readState()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: true, state }))
        return
      }

      if (req.method === 'PUT') {
        const rawBody = await readBody(req)
        const parsed = rawBody ? JSON.parse(rawBody) : {}
        if (!parsed || typeof parsed.state !== 'object' || Array.isArray(parsed.state)) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'state object required' }))
          return
        }

        const payload = await writeState(parsed.state)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: true, updatedAt: payload.updatedAt }))
        return
      }

      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Method not allowed' }))
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        error: error instanceof Error ? error.message : 'State persistence failed',
      }))
    }
  }

  return {
    name: 'oakwood-state-persistence',
    configureServer(server: any) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(handler)
    },
  }
}

export default defineConfig({
  plugins: [react(), statePersistencePlugin()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    strictPort: true,
    allowedHosts: ['parent.oakwoodapps.co.uk', 'parentsapp.oakwoodapps.co.uk'],
    proxy: {
      '/api/ai': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
      '/api/health': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
