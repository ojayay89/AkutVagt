import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Get all craftsmen
app.get('/make-server-27acf415/craftsmen', async (c) => {
  try {
    const craftsmen = await kv.getByPrefix('craftsman:');
    return c.json({ success: true, data: craftsmen });
  } catch (error) {
    console.error('Error fetching craftsmen:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get single craftsman
app.get('/make-server-27acf415/craftsmen/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const craftsman = await kv.get(`craftsman:${id}`);
    
    if (!craftsman) {
      return c.json({ success: false, error: 'Craftsman not found' }, 404);
    }
    
    return c.json({ success: true, data: craftsman });
  } catch (error) {
    console.error('Error fetching craftsman:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create craftsman
app.post('/make-server-27acf415/craftsmen', async (c) => {
  try {
    const body = await c.req.json();
    const { companyName, address, phone, hourlyRate, website, category } = body;
    
    if (!companyName || !address || !phone || !category) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields: companyName, address, phone, category' 
      }, 400);
    }
    
    const id = crypto.randomUUID();
    const craftsman = {
      id,
      companyName,
      address,
      phone,
      hourlyRate: hourlyRate || null,
      website: website || null,
      category,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`craftsman:${id}`, craftsman);
    return c.json({ success: true, data: craftsman }, 201);
  } catch (error) {
    console.error('Error creating craftsman:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update craftsman
app.put('/make-server-27acf415/craftsmen/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existing = await kv.get(`craftsman:${id}`);
    if (!existing) {
      return c.json({ success: false, error: 'Craftsman not found' }, 404);
    }
    
    const updated = {
      ...existing,
      ...body,
      id, // Ensure ID cannot be changed
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`craftsman:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating craftsman:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete craftsman
app.delete('/make-server-27acf415/craftsmen/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const existing = await kv.get(`craftsman:${id}`);
    if (!existing) {
      return c.json({ success: false, error: 'Craftsman not found' }, 404);
    }
    
    await kv.del(`craftsman:${id}`);
    return c.json({ success: true, message: 'Craftsman deleted' });
  } catch (error) {
    console.error('Error deleting craftsman:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Track click event
app.post('/make-server-27acf415/clicks', async (c) => {
  try {
    const body = await c.req.json();
    const { craftsmanId, type } = body;
    
    if (!craftsmanId || !type) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields: craftsmanId, type' 
      }, 400);
    }
    
    const clickId = crypto.randomUUID();
    const click = {
      id: clickId,
      craftsmanId,
      type,
      timestamp: new Date().toISOString()
    };
    
    await kv.set(`click:${clickId}`, click);
    return c.json({ success: true, data: click });
  } catch (error) {
    console.error('Error tracking click:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get click statistics
app.get('/make-server-27acf415/stats/:craftsmanId', async (c) => {
  try {
    const craftsmanId = c.req.param('craftsmanId');
    const allClicks = await kv.getByPrefix('click:');
    
    const craftsmanClicks = allClicks.filter((click: any) => click.craftsmanId === craftsmanId);
    
    const stats = {
      phoneClicks: craftsmanClicks.filter((click: any) => click.type === 'phone').length,
      websiteClicks: craftsmanClicks.filter((click: any) => click.type === 'website').length,
      total: craftsmanClicks.length
    };
    
    return c.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all clicks (for admin stats dashboard)
app.get('/make-server-27acf415/all-clicks', async (c) => {
  try {
    const allClicks = await kv.getByPrefix('click:');
    return c.json({ success: true, data: allClicks });
  } catch (error) {
    console.error('Error fetching all clicks:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Initialize with sample data if empty
app.post('/make-server-27acf415/init', async (c) => {
  try {
    const existing = await kv.getByPrefix('craftsman:');
    
    if (existing.length > 0) {
      return c.json({ 
        success: false, 
        message: 'Database already initialized' 
      }, 400);
    }
    
    const sampleData = [
      {
        id: crypto.randomUUID(),
        companyName: 'Akut VVS Service ApS',
        address: 'Hovedgaden 123, 2100 København Ø',
        phone: '+45 12 34 56 78',
        hourlyRate: 850,
        website: 'https://www.akutvvs.dk',
        category: 'VVS'
      },
      {
        id: crypto.randomUUID(),
        companyName: 'Elektrikeren 24/7',
        address: 'Nørregade 45, 8000 Aarhus C',
        phone: '+45 23 45 67 89',
        hourlyRate: 950,
        website: 'https://www.elektrikeren247.dk',
        category: 'Elektriker'
      },
      {
        id: crypto.randomUUID(),
        companyName: 'Nødblik & Vindue',
        address: 'Vesterbrogade 78, 1620 København V',
        phone: '+45 34 56 78 90',
        hourlyRate: 750,
        website: 'https://www.noedblik.dk',
        category: 'Glarmester'
      }
    ];
    
    for (const craftsman of sampleData) {
      await kv.set(`craftsman:${craftsman.id}`, craftsman);
    }
    
    return c.json({ 
      success: true, 
      message: 'Database initialized with sample data',
      count: sampleData.length
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);