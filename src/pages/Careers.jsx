import React from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  Heart,
  Lightbulb,
  Mail,
  Monitor,
  Pencil,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import CareersPost from "../components/CareersList";
import Seo from "../components/Seo";
import "./Careers.css";

const values = [
  { title: "Excellence", description: "We raise the bar and strive for the highest quality in everything we do.", icon: Sparkles },
  { title: "Integrity", description: "We do what’s right, openly and honestly.", icon: ShieldCheck },
  { title: "Innovation", description: "We embrace new ideas, new technologies and new ways to solve problems.", icon: Lightbulb },
  { title: "Artistry", description: "We bring creativity and craft to everything we build.", icon: Pencil },
];

const hiringSteps = [
  { number: "01", title: "Apply", description: "Submit your application for the role you’re interested in.", icon: FileText },
  { number: "02", title: "Initial Discussion", description: "A quick conversation to understand your background and interests.", icon: Workflow },
  { number: "03", title: "Interview", description: "Meet the team and showcase your skills.", icon: Users },
  { number: "04", title: "Offer & Onboarding", description: "Get your offer and start your journey with us.", icon: Mail },
];

const benefits = [
  { title: "Flexible Work Options", icon: Monitor },
  { title: "Career Growth Opportunities", icon: Workflow },
  { title: "Creative Environment", icon: Lightbulb },
  { title: "Learning & Development", icon: BookOpen },
  { title: "Collaborative Team", icon: Users },
  { title: "Real Client Impact", icon: Target },
  { title: "Modern Tools & Technology", icon: BriefcaseBusiness },
  { title: "Work-Life Balance", icon: Heart },
];

const policies = [
  { title: "Code of Conduct", description: "Our principles for a respectful workplace.", icon: FileText },
  { title: "Equal Opportunity", description: "We hire and promote based on merit.", icon: ShieldCheck },
  { title: "Data & Privacy", description: "Your information is always protected.", icon: BriefcaseBusiness },
  { title: "Anti-Harassment", description: "We maintain a safe and inclusive environment.", icon: Users },
];

export const Careers = () => (
  <main className="careers-page">
    <Seo
      title="SocialBureau Careers | Join India’s Fastest-Growing Creative & Digital Agency"
      description="Explore exciting career opportunities at SocialBureau. Join our team of designers, marketers, developers, and creators shaping the future of digital experiences."
      keywords="socialbureau careers, trillionedition llp jobs, api marketing jobs, digital marketing career, seo expert jobs india, creative agency hiring, video editor hiring, content writer jobs, performance marketing openings, join socialbureau"
      image="/assets/socialbureau.png"
      url="https://www.socialbureau.in/careers"
      canonicalUrl="https://www.socialbureau.in/careers"
    />

    <section className="careers-hero">
      <div className="careers-container">
        <div className="careers-hero-grid">
          <div className="careers-hero-copy">
            <p className="careers-eyebrow">Careers at SocialBureau</p>
            <h1>
              Build Ideas
              <br />
              Move Brands
              <br />
              Create <span>Impact</span>
            </h1>
            <p className="careers-hero-description">
              Join a team of marketers, creators, technologists and strategists
              building the next generation of performance marketing solutions.
            </p>
            <div className="careers-hero-actions">
              <a className="careers-button careers-button-primary" href="#opportunities">
                Explore Opportunities <ArrowRight size={16} />
              </a>
              <a
                className="careers-button careers-button-outline"
                href="https://www.linkedin.com/company/socialbureau-in"
                target="_blank"
                rel="noreferrer"
              >
                <span className="careers-play">▶</span> Life at SocialBureau
              </a>
            </div>
          </div>

          <div className="careers-hero-art" aria-hidden="true">
            <div className="careers-orbit careers-orbit-one" />
            <div className="careers-orbit careers-orbit-two" />
            <p className="careers-art-words">People<br />Ideas<br />Technology<br />Performance</p>
            <div className="careers-slash" />
            <p className="careers-art-caption">Same Team.<br />Bigger<br />Possibilities.</p>
            <div className="careers-dot-field" />
          </div>
        </div>
      </div>
    </section>

    <section className="careers-values">
      <div className="careers-container careers-values-layout">
        <div className="careers-values-intro">
          <p className="careers-eyebrow">Our Values</p>
          <h2>Principles<br />of Distinction</h2>
          <p>These values guide how we work, collaborate and create impact for our clients and communities.</p>
        </div>
        <div className="careers-values-grid">
          {values.map(({ title, description, icon }) => (
            <article className="careers-value-card" key={title}>
              {React.createElement(icon, { size: 28, strokeWidth: 1.5 })}
              <h3>{title}</h3>
              <span className="careers-red-rule" />
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <CareersPost />

    <section className="careers-process">
      <div className="careers-container">
        <p className="careers-eyebrow">Our Hiring Process</p>
        <h2>Your Journey With Us</h2>
        <p className="careers-section-lead">A simple and transparent process to help you join our team.</p>
        <div className="careers-process-grid">
          {hiringSteps.map(({ number, title, description, icon }, index) => (
            <article className="careers-process-step" key={number}>
              <div className="careers-step-icon">{React.createElement(icon, { size: 24 })}</div>
              <div className="careers-step-copy">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              {index < hiringSteps.length - 1 && <ArrowRight className="careers-step-arrow" size={18} />}
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="careers-why">
      <div className="careers-container careers-why-layout">
        <div className="careers-why-intro">
          <p className="careers-eyebrow">Why SocialBureau</p>
          <h2>More Than<br />Just a Job</h2>
          <p>We believe great work happens when people feel supported, inspired and empowered.</p>
          <a className="careers-button careers-button-primary" href="#opportunities">
            Join Our Team <ArrowRight size={16} />
          </a>
        </div>
        <div className="careers-benefits-grid">
          {benefits.map(({ title, icon }) => (
            <div className="careers-benefit" key={title}>
              {React.createElement(icon, { size: 27, strokeWidth: 1.8 })}
              <span>{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="careers-policy">
      <div className="careers-container careers-policy-layout">
        <div className="careers-policy-intro">
          <p className="careers-eyebrow">Our Commitment</p>
          <h2>Company Policy</h2>
          <p>We’re committed to maintaining a respectful, inclusive and compliant workplace for everyone.</p>
        </div>
        <div className="careers-policy-grid">
          {policies.map(({ title, description, icon }) => (
            <article className="careers-policy-card" key={title}>
              {React.createElement(icon, { size: 19 })}
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="careers-closing">
      <div className="careers-container">
        <p className="careers-eyebrow">Ready to Make an Impact?</p>
        <h2>Let’s Build <span>What’s Next.</span></h2>
        <p>If you’re passionate about marketing, technology and creativity,<br className="desktop-break" /> we’d love to hear from you.</p>
        <a className="careers-button careers-button-primary" href="#opportunities">
          Explore Opportunities <ArrowDown size={16} />
        </a>
      </div>
    </section>
  </main>
);
