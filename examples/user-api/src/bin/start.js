import app from '../server.js';

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 POST /api/users - Create a new user`);
  console.log(`\nValidation:`);
  console.log(`  • email: must be valid email format`);
  console.log(`  • name: must be 1-100 characters`);
  console.log(`  • password: must be 8+ characters with at least 1 number`);
});

process.on('SIGINT', () => {
  console.log('\n⛔ Shutting down...');
  server.close(() => {
    process.exit(0);
  });
});
