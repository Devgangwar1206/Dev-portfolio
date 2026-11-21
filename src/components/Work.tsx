import { useState, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowOutward, MdChevronLeft, MdChevronRight } from "react-icons/md";

const projects = [
  {
    number: "01",
    title: "BookLoop",
    category: "Online Book Marketplace",
    tools: "Next.js, Spring Boot, PostgreSQL, Spring Security, JWT, Google OAuth 2.0, WebSocket, STOMP",
    bullets: [
      "Full-stack marketplace for listing, browsing, purchasing, and reviewing books.",
      "Secure authentication using Spring Security, JWT, and Google OAuth 2.0 with Bravo API password recovery.",
      "Real-time buyer-seller instant messaging using WebSocket & STOMP with Spring Boot.",
      "Admin moderation features to inspect reports, verify sellers, and moderate listings.",
    ],
    liveDemo: "https://bookloop-frontend-psi.vercel.app/",
    github: "https://github.com/Devgangwar1206/Bookloop-backend",
    image: "/images/bookloop.png",
  },
  {
    number: "02",
    title: "Royal Spice",
    category: "Restaurant Booking & Management Platform",
    tools: "React.js, Spring Boot, Spring Security, JPA/Hibernate, PostgreSQL, REST APIs, Redis, Gmail SMTP",
    bullets: [
      "Built a full-stack restaurant platform enabling users to book tables, check live availability, browse menus, add food to cart, and pre-order meals through ",
      "Robust Spring Boot REST APIs using DTO validation, JPA/Hibernate, and PostgreSQL.",
      "Implemented 5-minute temporary table holds using Redis with automatic expiry, real-time availability checks, and Razorpay payment integration for online transactions.",
      "Integrated Gmail SMTP service for reservation confirmations and customer enquiries.",
    ],
    liveDemo: "https://royal-spice-frontend.vercel.app/",
    github: "https://github.com/Devgangwar1206/Booking-Restaurent",
    image: "/images/royalspice.png",
  },
  {
    number: "03",
    title: "iNexarum Web App",
    category: "Full Stack Internship Platform",
    tools: "Java, Spring Boot, React.js, PostgreSQL, REST APIs, Git, Agile",
    bullets: [
      "Contributed to frontend and backend development of web applications during a 6-month internship.",
      "Engineered resilient Spring Boot endpoints and integrated them with responsive React components.",
      "Collaborated with senior engineers on application architecture, code reviews, and SQL optimizations.",
      "Maintained structured version control workflows via Git in a collaborative team setting.",
    ],
    liveDemo: "https://github.com",
    github: "https://github.com",
    image: "/images/placeholder.webp",
  },
  {
    number: "04",
    title: "Core Java & Backend Lab",
    category: "Microservices & Concurrent Systems",
    tools: "Core Java (OOP, Streams, Multithreading), Spring Security, MySQL, Docker, Postman",
    bullets: [
      "Advanced Java implementations utilizing OOP design patterns, Collections Framework, and Streams API.",
      "Concurrent multithreaded processing for high-volume background data processing tasks.",
      "Role-Based Access Control (RBAC), JWT token lifecycle management, and relational database tuning.",
    ],
    liveDemo: "https://github.com",
    github: "https://github.com",
    image: "/images/placeholder.webp",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextProject();
      } else {
        prevProject();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-controls">
            <button
              className="carousel-btn"
              onClick={prevProject}
              aria-label="Previous project"
              data-cursor="disable"
            >
              <MdChevronLeft />
            </button>
            <div className="carousel-counter">
              <span>{projects[currentIndex].number}</span> / 0{projects.length}
            </div>
            <button
              className="carousel-btn"
              onClick={nextProject}
              aria-label="Next project"
              data-cursor="disable"
            >
              <MdChevronRight />
            </button>
          </div>
        </div>

        <div
          className="work-carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="work-carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {projects.map((project, index) => (
              <div className="work-carousel-slide" key={index}>
                <div className="work-box">
                  <div className="work-info">
                    <div className="work-title">
                      <h3>{project.number}</h3>
                      <div>
                        <h4>{project.title}</h4>
                        <p>{project.category}</p>
                      </div>
                    </div>

                    <h4>Tools & Technologies</h4>
                    <p className="work-tools">{project.tools}</p>

                    <ul className="work-bullets">
                      {project.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>

                    <div className="work-links">
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="work-btn"
                        data-cursor="disable"
                      >
                        Live Demo <MdArrowOutward />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="work-btn"
                        data-cursor="disable"
                      >
                        GitHub <MdArrowOutward />
                      </a>
                    </div>
                  </div>

                  <WorkImage
                    image={project.image}
                    alt={project.title}
                    link={project.github}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots-container">
          {projects.map((project, index) => (
            <button
              key={index}
              className={`carousel-dot-btn ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              data-cursor="disable"
            >
              <span className="dot-number">{project.number}</span>
              <span className="dot-title">{project.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
