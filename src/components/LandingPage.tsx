import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  GraduationCap, 
  Building2, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Star,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  Clock,
  Target,
  Award,
  Globe,
  UserCheck,
  Briefcase,
  Calendar,
  FileText,
  Search,
  BarChart3,
  User,
  Sparkles
} from 'lucide-react';
import type { User, UserRole } from '../App';

interface LandingPageProps {
  onLogin: (user: User) => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '' as UserRole,
    college: '',
    course: '',
    batch: ''
  });

  const handleGetStarted = () => {
    setShowLoginModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) return;

    const user: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      college: formData.college || undefined,
      course: formData.course || undefined,
      batch: formData.batch || undefined
    };

    onLogin(user);
    setShowLoginModal(false);
  };

  const handleQuickLogin = (role: UserRole, name: string) => {
    const user: User = {
      id: role,
      name,
      email: `${role}@example.com`,
      role,
      college: role === 'student' ? 'Sample University' : undefined,
      course: role === 'student' ? 'Computer Science' : undefined,
      batch: role === 'student' ? '2025' : undefined
    };
    onLogin(user);
    setShowLoginModal(false);
  };

  const stats = [
    { number: '50,000+', label: 'Students Placed', icon: GraduationCap },
    { number: '500+', label: 'Partner Companies', icon: Building2 },
    { number: '200+', label: 'Colleges Connected', icon: Users },
    { number: '95%', label: 'Success Rate', icon: TrendingUp }
  ];

  const features = [
    {
      icon: Search,
      title: 'Smart Job Matching',
      description: 'AI-powered matching system that connects students with relevant opportunities based on their skills and preferences.'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant notifications about new job postings, application deadlines, and placement updates.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security ensuring your data and applications are safe and confidential.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics for TPOs and admins to track placement trends and success metrics.'
    },
    {
      icon: UserCheck,
      title: 'Easy Application Process',
      description: 'One-click application system that streamlines the entire placement process for students.'
    },
    {
      icon: Target,
      title: 'Targeted Opportunities',
      description: 'Filter and find opportunities that match your course, location, and salary expectations.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at TechCorp',
      college: 'IIT Delhi',
      content: 'CampusDrives made my job search incredibly easy. I found my dream job within weeks of using the platform. The interface is intuitive and the opportunities are high-quality.',
      rating: 5
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'TPO at Engineering College',
      college: 'NIT Warangal',
      content: 'As a TPO, this platform has revolutionized how we manage campus placements. The admin panel is comprehensive and the company response has been excellent.',
      rating: 5
    },
    {
      name: 'Ankit Patel',
      role: 'Data Analyst at DataSoft Inc',
      college: 'VIT Vellore',
      content: 'The real-time notifications and easy application process helped me stay on top of all opportunities. I received multiple offers through this platform.',
      rating: 5
    },
    {
      name: 'Ms. Meera Singh',
      role: 'Placement Head',
      college: 'BITS Pilani',
      content: 'CampusDrives has significantly improved our placement statistics. The platform is user-friendly for both students and administrators.',
      rating: 5
    }
  ];

  const teamMembers = [
    {
      name: 'Arjun Malhotra',
      role: 'Founder & CEO',
      description: 'Former placement coordinator with 15+ years in education technology.'
    },
    {
      name: 'Sneha Gupta',
      role: 'CTO',
      description: 'Tech veteran with experience at leading startups and fortune 500 companies.'
    },
    {
      name: 'Vikram Joshi',
      role: 'Head of Partnerships',
      description: 'Expert in corporate relations with 500+ company partnerships.'
    }
  ];

  const demoUsers = [
    { role: 'student' as UserRole, name: 'John Student', icon: GraduationCap, color: 'bg-blue-50 border-blue-200 hover:bg-blue-100', iconColor: 'text-blue-600' },
    { role: 'tpo' as UserRole, name: 'Jane TPO', icon: UserCheck, color: 'bg-green-50 border-green-200 hover:bg-green-100', iconColor: 'text-green-600' },
    { role: 'admin' as UserRole, name: 'Admin User', icon: Shield, color: 'bg-purple-50 border-purple-200 hover:bg-purple-100', iconColor: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-custom">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-custom">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-primary">CampusDrives</h1>
                <p className="text-xs text-muted-foreground">Campus Placement Portal</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
              <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
              <a href="#testimonials" className="text-sm hover:text-primary transition-colors">Testimonials</a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
            </nav>
            
            <Button onClick={handleGetStarted} className="gradient-primary text-white">
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
              <Award className="h-3 w-3 mr-1" />
              India's Leading Campus Placement Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Streamline Campus Placements Like Never Before
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect students, colleges, and companies on one powerful platform. 
              Make campus recruitment efficient, transparent, and successful for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted} className="gradient-primary text-white h-12 px-8">
                Start Your Journey
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8">
                <Globe className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 h-20 w-20 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-10 h-32 w-32 bg-purple-100 rounded-full opacity-50"></div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-custom-lg">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              <Briefcase className="h-3 w-3 mr-1" />
              What We Do
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Everyone</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to serve students, TPOs, and companies with specialized tools and features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-custom-lg hover:shadow-custom-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple steps to get started</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Register & Create Profile',
                  description: 'Students, TPOs, and companies create their profiles with relevant information.',
                  icon: UserCheck
                },
                {
                  step: '2',
                  title: 'Post & Browse Opportunities',
                  description: 'Companies post job requirements while students browse and filter relevant opportunities.',
                  icon: FileText
                },
                {
                  step: '3',
                  title: 'Apply & Get Hired',
                  description: 'Students apply with one click, companies review applications, and successful placements happen.',
                  icon: CheckCircle
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-custom-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100">
              <Star className="h-3 w-3 mr-1" />
              Testimonials
            </Badge>
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Hear from students, TPOs, and companies who have found success with our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-custom-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                      <p className="text-xs text-muted-foreground">{testimonial.college}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">About CampusDrives</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Founded in 2020, CampusDrives was born from the vision of making campus placements 
                more efficient and transparent. We understand the challenges faced by students, 
                colleges, and companies in the traditional placement process.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground mb-6">
                  To bridge the gap between talented students and leading companies by providing 
                  a seamless, efficient, and transparent platform for campus placements.
                </p>
                
                <div className="space-y-3">
                  {[
                    'Connecting 50,000+ students with opportunities',
                    'Partnering with 500+ companies nationwide',
                    'Supporting 200+ educational institutions',
                    'Maintaining 95% placement success rate'
                  ].map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="h-6 w-6 text-blue-600" />
                    <h4 className="font-semibold">Our Vision</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    To become India's most trusted campus placement platform, 
                    empowering every student to find their dream career.
                  </p>
                </div>
                
                <div className="p-6 rounded-xl bg-green-50 border border-green-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="h-6 w-6 text-green-600" />
                    <h4 className="font-semibold">Our Values</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Transparency, efficiency, innovation, and student success 
                    are at the core of everything we do.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Team */}
            <div>
              <h3 className="text-2xl font-semibold text-center mb-8">Meet Our Team</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="text-center border-0 shadow-custom">
                    <CardHeader>
                      <div className="h-20 w-20 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center text-white text-xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{member.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl text-muted-foreground">
                Have questions? We're here to help you succeed.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-muted-foreground">support@campusdrives.com</p>
                      <p className="text-muted-foreground">partnerships@campusdrives.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                      <p className="text-muted-foreground">+91 98765 43211 (Partnership)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Address</h4>
                      <p className="text-muted-foreground">
                        Tower A, Tech Park<br />
                        Sector 18, Gurugram<br />
                        Haryana 122015, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="border-0 shadow-custom-lg">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    We'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input className="w-full p-3 border border-border rounded-lg bg-background" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input className="w-full p-3 border border-border rounded-lg bg-background" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" className="w-full p-3 border border-border rounded-lg bg-background" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input className="w-full p-3 border border-border rounded-lg bg-background" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea rows={4} className="w-full p-3 border border-border rounded-lg bg-background resize-none"></textarea>
                  </div>
                  
                  <Button className="w-full gradient-primary text-white">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">CampusDrives</h3>
                  <p className="text-xs text-gray-400">Campus Placement Portal</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Streamlining campus placements for students, colleges, and companies across India.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">For Students</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For TPOs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Companies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-800" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 CampusDrives. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-custom">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Welcome to CampusDrives</DialogTitle>
                <p className="text-sm text-muted-foreground">Your gateway to campus placement opportunities</p>
              </div>
            </div>
          </DialogHeader>
          
          <Tabs defaultValue="demo" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="demo" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Quick Demo
              </TabsTrigger>
              <TabsTrigger value="login" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Sign In
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="demo" className="space-y-4">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Experience the platform with demo accounts
              </p>
              <div className="space-y-3">
                {demoUsers.map(({ role, name, icon: Icon, color, iconColor }) => (
                  <Button 
                    key={role}
                    variant="outline" 
                    className={`w-full h-14 ${color} transition-all duration-200`}
                    onClick={() => handleQuickLogin(role, name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg bg-white flex items-center justify-center ${iconColor}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{name}</div>
                        <div className="text-xs text-muted-foreground capitalize">{role} Dashboard</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="h-11"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="h-11"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as UserRole }))}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="tpo">TPO (Training & Placement Officer)</SelectItem>
                      <SelectItem value="admin">Admin (Placement Head)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.role === 'student' && (
                  <div className="space-y-4 pt-2 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="college">College/University</Label>
                      <Input
                        id="college"
                        value={formData.college}
                        onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                        className="h-11"
                        placeholder="e.g., Indian Institute of Technology"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input
                          id="course"
                          value={formData.course}
                          onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                          className="h-11"
                          placeholder="e.g., B.Tech CSE"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="batch">Batch Year</Label>
                        <Input
                          id="batch"
                          value={formData.batch}
                          onChange={(e) => setFormData(prev => ({ ...prev, batch: e.target.value }))}
                          className="h-11"
                          placeholder="e.g., 2025"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <Button type="submit" className="w-full h-11 gradient-primary text-white mt-6">
                  Sign In
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}