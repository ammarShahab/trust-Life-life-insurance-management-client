import React, { use } from "react";
import AuthContext from "../context/AuthContext/AuthContext";

const AboutUs = () => {
  const { theme } = use(AuthContext);
  return (
    <div
      className={`min-h-screen bg-yellow-50 font-sans text-gray-800 leading-relaxed ${
        theme ? "dark" : ""
      } dark:bg-zinc-400 dark:text-white`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8 ">
        <section className="bg-white dark:bg-zinc-500 p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
            About Trip Nest
          </h2>
          <p className="mb-4">
            Welcome to Trip Nest, your trusted companion in crafting
            unforgettable travel experiences. At Trip Nest, we believe that
            travel is more than just visiting new places—it’s about weaving
            stories, discovering cultures, and creating memories that last a
            lifetime. Our journey began with a simple idea: to make travel
            accessible, meaningful, and seamless for everyone, whether you’re a
            solo adventurer, a family seeking bonding moments, or a couple
            chasing romantic getaways.
          </p>
          <p className="mb-4">
            Founded in 2018 by a group of passionate globetrotters, Trip Nest
            has grown from a small startup to a thriving platform that connects
            travelers with destinations across the globe. Our team is driven by
            a shared love for exploration and a commitment to helping you find
            your perfect trip. We don’t just plan vacations; we curate
            experiences tailored to your dreams, preferences, and aspirations.
            From hidden gems in remote villages to iconic landmarks in bustling
            cities, we guide you every step of the way.
          </p>
          <p className="mb-4">
            At Trip Nest, we understand that every traveler is unique. That’s
            why we offer personalized itineraries, expert advice, and 24/7
            support to ensure your journey is as smooth as it is exciting. Our
            platform combines cutting-edge technology with human expertise,
            allowing us to recommend destinations, accommodations, and
            activities that align with your interests. Whether you’re craving a
            serene beach retreat, a thrilling mountain trek, or a cultural
            immersion in a vibrant city, Trip Nest is here to make it happen.
          </p>
          <p className="mb-4">
            Over the years, we’ve helped thousands of travelers turn their
            wanderlust into reality. From first-time explorers to seasoned
            nomads, our community of travelers inspires us to keep pushing the
            boundaries of what travel can be. We’re not just a travel
            company—we’re a movement dedicated to fostering connection,
            curiosity, and joy through the art of exploration.
          </p>
          <p className="mb-4">
            Our commitment goes beyond planning trips. We strive to promote
            sustainable tourism, support local communities, and preserve the
            natural beauty of the destinations we feature. By partnering with
            eco-friendly accommodations, local guides, and responsible tour
            operators, we ensure that your travels leave a positive impact on
            the world. At Trip Nest, we believe that travel should be a force
            for good, enriching both the traveler and the places they visit.
          </p>
          <p className="mb-4">
            Join us on this journey as we explore the world together, one trip
            at a time. Let Trip Nest be your guide to discovering the wonders of
            our planet, from the familiar to the far-flung. Your next adventure
            is just a click away, and we can’t wait to help you make it
            unforgettable.
          </p>
        </section>

        <section className="bg-white dark:bg-zinc-500 p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
            Our Story
          </h2>
          <p className="mb-4">
            The story of Trip Nest began in a small coffee shop in Seattle,
            where our founders—Emma, Raj, and Clara—shared tales of their
            travels over steaming cups of coffee. Emma had just returned from a
            solo trek through the Himalayas, Raj was raving about the street
            food in Bangkok, and Clara couldn’t stop talking about the vibrant
            festivals she’d experienced in Brazil. As they swapped stories, they
            realized something: planning those trips had been a hassle. From
            scouring unreliable websites to dealing with last-minute
            cancellations, the process of turning travel dreams into reality was
            often frustrating.
          </p>
          <p className="mb-4">
            That’s when the idea for Trip Nest was born. The trio envisioned a
            platform that would simplify travel planning while offering
            personalized recommendations and insider tips. They wanted to create
            a space where travelers could find inspiration, trust expert
            guidance, and connect with like-minded adventurers. With nothing but
            a laptop, a shared passion, and a lot of determination, they set out
            to build Trip Nest.
          </p>
          <p className="mb-4">
            In the early days, Trip Nest was a labor of love. The team worked
            out of a tiny apartment, designing the website, reaching out to
            local guides, and testing itineraries themselves. They traveled to
            destinations like Morocco, Iceland, and New Zealand to ensure their
            recommendations were authentic and reliable. By 2019, Trip Nest had
            launched its first version, offering curated trips to a handful of
            destinations. The response was overwhelming—travelers loved the
            personalized approach and the focus on unique experiences.
          </p>
          <p className="mb-4">
            Since then, Trip Nest has grown exponentially. We’ve expanded our
            offerings to include over 100 destinations, from the ancient ruins
            of Machu Picchu to the serene beaches of the Maldives. Our team has
            grown to include travel experts, tech innovators, and customer
            support specialists, all united by a love for exploration. We’ve
            also embraced technology, using AI-driven tools to match travelers
            with destinations that suit their preferences, while keeping the
            human touch that sets us apart.
          </p>
          <p className="mb-4">
            Despite our growth, we’ve stayed true to our roots. Trip Nest is
            still about creating meaningful connections—between travelers and
            destinations, between cultures, and between people. Every trip we
            plan is a chance to tell a new story, and we’re honored to be part
            of yours.
          </p>
        </section>

        <section className="bg-white dark:bg-zinc-500 p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
            Our Mission and Vision
          </h2>
          <p className="mb-4">
            Our mission at Trip Nest is to inspire and empower travelers to
            explore the world with confidence, curiosity, and care. We aim to
            make travel accessible to everyone, regardless of budget,
            experience, or background. By offering personalized planning, expert
            insights, and sustainable options, we help you discover destinations
            that resonate with your passions and values.
          </p>
          <p className="mb-4">
            Our vision is to redefine travel as a transformative experience that
            fosters understanding, connection, and respect for our planet. We
            envision a world where every journey enriches the traveler and the
            communities they visit. Through innovation, collaboration, and a
            commitment to sustainability, we’re working to make this vision a
            reality.
          </p>
          <p className="mb-4">
            To achieve our mission and vision, we focus on three core pillars:
          </p>
          <p className="mb-4">
            <strong>Personalization:</strong> We believe that no two travelers
            are alike. That’s why we tailor every trip to your interests,
            preferences, and needs. Whether you’re a foodie, an adrenaline
            junkie, or a history buff, we’ll craft an itinerary that feels
            uniquely yours.
          </p>
          <p className="mb-4">
            <strong>Sustainability:</strong> Travel has the power to change the
            world for the better. We partner with eco-conscious providers and
            promote practices that protect the environment and support local
            economies. From carbon-neutral tours to community-based homestays,
            we’re committed to responsible tourism.
          </p>
          <p className="mb-4">
            <strong>Community:</strong> Travel is about connection. We foster a
            global community of travelers who share stories, tips, and
            inspiration. Through our blog, social media, and events, we bring
            people together to celebrate the joy of exploration.
          </p>
          <p className="mb-4">
            These pillars guide everything we do, from the trips we plan to the
            partnerships we build. At Trip Nest, we’re not just helping you
            travel—we’re helping you make a difference.
          </p>
        </section>

        <section className="bg-white dark:bg-zinc-500 p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl  font-semibold text-gray-800 dark:text-white mb-4">
            Our Values
          </h2>
          <p className="mb-4">
            At Trip Nest, our values shape our culture and drive our decisions.
            They reflect who we are and what we stand for as a company. Here are
            the principles that guide us:
          </p>
          <p className="mb-4">
            <strong>Passion for Travel:</strong> We’re travelers at heart. Our
            love for exploring new places fuels our work, and we pour that
            passion into every trip we plan. Whether it’s a weekend getaway or a
            year-long adventure, we approach each journey with enthusiasm and
            care.
          </p>
          <p className="mb-4">
            <strong>Integrity:</strong> Trust is the foundation of our
            relationship with you. We’re transparent about pricing, honest about
            recommendations, and committed to delivering on our promises. You
            can count on us to put your needs first.
          </p>
          <p className="mb-4">
            <strong>Innovation:</strong> The travel industry is constantly
            evolving, and we’re at the forefront of change. We use technology to
            enhance your experience, from AI-powered trip suggestions to
            seamless booking systems. But we never lose sight of the human
            element that makes travel special.
          </p>
          <p className="mb-4">
            <strong>Diversity and Inclusion:</strong> Travel is for everyone. We
            celebrate diversity and strive to make our platform welcoming to
            travelers of all backgrounds, abilities, and identities. Our team
            reflects this commitment, bringing varied perspectives to our work.
          </p>
          <p className="mb-4">
            <strong>Responsibility:</strong> We take our impact seriously. We’re
            dedicated to minimizing our environmental footprint, supporting
            local communities, and promoting ethical travel practices. Every
            trip we plan is a step toward a more sustainable future.
          </p>
          <p className="mb-4">
            These values aren’t just words on a page—they’re the heartbeat of
            Trip Nest. They inspire us to keep improving, keep exploring, and
            keep making travel better for everyone.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
