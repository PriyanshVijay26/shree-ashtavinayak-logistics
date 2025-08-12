import { PrismaClient, UserRole } from '@prisma/client';
import { AuthUtils } from '../utils/auth';

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@shipsphere.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!existingAdmin) {
      const hashedPassword = await AuthUtils.hashPassword(adminPassword);
      
      const admin = await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          role: UserRole.ADMIN
        }
      });

      console.log('✅ Admin user created:', admin.email);
    } else {
      console.log('ℹ️  Admin user already exists:', existingAdmin.email);
    }

    // Create sample cities
    const sampleCities = [
      {
        name: 'Mumbai',
        state: 'Maharashtra',
        pricePerKg: 25.50,
        description: 'Financial capital of India'
      },
      {
        name: 'Delhi',
        state: 'Delhi',
        pricePerKg: 28.00,
        description: 'Capital city of India'
      },
      {
        name: 'Bangalore',
        state: 'Karnataka',
        pricePerKg: 22.75,
        description: 'IT hub of India'
      },
      {
        name: 'Chennai',
        state: 'Tamil Nadu',
        pricePerKg: 24.25,
        description: 'Gateway to South India'
      },
      {
        name: 'Kolkata',
        state: 'West Bengal',
        pricePerKg: 23.50,
        description: 'Cultural capital of India'
      },
      {
        name: 'Hyderabad',
        state: 'Telangana',
        pricePerKg: 21.00,
        description: 'City of Nizams'
      },
      {
        name: 'Pune',
        state: 'Maharashtra',
        pricePerKg: 26.75,
        description: 'Oxford of the East'
      },
      {
        name: 'Ahmedabad',
        state: 'Gujarat',
        pricePerKg: 20.50,
        description: 'Commercial hub of Gujarat'
      },
      {
        name: 'Jaipur',
        state: 'Rajasthan',
        pricePerKg: 19.25,
        description: 'Pink city of India'
      },
      {
        name: 'Surat',
        state: 'Gujarat',
        pricePerKg: 18.75,
        description: 'Diamond city of India'
      }
    ];

    for (const cityData of sampleCities) {
      const existingCity = await prisma.city.findUnique({
        where: { name: cityData.name }
      });

      if (!existingCity) {
        const city = await prisma.city.create({
          data: cityData
        });
        console.log(`✅ Created city: ${city.name}, ${city.state} - ₹${city.pricePerKg}/kg`);
      } else {
        console.log(`ℹ️  City already exists: ${existingCity.name}`);
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`👤 Admin Email: ${adminEmail}`);
    console.log(`🔑 Admin Password: ${adminPassword}`);
    console.log(`🏙️  Cities available: ${sampleCities.length}`);
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seed()
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });