import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  Upload, 
  Bell, 
  Stethoscope, 
  MessageSquare, 
  AlertCircle,
  Languages,
  FileText,
  Menu,
  X,
  User
} from 'lucide-react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { UploadPrescription } from './components/UploadPrescription';
import { Reminders } from './components/Reminders';
import { Symptoms } from './components/Symptoms';
import { Consultations } from './components/Consultations';
import { Chatbot } from './components/Chatbot';
import { Emergency } from './components/Emergency';
import { Language } from './components/Language';
import { Profile } from './components/Profile';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', icon: <Home className="w-5 h-5 text-purple-400" />, label: 'Home' },
    { path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5 text-blue-400" />, label: 'Dashboard' },
    { path: '/upload', icon: <Upload className="w-5 h-5 text-green-400" />, label: 'Upload Prescription' },
    { path: '/reminders', icon: <Bell className="w-5 h-5 text-yellow-400" />, label: 'Reminders' },
    { path: '/symptoms', icon: <FileText className="w-5 h-5 text-pink-400" />, label: 'Symptoms' },
    { path: '/consultations', icon: <Stethoscope className="w-5 h-5 text-red-400" />, label: 'Consultations' },
    { path: '/chatbot', icon: <MessageSquare className="w-5 h-5 text-cyan-400" />, label: 'AI Chatbot' },
    { path: '/emergency', icon: <AlertCircle className="w-5 h-5 text-orange-400" />, label: 'Emergency' },
    { path: '/language', icon: <Languages className="w-5 h-5 text-indigo-400" />, label: 'Language' },
    { path: '/profile', icon: <User className="w-5 h-5 text-purple-400" />, label: 'Profile' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <div className="min-h-screen bg-gray-900 text-white">
                  {/* Mobile Menu Button */}
                  <div className="lg:hidden fixed top-4 right-4 z-50">
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="p-2 text-white hover:bg-gray-700 rounded-lg"
                    >
                      {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                  </div>

                  {/* Sidebar Navigation */}
                  <nav className={`
                    fixed top-0 left-0 h-full w-64 bg-gray-800 transform transition-transform duration-200 ease-in-out z-40
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    overflow-y-auto
                  `}>
                    <div className="p-6 sticky top-0 bg-gray-800 z-10 border-b border-gray-700">
                      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        MediNest
                      </h1>
                    </div>
                    
                    <ul className="space-y-2 px-4 py-4">
                      {navItems.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Main Content */}
                  <main className={`
                    transition-all duration-200 ease-in-out
                    ${isMobileMenuOpen ? 'lg:ml-64' : 'lg:ml-64'}
                  `}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/upload" element={<UploadPrescription />} />
                      <Route path="/reminders" element={<Reminders />} />
                      <Route path="/symptoms" element={<Symptoms />} />
                      <Route path="/consultations" element={<Consultations />} />
                      <Route path="/chatbot" element={<Chatbot />} />
                      <Route path="/emergency" element={<Emergency />} />
                      <Route path="/language" element={<Language />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </main>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div className="max-w-4xl mx-auto pt-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Welcome to MediNest
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Your all-in-one healthcare companion for managing prescriptions, 
          tracking symptoms, and connecting with healthcare professionals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
          >
            Get Started
          </Link>
          <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
            Learn More
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {[
          {
            icon: <Upload className="w-8 h-8 text-green-400" />,
            title: "Upload Prescriptions",
            description: "Easily upload and manage your medical prescriptions"
          },
          {
            icon: <Stethoscope className="w-8 h-8 text-blue-400" />,
            title: "Book Consultations",
            description: "Connect with healthcare professionals online"
          },
          {
            icon: <Bell className="w-8 h-8 text-yellow-400" />,
            title: "Medication Reminders",
            description: "Never miss your medication with smart reminders"
          }
        ].map((feature, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;