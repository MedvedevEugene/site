import { PrismaClient } from "@prisma/client";
import { IMAGES } from "../lib/site-data";

const prisma = new PrismaClient();

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

async function main() {
  const now = new Date();
  const monday = new Date(now);
  const day = monday.getDay();
  monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(10, 0, 0, 0);

  await prisma.event.deleteMany();
  await prisma.newsPost.deleteMany();
  await prisma.tariff.deleteMany();
  await prisma.mediaItem.deleteMany();
  await prisma.specialist.deleteMany();

  await prisma.event.createMany({
    data: [
      {
        title: "Расстановочная группа",
        description: "Групповая работа с личными запросами",
        startAt: addDays(monday, 2),
        endAt: addDays(addDays(monday, 2), 0),
        instructor: "А. Быковская",
        format: "online",
        eventType: "group",
      },
      {
        title: "Мастер-курс — модуль 6",
        description: "Базовый модуль обучения",
        startAt: new Date(addDays(monday, 2).setHours(17, 0, 0, 0)),
        endAt: new Date(addDays(monday, 2).setHours(20, 0, 0, 0)),
        instructor: "С. Елистратова",
        format: "offline",
        eventType: "course",
      },
      {
        title: "Терапевтическая группа",
        description: "Онлайн-встреча",
        startAt: addDays(monday, 4),
        endAt: new Date(addDays(monday, 4).setHours(12, 0, 0, 0)),
        instructor: "Е. Скулоченко",
        format: "online",
        eventType: "group",
      },
      {
        title: "Индивидуальные консультации",
        startAt: addDays(monday, 5),
        endAt: new Date(addDays(monday, 5).setHours(18, 0, 0, 0)),
        format: "online",
        eventType: "consultation",
      },
    ],
  });

  await prisma.tariff.createMany({
    data: [
      {
        title: "Диагностическая сессия 30 мин.",
        description: "познакомиться с форматом, сформулировать запрос и понять следующий шаг",
        price: "бесплатно / от 0 ₽",
        ctaText: "ЗАПИСАТЬСЯ",
        iconUrl: IMAGES.price1,
        group: "consultations",
        sortOrder: 0,
      },
      {
        title: "Разовая консультация до 2ч.",
        description: "глубже разобрать ситуацию, получить ясность и рекомендации",
        price: "от 5 000 ₽",
        ctaText: "ЗАПИСАТЬСЯ",
        iconUrl: IMAGES.price2,
        group: "consultations",
        sortOrder: 1,
      },
      {
        title: "Пакет 10 сессий",
        description: "для последовательной работы и устойчивых изменений",
        price: "от 40 000 ₽",
        ctaText: "ЗАПИСАТЬСЯ",
        iconUrl: IMAGES.price3,
        group: "consultations",
        sortOrder: 2,
      },
      {
        title: "Сопровождение после пакета",
        description: "поддержка после основной работы",
        ctaText: "УЗНАТЬ БОЛЬШЕ",
        iconUrl: IMAGES.price4,
        group: "consultations",
        sortOrder: 3,
        outline: true,
      },
    ],
  });

  await prisma.newsPost.create({
    data: {
      title: "Как выбрать формат работы с психологом",
      slug: "kak-vybrat-format",
      excerpt: "Разбираем, чем отличается диагностика, разовая консультация и серия встреч.",
      content: "Полный текст статьи...",
      imageUrl: IMAGES.resonance2,
      publishedAt: new Date(),
    },
  });

  await prisma.mediaItem.createMany({
    data: [
      { key: "hero-portrait", label: "Hero — портрет", url: IMAGES.heroPortrait },
      { key: "consult-hero", label: "Консультации — hero", url: IMAGES.consultHero },
      { key: "quiz-cover", label: "Квиз — фон", url: IMAGES.quizCover },
      { key: "diploma", label: "Диплом", url: IMAGES.diploma },
    ],
  });

  await prisma.specialist.createMany({
    data: [
      {
        slug: "asya-bykovskaya",
        name: "Ася Быковская",
        role: "Руководитель института, преподаватель, расстановщик, терапевт",
        photoUrl: "https://static.tildacdn.com/tild3962-6236-4536-a463-663630633963/8B7A2059_1.png",
        bio: "Руководитель института. Ведёт обучение расстановкам и личную практику.",
        services: ["Обучение расстановкам", "Психологическое консультирование", "Телесные практики"],
        sortOrder: 0,
      },
      {
        slug: "ekaterina-skulochenko",
        name: "Екатерина Скулоченко",
        role: "Заместитель телесного направления, расстановщик, терапевт",
        photoUrl: "https://static.tildacdn.com/tild6363-3539-4761-a332-386339353837/telegram-cloud-photo.png",
        bio: "Специалист телесного направления, расстановщик и терапевт.",
        services: ["Телесно-ориентированная терапия", "Психологическое консультирование"],
        sortOrder: 1,
      },
      {
        slug: "svetlana-elistratova",
        name: "Светлана Елистратова",
        role: "Заместитель учебной части, преподаватель, расстановщик, терапевт",
        photoUrl: "https://static.tildacdn.com/tild3039-3963-4365-b732-613738356331/image_31.png",
        bio: "Преподаватель базового курса, расстановщик.",
        services: ["Обучение расстановкам", "Психологическое консультирование"],
        sortOrder: 2,
      },
      {
        slug: "regina-karimulina",
        name: "Регина Каримулина",
        role: "Расстановщик, преподаватель, терапевт",
        photoUrl: "https://static.tildacdn.com/tild3465-3034-4232-b531-666636393961/c_1.jpg",
        bio: "Расстановщик и терапевт института.",
        services: ["Системная семейная терапия", "Расстановки"],
        sortOrder: 3,
      },
      {
        slug: "tamara-ralkova",
        name: "Тамара Ралькова",
        role: "Расстановщик, преподаватель, терапевт",
        photoUrl: "https://static.tildacdn.com/tild3465-3034-4232-b531-666636393961/c_1.jpg",
        bio: "Расстановщик и терапевт института.",
        services: ["Расстановки", "Психологическое консультирование"],
        sortOrder: 4,
      },
    ],
  });

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
