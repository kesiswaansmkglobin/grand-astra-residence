export interface Property {
  id: string;
  slug: string;
  title: string;
  type: string;
  price: number;
  landArea: number;
  buildingArea: number;
  bedrooms: number;
  bathrooms: number;
  carport: number;
  electricity: number;
  waterSupply: string;
  description: string;
  features: string[];
  images: string[];
  floorPlan?: string;
  status: "available" | "sold" | "reserved";
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  review: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface NearbyPlace {
  name: string;
  category: string;
  distance: string;
  travelTime: string;
  icon: string;
}

export interface BookingForm {
  fullName: string;
  phone: string;
  email: string;
  preferredType: string;
  budget: number;
  surveyDate: string;
  notes?: string;
}

export interface ContactForm {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}
