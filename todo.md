# ACE Travel Frontend TODO

## Completed
- [x] Contact page with inquiry form
- [x] FAQ page with searchable questions
- [x] Reviews/testimonials page
- [x] Detailed tour pages (Thailand, Bali, Philippines)
- [x] Project upgraded to full-stack (web-db-user)
- [x] Fixed nested anchor tag errors

## In Progress
- [x] Create database schema for tours, deals, and content
- [ ] Build admin dashboard for content management
- [ ] Create tRPC procedures for CRUD operations
- [ ] Build admin UI for managing tours
- [ ] Build admin UI for managing deals
- [ ] Build admin UI for managing images
- [ ] Connect frontend to dynamic data from database
- [ ] Test admin functionality
- [ ] Save final checkpoint

## Gen Z Visual Redesign
- [x] Update typography to bold, playful style with text outlines/shadows
- [x] Add sticker-style graphics and badges throughout site
- [x] Implement vibrant color overlays and gradients
- [x] Add playful micro-animations (hover effects, scroll reveals)
- [x] Increase visual density with more images and graphics
- [x] Add fun UI elements (badges, stamps, hand-drawn accents)
- [x] Update hero sections with bold, outlined typography
- [x] Add animated elements without compromising performance

## Design Consistency Refinement
- [x] Fix shadow overlaps and awkward positioning
- [x] Unify all button styles with consistent shadows and animations
- [x] Ensure all interactive elements have hover effects
- [x] Polish visual hierarchy and spacing
- [x] Test all animations for smoothness

## Video Heroes and Design Cleanup
- [x] Remove heavy text shadows and borders for cleaner look
- [x] Add video hero to homepage
- [ ] Add video heroes to destination pages
- [ ] Add video section to individual tour pages
- [x] Optimize video loading for performance

## Destination Video Heroes
- [x] Add video hero to Thailand destination page
- [x] Add video hero to Bali destination page
- [x] Add video hero to Philippines destination page
- [x] Test video loading and autoplay on all destination pages

## Full-Width Video Hero Banners
- [x] Convert homepage hero to full-width video banner
- [x] Convert Destinations page hero to full-width video banner (already done)
- [x] Ensure SEO optimization (proper heading hierarchy, alt text, transcripts)
- [x] Test responsive behavior on mobile devices

## Mobile Responsive Fixes
- [x] Reduce hero heading font size for mobile (currently too large)
- [x] Improve spacing and padding on mobile hero section
- [x] Ensure all buttons fit properly on mobile screens
- [x] Test responsive design across different mobile screen sizes
- [x] Optimize video hero for mobile performance

## Text Readability Improvements
- [x] Fix colored text (Thailand, Bali, Philippines) readability against video background
- [x] Add stronger text shadows or outlines for better contrast
- [x] Ensure all hero text is clearly readable on both light and dark video frames
- [x] Test readability across different video playback moments

## Tours Page Nested Anchor Fix
- [x] Fix nested anchor tags on Tours page causing React errors
- [x] Ensure all tour cards and links render correctly without nested anchors

## Bali Photos (Island Hopper + Explorer)
- [x] Upload all 17 Bali photos to CDN (10 Island Hopper + 7 Explorer)
- [x] Update Bali tour page gallery with 17 real photos
- [ ] Replace stock Bali images across the site with authentic photos
- [ ] Update Bali destination card on homepage with real image

## Thailand North Wellness Photos
- [x] Upload 6 Thailand North photos to CDN
- [ ] Create Thailand North wellness/yoga retreat tour page
- [ ] Add Thailand North photos to gallery

## Tour Name Corrections
- [x] Rename "Bali Adventure" to "Bali Explorer"
- [x] Create "Thailand Intro" tour page with Thailand North wellness photos
- [x] Create "Bali Island Hopper" tour page
- [x] Update Tours page to show all 4 tours with correct names
- [x] Ensure tour routing matches new names

## Bali Explorer Highlights Section
- [x] Download 8 highlight images from Squarespace CDN
- [x] Upload highlight images to Manus CDN
- [x] Create highlights section component for tour detail pages
- [x] Add highlights to Bali Explorer tour with images and descriptions
- [x] Fix Bali Explorer price to £1,199
- [x] Update Bali Explorer itinerary to match current site (Canggu → Ubud → Nusa Lembongan → Uluwatu)

## Bali Explorer Itinerary Images
- [x] Add 4 itinerary location images to Bali Explorer tour (Canggu, Uluwatu, Ubud, Nusa Lembongan)
- [x] Update itinerary rendering to display images alongside descriptions

## Tour Detail Gallery Redesign
- [x] Create modern full-width slider showing 4 images on desktop, 1 on mobile
- [x] Add peek effect to show next image on mobile
- [x] Move gallery above "Ready for Adventure" section
- [x] Update "Ready for Adventure" to use single background image instead of grid

## Bali Explorer Route Map
- [x] Upload Bali Explorer route map to CDN
- [x] Add route map to tour page showing journey from Canggu to Ubud to Nusa Lembongan to Uluwatu

## Tour Reviews Section
- [x] Extract reviews from Bali Explorer page on current site
- [x] Add reviews section with star ratings to tour detail page
- [x] Create slider for reviews with horizontal scroll

## Fix Reviews Rendering Error
- [x] Fix React error where review objects are rendered directly instead of JSX
- [x] Ensure reviews map function returns proper JSX elements
- [x] Rename reviews array to reviewsList to avoid conflict with reviews count

## Remove Inaccurate ATOL & ABTA Text
- [x] Remove "ATOL & ABTA protected" text from tour detail page as it's not factual
- [x] Remove ATOL & ABTA references from Tours.tsx
- [x] Remove ATOL & ABTA references from About.tsx
- [x] Remove ATOL & ABTA references from FAQ.tsx
- [x] Remove ATOL & ABTA references from HowItWorks.tsx

## Tour Detail Page UI Fixes
- [x] Fix photo gallery slider not working (changed overflow-x-auto to overflow-x-scroll with touch scrolling)
- [x] Reduce intro text size (h2 from 4xl/5xl to 3xl/4xl, p from xl to lg)
- [x] Reduce review text size and make content snappier (reduced padding, text sizes, made reviews concise)
- [x] Make "View All Tours" button text white/visible (added text-white, border-white, hover:bg-white/10)

## Gallery Slider Improvements
- [x] Add mouse drag functionality to photo gallery
- [x] Add mobile swipe support to photo gallery (native touch scrolling)
- [x] Add left/right arrow buttons for gallery navigation
- [x] Ensure smooth scrolling with snap points

## Reviews Section Trustpilot Redesign
- [x] Remove emojis from review content
- [x] Change star color to Trustpilot green (#00B67A)
- [x] Add "5.0 Based on hundreds of reviews" header with Trustpilot styling
- [x] Add more reviews to slider (added Dean Garrity review, now 6 total)
- [x] Make reviews slider scrollable with native touch support
- [x] Use modern, professional card design with border-top separator

## Footer Margin Fix
- [x] Remove margin-top on footer when banner section (Ready for Adventure) exists

## Homepage Authentic Photos
- [x] Replace Thailand destination card image with authentic tour photo (sunrise gathering)
- [x] Replace Bali destination card image with authentic tour photo (Mount Batur sunrise)
- [x] Replace Philippines destination card image with authentic tour photo (Bali beach photo as placeholder)

## Homepage Hero Text Styling
- [x] Remove text shadow from hero heading and description
- [x] Improve text contrast with darker overlay (increased from 40% to 50%)
- [x] Ensure clean white text stands out against background

## Hero Headline and Destination Card Fixes
- [x] Update hero headline from "YOUR FIRST EPIC ADVENTURE" to "EPIC TRIPS. LIFELONG FRIENDS."
- [x] Fix white gaps at top and bottom of destination card images (added p-0 to Card, absolute positioning to img)
- [x] Ensure images fill the entire card properly with object-covers fill the entire card properly with object-cover

## Tour Hero Text Size Fix
- [x] Reduce tour description text size in hero section for better mobile readability (changed from text-xl/2xl to text-base/lg)
- [x] Ensure text is legible but not overwhelming on small screens

## Further Reduce Tour Description
- [x] Make tour description text even smaller for mobile (text-sm md:text-base)
- [x] Shorten Bali Explorer description content from 3 sentences to 2 for better mobile fit

## Reviews Section Updates
- [x] Change "Based on hundreds of reviews" to "Based on hundreds of traveller reviews"
- [x] Fix reviews slider not working on mobile (add touch scrolling)

## Mobile Book Now CTA
- [x] Add sticky "Book Now" button at bottom of screen on mobile
- [x] Hide sticky CTA on desktop (sidebar already has booking info)
- [x] Ensure CTA is always visible and accessible while scrolling

## Fix Reviews Slider Scrolling
- [x] Investigate why reviews slider is not scrolling horizontally
- [x] Ensure reviews cards are properly laid out for horizontal scroll
- [x] Test scrolling on both desktop and mobile
- [x] Add navigation arrows for desktop reviews slider

## Thailand Intro Tour Page
- [x] Build comprehensive Thailand Intro tour page with same layout as Bali Explorer
- [x] Add highlights section with images (Elephant sanctuary, Bangkok city tour, Pai sunsets, Tipsy tubing, Temple visits, Sticky waterfalls)
- [x] Add day-by-day itinerary (Days 1-3 Bangkok, Days 4-6 Chiang Mai, Days 7-9 Pai, Days 10-11 Chiang Mai, Days 12-13 Bangkok)
- [x] Add route map showing journey through Thailand
- [x] Add What's Included section (12 days accommodation, Experienced Ace Rep & Local Guide, Activities packages, Iconic viewpoints, Private WhatsApp group, Flight assistance, 14 meals)
- [x] Add 6 customer reviews in horizontal slider
- [x] Use stock images for any missing photos

## Update Thailand Intro Images
- [x] Replace sticky waterfalls image with user-provided turquoise waterfall photo
- [x] Replace route map with user-provided Thailand Intro map showing Bangkok → Chiang Mai → Pai

## Update ACE Logo
- [x] Replace text-based "ACE" logo with user-provided custom logo image
- [x] Update logo in header navigation
- [x] Update logo in footer
- [x] Ensure logo is responsive and displays correctly on all screen sizes

## Fix Thailand Intro Pricing and Duration
- [x] Update duration from 13 days to 12 days
- [x] Update price from £1,299 to £999
- [x] Update accommodation from "12 nights" to "11 nights" (12 days = 11 nights)
- [x] Update final itinerary day from "Days 12-13" to "Day 12"
- [x] Update description to say "12 days" instead of "13 days"

## Update Chiang Mai Itinerary Image
- [x] Replace Days 10-11 Chiang Mai itinerary image with Thai umbrella factory image

## Update Thailand Intro Hero Image
- [x] Replace hero/header image with Chiang Mai temple photo

## Update Day 12 Bangkok Image
- [x] Replace Day 12 Bangkok itinerary image with farewell dinner group photo

## Update Temple Visit Highlight Image
- [x] Replace Temple visits highlight image with group photo at ornate Thai temple
