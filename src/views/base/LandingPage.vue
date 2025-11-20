<script setup>
import { ref, onMounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { 
  faBuilding, 
  faHandshake, 
  faShieldAlt, 
  faArrowRight, 
  faMapMarkerAlt, 
  faBed, 
  faBath, 
  faRulerCombined,
  faPhone,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

// Add icons to library
library.add(
  faBuilding, 
  faHandshake, 
  faShieldAlt, 
  faArrowRight, 
  faMapMarkerAlt, 
  faBed, 
  faBath, 
  faRulerCombined,
  faPhone,
  faEnvelope
);

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// Mock data for featured properties
const featuredProperties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$5,400,000",
    beds: 5,
    baths: 6,
    sqft: 4500,
    image: new URL('@/assets/images/house-1.jpg', import.meta.url).href,
    tag: "For Sale"
  },
  {
    id: 2,
    title: "Contemporary City Apartment",
    location: "New York, NY",
    price: "$2,100,000",
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: new URL('@/assets/images/house-2.jpg', import.meta.url).href,
    tag: "New Listing"
  },
  {
    id: 3,
    title: "Cozy Suburban Home",
    location: "Austin, TX",
    price: "$850,000",
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: new URL('@/assets/images/house-3.jpg', import.meta.url).href,
    tag: "Best Value"
  }
];

const features = [
  {
    icon: 'building',
    title: "Premium Listings",
    description: "Access exclusive properties not available on other platforms."
  },
  {
    icon: 'handshake',
    title: "Expert Guidance",
    description: "Our experienced agents guide you through every step of the process."
  },
  {
    icon: 'shield-alt',
    title: "Secure Transactions",
    description: "We ensure every transaction is safe, transparent, and legally sound."
  }
];
</script>

<template>
  <div class="font-sans text-slate-800">
    <!-- Navbar -->
    <nav :class="['fixed w-full z-50 transition-all duration-300', isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4']">
      <div class="container mx-auto px-6 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <!-- Logo -->
          <router-link :to="{ name: 'landing-page' }" class="text-2xl font-bold flex items-center gap-2">
             <span :class="isScrolled ? 'text-indigo-900' : 'text-white'">Brints</span>
             <span :class="['px-2 py-1 rounded text-sm font-semibold', isScrolled ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-900']">Estate</span>
          </router-link>
        </div>
        
        <div class="hidden md:flex items-center gap-8">
          <router-link :to="{ name: 'landing-page' }" :class="['font-medium hover:text-indigo-500 transition', isScrolled ? 'text-slate-600' : 'text-white']">Home</router-link>
          <router-link :to="{ name: 'about' }" :class="['font-medium hover:text-indigo-500 transition', isScrolled ? 'text-slate-600' : 'text-white']">About</router-link>
          <router-link :to="{ name: 'company' }" :class="['font-medium hover:text-indigo-500 transition', isScrolled ? 'text-slate-600' : 'text-white']">Company</router-link>
          <router-link :to="{ name: 'contact' }" :class="['font-medium hover:text-indigo-500 transition', isScrolled ? 'text-slate-600' : 'text-white']">Contact</router-link>
        </div>

        <div class="flex items-center gap-4">
           <router-link :to="{ name: 'login' }" :class="['font-medium hover:text-indigo-500 transition hidden md:block', isScrolled ? 'text-slate-600' : 'text-white']">Login</router-link>
           <router-link :to="{ name: 'signup' }" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition shadow-lg shadow-indigo-500/30">
             Get Started
           </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-900/90 z-10"></div>
        <img src="@/assets/images/building-design-4.jpg" alt="Luxury Building" class="w-full h-full object-cover object-center scale-105 animate-slow-zoom" />
      </div>

      <div class="container mx-auto px-6 relative z-20 text-center text-white mt-16">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          Find Your Dream <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Sanctuary</span>
        </h1>
        <p class="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-light">
          Discover a curated selection of the most exclusive properties in prime locations. Your journey to luxury living starts here.
        </p>
        
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <router-link :to="{ name: 'signup' }" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition transform hover:-translate-y-1 shadow-xl shadow-indigo-600/40 flex items-center justify-center gap-2">
            Explore Properties <font-awesome-icon icon="arrow-right" />
          </router-link>
          <router-link :to="{ name: 'contact' }" class="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg transition transform hover:-translate-y-1 flex items-center justify-center">
            Contact Agent
          </router-link>
        </div>
      </div>
      
      <!-- Scroll Down Indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div class="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div class="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </header>

    <!-- Features Section -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Why Choose Us</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2 text-slate-900">Redefining Real Estate</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-10">
          <div v-for="(feature, index) in features" :key="index" class="p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-xl transition-all duration-300 group">
            <div class="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <font-awesome-icon :icon="feature.icon" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-slate-900">{{ feature.title }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Properties -->
    <section class="py-24 bg-slate-50">
      <div class="container mx-auto px-6">
        <div class="flex justify-between items-end mb-12">
          <div>
            <span class="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Exclusive Offers</span>
            <h2 class="text-3xl md:text-4xl font-bold mt-2 text-slate-900">Featured Properties</h2>
          </div>
          <router-link :to="{ name: 'signup' }" class="hidden md:flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition">
            View All Properties <font-awesome-icon icon="arrow-right" />
          </router-link>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="property in featuredProperties" :key="property.id" class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer">
            <div class="relative h-64 overflow-hidden">
              <img :src="property.image" :alt="property.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {{ property.tag }}
              </div>
              <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{{ property.title }}</h3>
                  <p class="text-slate-500 text-sm flex items-center gap-1">
                    <font-awesome-icon icon="map-marker-alt" class="text-indigo-400" /> {{ property.location }}
                  </p>
                </div>
                <span class="text-xl font-bold text-indigo-600">{{ property.price }}</span>
              </div>
              
              <div class="flex justify-between border-t border-slate-100 pt-4 text-slate-500 text-sm">
                <span class="flex items-center gap-2"><font-awesome-icon icon="bed" /> {{ property.beds }} Beds</span>
                <span class="flex items-center gap-2"><font-awesome-icon icon="bath" /> {{ property.baths }} Baths</span>
                <span class="flex items-center gap-2"><font-awesome-icon icon="ruler-combined" /> {{ property.sqft }} sqft</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-10 text-center md:hidden">
          <router-link :to="{ name: 'signup' }" class="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition">
            View All Properties <font-awesome-icon icon="arrow-right" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-indigo-900">
        <div class="absolute inset-0 bg-[url('@/assets/images/building-design-1.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </div>
      
      <div class="container mx-auto px-6 relative z-10 text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Find Your Perfect Home?</h2>
        <p class="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
          Join thousands of satisfied homeowners who found their dream property with Brints Estate.
        </p>
        <router-link :to="{ name: 'signup' }" class="px-10 py-4 bg-white text-indigo-900 rounded-full font-bold text-lg transition hover:bg-indigo-50 shadow-xl">
          Get Started Today
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              Brints <span class="bg-indigo-600 text-white px-2 py-1 rounded text-sm">Estate</span>
            </div>
            <p class="text-slate-400 mb-6">
              Your trusted partner in finding the perfect property. We make real estate simple, transparent, and efficient.
            </p>
          </div>
          
          <div>
            <h4 class="text-white font-bold mb-6">Quick Links</h4>
            <ul class="space-y-3">
              <li><router-link :to="{ name: 'landing-page' }" class="hover:text-indigo-400 transition">Home</router-link></li>
              <li><router-link :to="{ name: 'about' }" class="hover:text-indigo-400 transition">About Us</router-link></li>
              <li><router-link :to="{ name: 'company' }" class="hover:text-indigo-400 transition">Company Profile</router-link></li>
              <li><router-link :to="{ name: 'contact' }" class="hover:text-indigo-400 transition">Contact Us</router-link></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-white font-bold mb-6">Services</h4>
            <ul class="space-y-3">
              <li><a href="#" class="hover:text-indigo-400 transition">Buy a Home</a></li>
              <li><a href="#" class="hover:text-indigo-400 transition">Sell a Home</a></li>
              <li><a href="#" class="hover:text-indigo-400 transition">Rent a Home</a></li>
              <li><a href="#" class="hover:text-indigo-400 transition">Property Management</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-white font-bold mb-6">Contact</h4>
            <ul class="space-y-3 text-slate-400">
              <li class="flex items-start gap-3">
                <font-awesome-icon icon="map-marker-alt" class="mt-1 text-indigo-500" />
                <span>123 Real Estate Blvd,<br>Beverly Hills, CA 90210</span>
              </li>
              <li class="flex items-center gap-3">
                <font-awesome-icon icon="phone" class="text-indigo-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li class="flex items-center gap-3">
                <font-awesome-icon icon="envelope" class="text-indigo-500" />
                <span>hello@brintsestate.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {{ new Date().getFullYear() }} Brints Estate. All rights reserved.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-white transition">Privacy Policy</a>
            <a href="#" class="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.animate-slow-zoom {
  animation: slowZoom 20s infinite alternate;
}

@keyframes slowZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
</style>
