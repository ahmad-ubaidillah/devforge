/** @jsx jsx */
import { Hono } from 'hono';
import { jsx } from 'hono/jsx';
import { AdminDashboard } from '../views/AdminDashboard';

export const adminRoutes = new Hono();

adminRoutes.get('/', (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Dashboard | DevForge</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Inter', sans-serif; }
        `}</style>
      </head>
      <body>
        <AdminDashboard />
      </body>
    </html>
  );
});
