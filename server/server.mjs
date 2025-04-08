import   express         from 'express';
import   path            from 'path';
import { fileURLToPath } from 'url';
import { getDocs       } from './s01_server-api/getDocs.mjs';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const __basedir  = __dirname.replace( /\/server/, '' )

// Create Express application
const app = express();

// Set up routes for client app (port 8001)
const clientApp = express();

// Serve static files from the client directory
clientApp.use(express.static(path.join(__basedir, 'client/c01_client-app')));

// Route for the root URL - serves index.html
clientApp.get('/', (req, res) => {
  res.sendFile(path.join(__basedir, 'client/c01_client-app/index.html'));
});

// Route for page1
clientApp.get('/page1', (req, res) => {
  res.sendFile(path.join(__basedir, 'client/c01_client-app/page1.html'));
});

// Set up routes for API server (port 8101)
const serverAPI = express();

// API route for getDocs
serverAPI.get('/api/getDocs', async (req, res) => {
  try {
    const result = await getDocs();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the servers
    console.log( "" )
var aPorts = process.argv[2] || 'both'
if (8001 ==  aPorts || aPorts == 'both') {
    clientApp.listen(8001, () => {
    console.log('  Client App is running at http://localhost:8001');
    }); }

if (8101 == aPorts || aPorts == 'both') {
    serverAPI.listen(8101, () => {
    console.log('  Server API is running at http://localhost:8101');
    }); }
 
