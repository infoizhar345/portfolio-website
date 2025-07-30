import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import Navigation from './components/Navigation';
import Blog from './blog';
import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation as SwiperNavigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function HomePage() {
  // Utility function to convert video URLs to embeddable format
  const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    // YouTube URL handling
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
      return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
    }
    // Google Drive URL (already in /preview format)
    if (url.includes('drive.google.com')) {
      return url;
    }
    return null;
  };

  // Utility function to get thumbnail for project card
  const getThumbnailUrl = (project) => {
    if (project.images && project.images.length > 0) {
      return project.images[0]; // Use first image if available
    }
    if (project.video && (project.video.includes('youtube.com') || project.video.includes('youtu.be'))) {
      const videoIdMatch = project.video.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
      return videoIdMatch ? `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg` : '/src/assets/placeholder.jpg';
    }
    return '/src/assets/placeholder.jpg'; // Fallback placeholder
  };

  const projects = [
    {
      id: 1,
      title: "Animated Video - Dream Land",
      description: "Custom animated videos that bring your ideas to life with engaging visuals and smooth storytelling.",
      category: "Video Editing",
      subcategory: "Animation",
      tertiary: "Storytelling",
      images: [],
      video: "https://www.youtube.com/watch?v=VXkZO1MzvpY&t=13s",
      views: "2.1K",
      date: "Dec 2024",
      duration: "6 weeks",
      success: "85%"
    },
    {
      id: 2,
      title: "Talking Head - Ali Abdaal",
      description: "Professional talking head video editing with clean cuts, smooth transitions, and engaging pacing to keep your audience focused.",
      category: "Video Editing",
      subcategory: "Talking Head",
      tertiary: "YouTube",
      images: [],
      video: "https://youtu.be/kTiHjWm54Z8",
      views: "3.2K",
      date: "Nov 2024",
      duration: "8 weeks",
      success: "92%"
    },
    {
      id: 3,
      title: "YouTube Video Thumbnail Designing",
      description: "Eye-catching and scroll-stopping YouTube thumbnail designs to boost your video clicks and views.",
      category: "Graphics Designing",
      subcategory: "Thumbnails",
      tertiary: "YouTube",
      images: ["/src/assets/israel vs iran war.jpg", "/src/assets/Tom cruise net worth.jpg", "/src/assets/ai smart agent.png"],
      video: null,
      views: "5.7K",
      date: "Oct 2024",
      duration: "6 months",
      success: "96%"
    },
    {
      id: 4,
      title: "Animated Video - The Wondrous Toy Workshop",
      description: "Engaging animated videos that turn your ideas into visually compelling stories.",
      category: "Video Editing",
      subcategory: "Animation",
      tertiary: "Storytelling",
      images: [],
      video: "https://www.youtube.com/watch?v=NGpu1i6toLU&t=10s",
      views: "1.8K",
      date: "Sep 2024",
      duration: "4 weeks",
      success: "89%"
    },
    {
      id: 5,
      title: "Video Editing for Car Show",
      description: "Dynamic and high-energy video editing for car shows that captures every curve, roar, and thrill.",
      category: "Video Editing",
      subcategory: "Event",
      tertiary: "Automotive",
      images: [],
      video: "https://www.youtube.com/watch?v=B_yPRxWE6LE&t=9s",
      views: "2.9K",
      date: "Aug 2024",
      duration: "5 weeks",
      success: "91%"
    },
    {
      id: 6,
      title: "Business Card",
      description: "Modern and professional business card designs that leave a lasting first impression.",
      category: "Graphics Designing",
      subcategory: "Print",
      tertiary: "Branding",
      images: ["/src/assets/2.jpg", "/src/assets/3.jpg", "/src/assets/1.jpg"],
      video: null,
      views: "4.1K",
      date: "Jul 2024",
      duration: "10 weeks",
      success: "94%"
    },
    {
      id: 7,
      title: "Area 51 - Video Editing",
      description: "Cinematic video editing for Area 51 content with suspenseful pacing, dramatic effects, and mysterious vibes.",
      category: "Video Editing",
      subcategory: "Cinematic",
      tertiary: "Thematic",
      images: [],
      video: "https://youtu.be/EmrTMO_npPw",
      views: "4.1K",
      date: "Jul 2024",
      duration: "10 weeks",
      success: "94%"
    },
    {
      id: 8,
      title: "Real Estate",
      description: "Orchestrated successful product launch generating $100K+ in first month revenue.",
      category: "Video Editing",
      subcategory: "Promotional",
      tertiary: "Real Estate",
      images: [],
      video: "https://youtu.be/V5J8Cz1TlR4",
      views: "4.1K",
      date: "Jul 2024",
      duration: "10 weeks",
      success: "94%"
    },
    {
      id: 9,
      title: "Business Flyer Design",
      description: "Eye-catching business flyer designs that effectively promote your brand, services, or events.",
      category: "Graphics Designing",
      subcategory: "Print",
      tertiary: "Marketing",
      images: ["/src/assets/a.jpg", "/src/assets/b.jpg", "/src/assets/c.jpg"],
      video: null,
      views: "4.1K",
      date: "Jul 2024",
      duration: "10 weeks",
      success: "94%"
    }
  ];

  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Testimonials state
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const testimonials = [
    { name: "Sarah Johnson", role: "CEO, TechStart Inc.", message: "The strategic approach completely transformed our digital presence. We saw a 300% increase in qualified leads within the first quarter. Absolutely game-changing! 🚀", avatar: "SJ", category: "SaaS Growth Strategy", rating: 5 },
    { name: "Marcus Rodriguez", role: "Founder, E-commerce Pro", message: "Working with this team was like having a secret weapon. The content strategy alone generated over $500K in revenue. Best investment we've made! 💎", avatar: "MR", category: "Content Marketing", rating: 5 },
    { name: "Emily Chen", role: "Marketing Director, Brand Co.", message: "The social media growth was incredible. From 2K to 50K followers in 6 months, but more importantly - real engagement and actual customers! 🎯", avatar: "EC", category: "Social Media Strategy", rating: 5 },
    { name: "David Thompson", role: "Product Manager, InnovateLab", message: "The conversion optimization was mind-blowing. Our landing page went from 2% to 12% conversion rate. That's literally 6x more customers! 📈", avatar: "DT", category: "CRO Campaign", rating: 5 },
    { name: "Lisa Wang", role: "Startup Founder", message: "From zero to $100K in first month launch. The strategic planning and execution was flawless. This is what professional digital marketing looks like! ⭐", avatar: "LW", category: "Product Launch", rating: 5 },
    { name: "Alex Kumar", role: "CMO, Growth Ventures", message: "The ROI speaks for itself. Every dollar invested returned $15 in revenue. Strategic thinking combined with flawless execution = success! 🏆", avatar: "AK", category: "Full Strategy", rating: 5 }
  ];
  const visibleTestimonials = showAllTestimonials ? testimonials : testimonials.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-2xl text-muted-foreground hover:text-primary"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">{selectedProject.title}</h3>
            {selectedProject.video && getVideoEmbedUrl(selectedProject.video) ? (
              <div className="mb-4">
                <iframe
                  src={getVideoEmbedUrl(selectedProject.video)}
                  className="w-full aspect-[16/9] rounded-lg"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={`${selectedProject.title} video`}
                ></iframe>
              </div>
            ) : selectedProject.images && selectedProject.images.length > 0 ? (
              <div className="mb-4">
                <Swiper
                  modules={[SwiperNavigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="w-full rounded-lg aspect-[16/9]"
                >
                  {selectedProject.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`${selectedProject.title} ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <div className="mb-4 bg-muted text-center p-4 rounded-lg">
                No media available
              </div>
            )}
            <p className="text-muted-foreground mb-4">{selectedProject.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">{selectedProject.category}</span>
              {selectedProject.subcategory && (
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm">{selectedProject.subcategory}</span>
              )}
              {selectedProject.tertiary && (
                <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-sm">{selectedProject.tertiary}</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>📅</span>
              <span>{selectedProject.date} • {selectedProject.duration}</span>
              <div className="ml-auto bg-primary/20 text-primary px-2 py-1 rounded text-sm">
                {selectedProject.success}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="min-h-[80vh] sm:min-h-screen flex items-center section-padding relative overflow-hidden">
        <div className="absolute inset-0 chessboard-bg opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 spotlight pointer-events-none"></div>

        <div className="container-max relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
            <div className="col-span-1 col-start-1 row-start-1 space-y-3 sm:space-y-4 text-left lg:col-start-1">
              <div className="flex items-center justify-start gap-2 text-primary text-sm font-semibold">
                <span>⚡</span>
                <span>IZHAR ULLAH</span>
              </div>
              <h1 className="text-2xl sm:text-5xl lg:text-7xl font-bold leading-snug sm:leading-tight">
                Let's <span className="text-primary">Strategize</span><br />
                Your Visual<br />
                Success Online
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-[28rem]">
                Helping brands grow with smart design, video storytelling, and data-driven digital marketing.
              </p>
            </div>
            <div className="col-span-1 col-start-2 row-start-1 flex justify-end lg:col-start-2 lg:justify-center">
              <img
                src="/src/assets/grapic designer png.PNG"
                alt="Professional Portrait"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full max-w-[160px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-none lg:w-full object-contain drop-shadow-xl transition-transform duration-300 scale-150 sm:scale-110 lg:scale-125"
                style={{ zIndex: 10 }}
              />
            </div>
            <div className="col-span-2 row-start-2 lg:col-span-1 lg:row-auto lg:col-start-1 space-y-4 sm:space-y-5 mt-2">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
                <button
                  className="btn-primary btn-glow w-full sm:w-auto transition-transform duration-300 hover:scale-105"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Let's Connect
                </button>
                <button
                  className="bg-transparent border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold w-full sm:w-auto transition-transform duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View My Work
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 w-full max-w-none">
                <div className="text-center">
                  <div className="text-xl sm:text-3xl font-bold text-primary">100+</div>
                  <div className="text-[11px] sm:text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-3xl font-bold text-primary">50+</div>
                  <div className="text-[11px] sm:text-sm text-muted-foreground">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-3xl font-bold text-primary">4+</div>
                  <div className="text-[11px] sm:text-sm text-muted-foreground">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
          <div className="scroll-indicator w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding">
        <div className="container-max">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 text-primary text-sm font-semibold mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl">👁️</span>
              <span className="text-2xl sm:text-4xl font-bold">PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              My Work, <span className="text-primary">Their Growth</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto px-2">
              From strategy to execution, every project reflects a story of growth. See how design and data have powered success across industries.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleProjects.map((project) => (
              <div
                key={project.id}
                className="group card-hover bg-card rounded-lg overflow-hidden relative cursor-pointer"
                onClick={() => openModal(project)}
              >
                <div className="w-full aspect-[16/9] overflow-hidden relative">
                  <img
                    src={getThumbnailUrl(project)}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/70 text-white px-2 py-0.5 rounded text-[10px] sm:text-xs flex items-center gap-1">
                    <span>👁️</span>
                    <span>{project.views}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-2 sm:p-3">
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground mb-1">
                    <span>📅</span>
                    <span>{project.date} • {project.duration}</span>
                    <div className="ml-auto bg-primary/20 text-primary px-2 py-0.5 rounded text-[9px] sm:text-xs">
                      {project.success}
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold mb-1 truncate">{project.title}</h3>
                  <p className="text-muted-foreground mb-2 text-[10px] sm:text-xs line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-primary/20 text-primary px-1 py-0.5 rounded text-[9px] sm:text-xs">{project.category}</span>
                    {project.subcategory && (
                      <span className="bg-secondary text-secondary-foreground px-1 py-0.5 rounded text-[9px] sm:text-xs">{project.subcategory}</span>
                    )}
                    {project.tertiary && (
                      <span className="bg-muted text-muted-foreground px-1 py-0.5 rounded text-[9px] sm:text-xs">{project.tertiary}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button
              className="bg-primary/20 text-primary border border-primary px-5 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              {showAllProjects ? 'View Less' : 'View All Projects'}
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-padding bg-card">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-primary text-sm font-semibold mb-3">
              <span className="text-2xl sm:text-3xl">⚡</span>
              <span className="text-3xl sm:text-4xl font-bold">SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Your Goals, My Mission <span className="text-primary">You Achieve</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto px-2">
              Every chess master knows—victory comes from strategic thinking, precise execution, and staying three moves ahead of the competition.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-8">
            {[
              {
                icon: "🎯",
                title: "GRAPHICS DESIGNING",
                description: "I help businesses craft visual identities that don't just look good—but win markets.",
                features: ["Logo Design", "Thumbnail Design", "Flyers, Brochures, Posters", "Business Cards, Letterheads"]
              },
              {
                icon: "📈",
                title: "VIDEO EDITING",
                description: "Transform raw footage into high-converting videos that capture attention and drive action.",
                features: [
                  "Footage Curation & Story-Driven Editing",
                  "Sound Design, Music Syncing & Voice Balancing",
                  "Engaging Hooks, Captions & Motion Graphics for Maximum Retention",
                  "Dynamic Visual Effects & Smooth Transitions"
                ]
              },
            ].map((service, index) => (
              <div key={index} className="bg-background p-4 sm:p-8 rounded-lg card-hover relative overflow-hidden min-w-[140px]">
                <div className="absolute inset-0 chessboard-bg opacity-5"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-lg flex items-center justify-center text-2xl mb-5 sm:mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 {/* Testimonials */}
<section id="testimonials" className="section-padding">
  <div className="container-max">
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 text-primary text-sm font-semibold mb-3">
        <span>💬</span>
        <span>REAL RESULTS. REAL CLIENTS</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold mb-3">
        Proven Results <span className="text-primary">Trusted Clients</span>
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto px-2">
        Don’t just take my word for it — see what industry leaders have to say.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {visibleTestimonials.map((t, index) => (
        <div key={index} className="bg-card p-3 sm:p-6 rounded-lg card-hover min-w-[140px]">
          <div className="mb-3 sm:mb-4">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {t.category}
            </span>
            <div className="flex gap-1 mt-1">
              {[...Array(t.rating)].map((_, i) => (
                <span key={i} className="text-primary">⭐</span>
              ))}
            </div>
          </div>
          <blockquote className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 italic">
            "{t.message}"
          </blockquote>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">
                {t.avatar}
              </div>
              <div>
                <h4 className="text-sm sm:font-semibold">{t.name}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm sm:text-base text-primary font-bold">{t.metric || ''}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-6">
      <button
        className="bg-primary/20 text-primary border border-primary px-5 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        onClick={() => setShowAllTestimonials(!showAllTestimonials)}
      >
        {showAllTestimonials ? 'View Less' : 'View All'}
      </button>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-12 text-center">
      <div>
        <div className="text-2xl sm:text-3xl font-bold text-primary">98%</div>
        <div className="text-sm text-muted-foreground">Client Satisfaction</div>
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-bold text-primary">50+</div>
        <div className="text-sm text-muted-foreground">Success Stories</div>
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-bold text-primary">$2M+</div>
        <div className="text-sm text-muted-foreground">Revenue Generated</div>
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-bold text-primary">15x</div>
        <div className="text-sm text-muted-foreground">Average ROI</div>
      </div>
    </div>
  </div>
</section>

      {/* About */}
<section id="about" className="section-padding bg-card">
  <div className="container-max">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold">
        THE STRATEGIC MIND BEHIND <span className="text-primary">THE RESULTS</span>
      </h2>
    </div>
    <div className="grid grid-cols-2 gap-6 sm:gap-12 items-center">
      {/* Text Left */}
      <div className="col-span-1 col-start-1 row-start-1 space-y-6">
        {/* Name */}
        <h3 className="text-2xl font-bold text-primary mb-1">IZHAR ULLAH</h3>
        {/* Title */}
    <div className="text-sm sm:text-lg font-bold text-white mb-2">
  Graphics Designer and Video Editor
</div>
        {/* Paragraph */}
        <p className="text-muted-foreground mb-4">
          Every successful business needs a strategic advantage. I help you discover yours through data-driven insights, compelling content, and conversion-focused campaigns.
        </p>
        {/* Core Expertise */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold leading-tight">Core Expertise</h4>
          <div className="space-y-5">
            {[
              { skill: "Digital Strategy", level: 95 },
              { skill: "Content Marketing", level: 90 },
              { skill: "Social Media Growth", level: 88 }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span className="font-medium">{item.skill}</span>
                  <span className="text-primary">{item.level}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-1000"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Image Right */}
<div className="col-span-1 col-start-2 row-start-1 flex justify-end items-start">
  <img
    src="/src/assets/IZHAR ULLAH GRAPIC DESIGNER.png"
    alt="Izhar Ullah"
    className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[320px] object-contain transition-transform duration-300 scale-110 sm:scale-110 lg:scale-100 -mt-38 sm:-mt-6"
  />
</div>
    </div>
  </div>
</section>

 {/* Contact */}
<section id="contact" className="section-padding bg-gray-901 text-white">
  <div className="container-max text-center">
    <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
      Ready to Make Your <span className="text-primary">Strategic Move?</span>
    </h2>
    <p className="text-base sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto px-2">
      Stop playing defense in the digital marketplace. It's time to go on the offensive with strategies that deliver real, measurable results.
    </p>
    <div className="flex flex-row flex-wrap justify-center gap-6 mb-8 mt-10">
      {/* WhatsApp */}
      <a
        href="https://wa.me/923411673117"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center group"
      >
        <img
          src="/src/assets/Whatsapp 1.PNG"
          alt="WhatsApp"
          className="w-20 h-20 transform group-hover:scale-110 group-hover:shadow-[0_0_24px_8px_#ff9900] transition-all duration-300 ease-in-out hover:rotate-12"
        />
        <span className="mt-2 text-sm group-hover:text-primary transition-colors duration-300">WhatsApp</span>
      </a>
      {/* Email */}
      <a
        href="mailto:infoizhar345@gmail.com"
        className="flex flex-col items-center group"
      >
        <img
          src="/src/assets/email.png"
          alt="Email"
          className="w-20 h-20 transform group-hover:scale-110 group-hover:shadow-[0_0_24px_8px_#ff9900] transition-all duration-300 ease-in-out hover:rotate-12"
        />
        <span className="mt-2 text-sm group-hover:text-primary transition-colors duration-300">Email</span>
      </a>
      {/* LinkedIn */}
      <a
        href="https://linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center group"
      >
        <img
          src="/src/assets/social.png"
          alt="LinkedIn"
          className="w-20 h-20 transform group-hover:scale-110 group-hover:shadow-[0_0_24px_8px_#ff9900] transition-all duration-300 ease-in-out hover:rotate-12"
        />
        <span className="mt-2 text-sm group-hover:text-primary transition-colors duration-300">LinkedIn</span>
      </a>
      {/* Add more icons as needed */}
    </div>
    <button className="btn-primary btn-glow text-lg px-8 py-4">
      Let's Strategize Together
    </button>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-card py-8">
        <div className="container-max text-center">
          <p className="text-muted-foreground">
            © 2024 Izhar Ullah Portfolio. All rights reserved.
          </p>
        </div>
      </footer>

{/* Floating CTA */}
<div className="fixed bottom-4 right-4 z-50 lg:hidden">
  <button
    id="floating-cta-button"
    onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
    className="w-18 h-18 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-all duration-300"
  >
    📩
  </button>
</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;