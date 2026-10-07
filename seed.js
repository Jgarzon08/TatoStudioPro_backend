import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './src/models/user.models.js';
import Service from './src/models/service.models.js';
import Portfolio from './src/models/portafolio.models.js';

dotenv.config();

async function runSeed() {
  try {
    console.log('Conectando a MongoDB Atlas...');
    await mongoose.connect(process.env.URI_MONGO);
    console.log('Conexión exitosa.');

    // 1. Crear o actualizar usuario Administrador por defecto
    const adminEmail = 'admin@tatostudio.com';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('TatoStudio2026*', salt);
      admin = new User({
        name: 'Administrador Tato Studio',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      await admin.save();
      console.log('✔ Usuario administrador creado: admin@tatostudio.com / TatoStudio2026*');
    } else {
      console.log('ℹ El usuario administrador ya existe.');
    }

    // 2. Insertar los 3 servicios iniciales si no existen
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      const initialServices = [
        {
          title: 'Fotografía de Productos',
          category: 'Comercial & Gastronomía',
          description:
            'Creación de contenido visual de alta gama para marcas, catálogos, restaurantes y e-commerce. Iluminación calculada y dirección de arte orientada a destacar texturas, colores y valor de marca.',
          price: 450000,
          features: [
            'Fotografía de menú y platos de alta cocina',
            'Bodegones publicitarios y e-commerce',
            'Sesiones en estudio o exteriores con estilismo visual',
            'Edición minuciosa y entrega en máxima resolución',
          ],
          isActive: true,
        },
        {
          title: 'Fotografía de Eventos Sociales',
          category: 'Bodas & Celebraciones',
          description:
            'Bodas íntimas, aniversarios y momentos que merecen ser recordados para siempre. Un estilo documental y espontáneo que captura la emoción genuina sin poses forzadas.',
          price: 1200000,
          features: [
            'Cobertura fotográfica completa de la celebración',
            'Sesiones pre-boda y retratos familiares espontáneos',
            'Enfoque en luz natural y narrativa emotiva',
            'Galería digital privada para descarga y selección',
          ],
          isActive: true,
        },
        {
          title: 'Plataforma 360',
          category: 'Experiencia Interactiva',
          description:
            'Una experiencia interactiva y memorable para eventos corporativos, bodas y fiestas. Videos en cámara lenta de 360 grados con efectos visuales dinámicos para compartir al instante en redes sociales.',
          price: 800000,
          features: [
            'Estructura giratoria con iluminación LED profesional',
            'Grabación en video HD con música y plantillas personalizadas',
            'Descarga inmediata para invitados mediante código QR',
            'Operador profesional presente durante todo el evento',
          ],
          isActive: true,
        },
      ];

      await Service.insertMany(initialServices);
      console.log('✔ 3 Servicios fotográficos iniciales creados en MongoDB.');
    } else {
      console.log(`ℹ Ya existen ${servicesCount} servicios en la base de datos.`);
    }

    // 3. Insertar fotos iniciales en Portafolio si está vacío
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0) {
      const initialPortfolio = [
        {
          title: 'Retrato Conceptual y Arte',
          imageUrl: 'assets/artes1.jpeg',
          category: 'arte',
          tags: ['editorial', 'arte', 'danza'],
          isFeatured: true,
        },
        {
          title: 'Celebración de Boda',
          imageUrl: 'assets/boda1.jpg',
          category: 'wedding',
          tags: ['boda', 'novios', 'amor'],
          isFeatured: true,
        },
        {
          title: 'Experiencia Gastronómica',
          imageUrl: 'assets/rest1.jpeg',
          category: 'restaurantes',
          tags: ['restaurante', 'gastronomía', 'platos'],
          isFeatured: true,
        },
      ];

      await Portfolio.insertMany(initialPortfolio);
      console.log('✔ Fotografías iniciales registradas en Portafolio.');
    } else {
      console.log(`ℹ Ya existen ${portfolioCount} fotografías en el portafolio.`);
    }

    console.log('Seeding completado con éxito.');
    process.exit(0);
  } catch (err) {
    console.error('Error durante el seed:', err);
    process.exit(1);
  }
}

runSeed();
