import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { EnquiryModal } from './components/common/EnquiryModal';
import { WhatsAppFloatingBtn } from './components/common/WhatsAppFloatingBtn';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { IntelligencePage } from './pages/IntelligencePage';
import { AcademyPage } from './pages/AcademyPage';
import { BusinessSolutionsPage } from './pages/BusinessSolutionsPage';
import { AiWorkforcePage } from './pages/AiWorkforcePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function AppContent() {
  const [modalState, setModalState] = useState({ isOpen: false, initialIntent: 'General Advisory' });

  const handleOpenEnquiry = (initialIntent = 'General Advisory') => {
    setModalState({ isOpen: true, initialIntent });
  };

  const handleCloseEnquiry = () => {
    setModalState({ isOpen: false, initialIntent: 'General Advisory' });
  };

  return (
    <div className="app-wrapper">
      <ScrollToTop />
      
      {/* Global Navigation with Official Logo */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Route Views */}
      <main>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage onOpenEnquiry={handleOpenEnquiry} />} />

          {/* About */}
          <Route path="/about" element={<AboutPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/about/our-story" element={<AboutPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/about/approach" element={<AboutPage onOpenEnquiry={handleOpenEnquiry} />} />

          {/* Services */}
          <Route path="/services" element={<ServicesPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/services/:slug" element={<ServicesPage onOpenEnquiry={handleOpenEnquiry} />} />

          {/* Intelligence */}
          <Route path="/intelligence" element={<IntelligencePage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/intelligence/:subpage" element={<IntelligencePage onOpenEnquiry={handleOpenEnquiry} />} />

          {/* Academy */}
          <Route path="/academy" element={<AcademyPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/academy/:subpage" element={<AcademyPage onOpenEnquiry={handleOpenEnquiry} />} />

          {/* Business Solutions */}
          <Route path="/business" element={<BusinessSolutionsPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/business/:slug" element={<BusinessSolutionsPage onOpenEnquiry={handleOpenEnquiry} />} />

          {/* AI Workforce */}
          <Route path="/ai" element={<AiWorkforcePage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/ai/:slug" element={<AiWorkforcePage onOpenEnquiry={handleOpenEnquiry} />} />

          {/* Projects (Trichy) */}
          <Route path="/projects" element={<ProjectsPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/projects/:slug" element={<ProjectsPage onOpenEnquiry={handleOpenEnquiry} />} />

          {/* Resources */}
          <Route path="/resources" element={<ResourcesPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/resources/:slug" element={<ResourcesPage onOpenEnquiry={handleOpenEnquiry} />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Control Center (Hostinger Native) */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Fallback to Home */}
          <Route path="*" element={<HomePage onOpenEnquiry={handleOpenEnquiry} />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button (+91 97876 00006) */}
      <WhatsAppFloatingBtn />

      {/* Global Enquiry Modal */}
      <EnquiryModal 
        isOpen={modalState.isOpen}
        onClose={handleCloseEnquiry}
        initialIntent={modalState.initialIntent}
      />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
