import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mail, MessageSquare, Send, MapPin, Clock, Phone, 
  Twitter, Github, Globe, Linkedin, CheckCircle, AlertCircle,
  User, AtSign, FileText, Zap, Shield, TrendingUp, Users
} from 'lucide-react';

const RevealOnScroll = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <div ref={ref}>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const GlassCard = ({ children, className = "", glow = false, glowColor = "#00ffff" }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className={`relative bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 ${className}`}
    style={{
      boxShadow: glow ? `0 0 40px ${glowColor}40, inset 0 0 30px rgba(0, 0, 0, 0.5)` : '0 20px 60px rgba(0, 0, 0, 0.5)'
    }}
  >
    {children}
    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl" />
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400/40 rounded-br-2xl" />
  </motion.div>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@inception.game',
      description: 'Send us an email anytime',
      color: '#00ffff',
      link: 'mailto:hello@inception.game'
    },
    {
      icon: MessageSquare,
      title: 'Discord',
      value: 'Join our server',
      description: '24/7 community support',
      color: '#5865F2',
      link: '#'
    },
    {
      icon: Twitter,
      title: 'Twitter',
      value: '@InceptionGame',
      description: 'Follow us for updates',
      color: '#1DA1F2',
      link: '#'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'inception-game',
      description: 'Check out our code',
      color: '#39ff14',
      link: '#'
    }
  ];

  const offices = [
    {
      location: 'Gurugram',
      address: 'xxxxx',
      timezone: 'PST (UTC-8)',
      color: '#00ffff'
    },
    {
      location: 'Delhi',
      address: 'xxxxxx',
      timezone: 'SGT (UTC+8)',
      color: '#ff00ff'
    },
    {
      location:  ' Janakpuri',
      address: 'xxxxx',
      timezone: 'GMT (UTC+0)',
      color: '#39ff14'
    }
  ];

  const faqs = [
    { question: 'Response time?', answer: 'Within 24 hours' },
    { question: 'Partnership inquiries?', answer: 'partnerships@inception.game' },
    { question: 'Bug reports?', answer: 'Use GitHub issues' },
    { question: 'Press inquiries?', answer: 'press@inception.game' }
  ];

  const reasons = [
    { icon: Zap, label: 'Quick Responses', color: '#fbbf24' },
    { icon: Shield, label: 'Secure Communication', color: '#10b981' },
    { icon: Users, label: 'Dedicated Support', color: '#8b5cf6' },
    { icon: TrendingUp, label: '99% Satisfaction', color: '#ec4899' }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 -z-10" />
      <div 
        className="fixed inset-0 opacity-[0.02] -z-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #00ffff22 0 2px, transparent 2px 40px), repeating-linear-gradient(0deg, #ff00ff22 0 2px, transparent 2px 40px)',
        }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 rounded-full -z-10"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            background: ['#00ffff', '#ff00ff', '#39ff14'][i % 3]
          }}
          animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
        />
      ))}

      <div className="relative z-10 p-8 max-w-[1600px] mx-auto">
        {/* Hero Section */}
        <RevealOnScroll>
          <div className="text-center mb-16 pt-12">
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Mail className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <h1 
              className="text-6xl md:text-7xl font-orbitron font-black mb-6"
              style={{
                background: 'linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              GET IN TOUCH
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </RevealOnScroll>

        {/* Why Contact Us */}
        <RevealOnScroll delay={0.2}>
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {reasons.map((reason, idx) => (
              <GlassCard key={idx} glow glowColor={reason.color}>
                <div className="text-center">
                  <reason.icon className="w-12 h-12 mx-auto mb-3" style={{ color: reason.color }} />
                  <div className="font-bold text-white">{reason.label}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <RevealOnScroll delay={0.3}>
              <GlassCard glow glowColor="#00ffff">
                <h2 className="text-3xl font-orbitron font-bold mb-6 text-white flex items-center gap-3">
                  <Send className="w-8 h-8 text-cyan-400" />
                  Send us a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
                    <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Subject</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help?"
                        className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 font-orbitron font-bold text-white flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ boxShadow: '0 10px 40px rgba(0, 255, 255, 0.4)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-green-500/20 border border-green-500/50 flex items-center gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <span className="text-green-400 font-bold">Message sent successfully! We'll get back to you soon.</span>
                    </motion.div>
                  )}
                </form>
              </GlassCard>
            </RevealOnScroll>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <RevealOnScroll delay={0.4}>
              <GlassCard>
                <h3 className="text-xl font-bold text-white mb-6">Other Ways to Reach Us</h3>
                <div className="space-y-4">
                  {contactMethods.map((method, idx) => (
                    <motion.a
                      key={idx}
                      href={method.link}
                      whileHover={{ x: 5 }}
                      className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: `${method.color}20`, border: `1px solid ${method.color}40` }}
                        >
                          <method.icon className="w-6 h-6" style={{ color: method.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {method.title}
                          </div>
                          <div className="text-sm" style={{ color: method.color }}>{method.value}</div>
                          <div className="text-xs text-gray-500">{method.description}</div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </GlassCard>
            </RevealOnScroll>

            {/* Quick FAQs */}
            <RevealOnScroll delay={0.5}>
              <GlassCard className="bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <h3 className="text-xl font-bold text-white mb-4">Quick Answers</h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-sm font-bold text-cyan-400 mb-1">{faq.question}</div>
                      <div className="text-xs text-gray-400">{faq.answer}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </RevealOnScroll>

            {/* Office Hours */}
            <RevealOnScroll delay={0.6}>
              <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-green-400" />
                  Support Hours
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-bold text-white">9am - 6pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-bold text-white">10am - 4pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-bold text-red-400">Closed</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 text-sm text-cyan-400">
                    Emergency support available 24/7 via Discord
                  </div>
                </div>
              </GlassCard>
            </RevealOnScroll>
          </div>
        </div>

        {/* Offices */}
        <RevealOnScroll delay={0.7}>
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-white">
            Our Offices
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office, idx) => (
              <GlassCard key={idx} glow glowColor={office.color}>
                <MapPin className="w-12 h-12 mb-4" style={{ color: office.color }} />
                <h3 className="text-2xl font-bold text-white mb-2">{office.location}</h3>
                <p className="text-gray-400 mb-2">{office.address}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500">{office.timezone}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>

        {/* Social Links Banner */}
        <RevealOnScroll delay={0.8}>
          <GlassCard className="mt-16 text-center" glow glowColor="#ff00ff">
            <h3 className="text-2xl font-bold text-white mb-6">Follow Us on Social Media</h3>
            <div className="flex justify-center gap-4">
              {[
                { icon: Twitter, color: '#1DA1F2', label: 'Twitter' },
                { icon: Github, color: '#39ff14', label: 'GitHub' },
                { icon: MessageSquare, color: '#5865F2', label: 'Discord' },
                { icon: Linkedin, color: '#0A66C2', label: 'LinkedIn' },
                { icon: Globe, color: '#00ffff', label: 'Website' }
              ].map((social, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 rounded-xl border-2 flex items-center justify-center"
                  style={{ borderColor: social.color }}
                  title={social.label}
                >
                  <social.icon className="w-7 h-7" style={{ color: social.color }} />
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </RevealOnScroll>
      </div>
    </div>
  );
}
