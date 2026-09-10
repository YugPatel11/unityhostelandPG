const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  const hashedPassword = await bcrypt.hash('admin@123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'unityhostelandpg@gmail.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'unityhostelandpg@gmail.com',
      name: 'Unity Hostel Admin',
      password: hashedPassword,
      role: 'OWNER',
    },
  });

  console.log('Created/Updated Admin User:', user.email);
  console.log('Password: admin@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
