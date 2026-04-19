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
- [x] Build admin dashboard for content management
- [x] Create tRPC procedures for CRUD operations
- [x] Build admin UI for managing tours
- [x] Build admin UI for managing deals
- [x] Build admin UI for managing images
- [x] Connect frontend to dynamic data from database
- [x] Test admin functionality
- [x] Save final checkpoint

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

## Fix Thailand Intro Itinerary Details
- [x] Update itinerary with correct detailed day-by-day information from user
- [x] Ensure all breakfast inclusions are mentioned
- [x] Add optional extras (Khatok Dinner, Hot Springs & Nam Lod Cave)
- [x] Update Day 11 to mention Thai cooking class instead of generic exploration
- [x] Update Day 10 to mention umbrella factory and silk factory stops

## Format Itinerary Day Descriptions
- [x] Add line breaks between Day 1, Day 2, Day 3 etc. in itinerary descriptions
- [x] Make each day clearly separated for better readability

## Fix Itinerary Line Breaks Rendering
- [x] Change description rendering to properly display line breaks (use white-space: pre-line CSS or split into paragraphs)
- [x] Ensure each day appears as a separate paragraph visually

## Style Itinerary Day Labels
- [x] Make day labels (Day 1:, Day 2:, Day 3:, etc.) bold and pink for better visual hierarchy
- [x] Apply styling across all tour pages
- [x] Test readability and visual impact

## Update Bangkok City Tour Image
- [x] Replace Bangkok city tour highlight image with longtail boat photo showing Wat Arun

## Adjust Tipsy Tubing Image Crop
- [x] Modify tipsy tubing highlight image to show more of the bottom (river/tubing action) and less sky
- [x] Use CSS object-position to adjust vertical alignment

## Update Chiang Mai Days 10-11 Itinerary Image
- [x] Replace umbrella factory image with authentic Thai cooking class group photo

## Remove Duplicate Photo Gallery
- [x] Remove photo gallery section that duplicates images from highlights/itinerary

## Update Booking Links
- [x] Update all "Book Now" buttons to link to https://booking.acetravelexperiences.com/book/
- [x] Update header Book Now button (desktop and mobile)
- [x] Update tour detail page Book Now buttons (sidebar and mobile sticky)
- [x] Homepage and Tours page don't have Book Now buttons (verified)
- [ ] Update tour detail page Book Now buttons (sidebar and mobile sticky)
- [ ] Update homepage Book Now buttons
- [ ] Update Tours page Book Now buttons

## Add Accommodation Section
- [x] Create accommodation section with image slider showing hostel photos
- [x] Write description about carefully selected hostels for comfort and social atmosphere
- [x] Add horizontal scrolling image gallery with 4-6 hostel photos
- [x] Position section after What's Included/Not Included

## Add Speak to a Rep Contact Option
- [x] Add "Speak to a Rep" button/section in Ready for Adventure area at bottom
- [x] Include phone number: +44 7450 996 347
- [x] Add messaging about questions and personal assistance before booking

## Add Accommodation Section
- [x] Create accommodation section with image slider showing hostel photos
- [x] Write description about carefully selected hostels for comfort and social atmosphere
- [x] Add horizontal scrolling image gallery with 4-6 hostel photos
- [x] Position section after What's Included/Not Included

## Add Speak to a Travel Expert Contact Option
- [x] Add "Speak to a Travel Expert" button/section in Ready for Adventure area at bottom
- [x] Include phone number: +44 7450 996 347
- [x] Add messaging about questions and personal assistance before booking

## Add Trust Signals to Tour Pages
- [x] Add Trustpilot-style trust badge in header/hero area
- [x] Include "Trusted by 500+ travelers" messaging
- [x] Add star rating display (5 stars)
- [x] Position prominently for social proof and conversion optimization
- [x] Link trust badge to Trustpilot page (https://uk.trustpilot.com/review/www.acetravelexperiences.com)

## Update Trust Badge to Trustpilot Format
- [x] Change trust badge design to show 4.9 rating score prominently
- [x] Add "Excellent" text below rating
- [x] Show 5 green Trustpilot stars in horizontal bar
- [x] Match classic Trustpilot badge styling

## Add Available Departure Dates Section
- [x] Create "Choose Your Dates" section showing multiple departure dates
- [x] Display date, available spots, and price for each departure
- [x] Add Book Now button for each date option
- [x] Position section prominently on tour detail pages
- [x] Add sample dates to tour data structure (will be made editable via admin later)
- [x] Use single-column centered layout that works well with 1-8 dates

## Add Cross-Sell to Longer Tours
- [x] Add "Want to go for longer?" section on Thailand Intro linking to Thailand Island Hopper (21 days)
- [x] Position after departure dates section
- [x] Include tour image, duration, and key highlights
- [x] Add clear call-to-action button with "View Tour" link
- [x] Show price (£1,899) and 21 Days badge
- [x] List 4 key highlights with checkmarks

## Reduce Trust Badge Size
- [x] Make trust badge more compact and subtle
- [x] Reduce font sizes (4.9 rating from text-5xl to text-2xl, text from text-sm to text-xs)
- [x] Reduce padding and spacing (px-6 py-4 to px-3 py-2)
- [x] Reduce star size (w-5 h-5 to w-3 h-3)
- [x] Ensure it doesn't dominate the hero section
- [x] Reposition trust badge to the right edge of hero section
- [x] Hide on mobile (hidden md:block) to avoid layout issues

## Add FAQ Accordion Section
- [x] Create FAQ accordion component using shadcn/ui Accordion
- [x] Add 8 comprehensive FAQ questions with accurate ACE policies
- [x] Update FAQ content to match existing website policies (£60 deposit, 30-day balance, cancellation terms)
- [x] Position FAQ section before "Ready for Your Adventure" on tour pages
- [x] Ensure accordion is accessible with keyboard navigation
- [ ] Add common questions: Can I join solo?, What's the cancellation policy?, Is travel insurance required?, Do I need a visa?, What's included in the price?, How do payments work?, What's the group dynamic like?, Can I extend my trip?
- [ ] Position FAQ section before "Ready for Your Adventure" section
- [ ] Write clear, friendly answers that reduce booking friction
- [ ] Ensure accordion is fully accessible with keyboard navigation

## Create Destination Overview Pages for SEO
- [x] Create Thailand destination page at /destinations/thailand
- [x] Create Bali destination page at /destinations/bali
- [x] Create Philippines destination page at /destinations/philippines
- [ ] Add destination-specific FAQs (weather, safety, currency, best time to visit)
- [ ] Include "Why Visit [Country]" section with key attractions
- [ ] Display all available tours for each destination
- [ ] Add hero section with destination imagery
- [ ] Implement breadcrumb navigation
- [ ] Add internal linking between destination and tour pages
- [ ] Update main navigation to include Destinations dropdown
- [ ] Optimize meta titles and descriptions for SEO
- [ ] Add schema markup for destination FAQs

## Complete All Tour Detail Pages
- [x] Apply all enhancements to Bali Explorer (accommodation, Trustpilot badge, departure dates, Travel Expert contact, FAQ)
- [ ] Build Thailand Island Hopper tour page with full details
- [x] Build Bali Island Hopper tour page with full details
- [ ] Build Philippines Paradise tour page with full details
- [ ] Ensure all tours have consistent layout and sections
- [ ] Test all tour pages for errors and broken links

## Update Bali Explorer Departure Dates
- [ ] Change dates to 13th-26th June 2026 and 31st Jul-13th Aug 2026
- [ ] Update format to show "14 Days - £1199"
- [ ] Add "Summer Holiday Friendly!" badge to July departure

## Create Lead Capture Form for Tours Without Dates
- [ ] Build lead capture component for tours with no available dates
- [ ] Include "Dates coming soon!" messaging
- [ ] Add form fields: name, email, preferred month
- [ ] Add "Notify Me" submit button
- [ ] Apply to Thailand Island Hopper and other tours without dates

## Thailand Intro Lead Capture Updates
- [x] Remove departure dates from Thailand Intro tour data
- [x] Change "Book Now" buttons to "Dates Coming Soon! Register Interest" when no dates available
- [x] Add smooth scroll functionality to scroll to lead capture form
- [x] Test scroll behavior on desktop - works perfectly, scrolls to centered lead form
- [x] Ensure lead capture form displays correctly on Thailand Intro

## Update to British English Spelling
- [x] Replace "finalizing" with "finalising"
- [x] Replace "travelers" with "travellers" across all pages
- [x] Checked for other American spellings (color/colour, center/centre) - only found in CSS/technical contexts where US spelling is standard
- [x] Updated across all pages: Home, Tours, Tour Detail, Destinations, FAQ, About, Reviews

## Add Mega Menu for Tours Navigation
- [x] Create mega menu dropdown for "Tours" navigation item
- [x] Organize tours by destination (Thailand, Bali, Philippines)
- [x] Show tour name, duration (days), price, and thumbnail for each tour
- [x] Make mega menu responsive for desktop (onMouseEnter/onMouseLeave)
- [x] Style mega menu to match site design with hover effects
- [x] Added 3-column grid layout with 800px width
- [x] Each tour card shows image, name, days, and price

## Add Destinations Dropdown Submenu
- [x] Add dropdown submenu under "Destinations" in navigation
- [x] Include links to Thailand, Bali, and Philippines destination pages
- [x] Dropdown works on desktop with hover (onMouseEnter/onMouseLeave)
- [x] Style dropdown to match site design with rounded corners and shadow
- [x] Upgrade to visual mega menu with destination images
- [x] Add tour count and key highlights for each destination
- [x] Make destinations dropdown more engaging and visual
- [x] 3-column grid layout with 600px width
- [x] Each destination shows image, name, highlight, tour count, and starting price

## Create Amazing Mobile Menu UX
- [x] Build collapsible sections for Destinations and Tours in mobile menu
- [x] Add smooth animations and transitions (animate-fade-in, rotate chevrons)
- [x] Make mobile menu thumb-friendly with large tap targets (h-12 buttons, p-3 cards)
- [x] Show tour thumbnails in mobile Tours accordion (16x16 images)
- [x] Ensure mobile menu closes after navigation (onClick handlers)
- [x] Added max-h-[80vh] with overflow-y-auto for scrollability
- [x] Organized tours by destination in mobile accordion

## Fix Missing Navigation Menu Images
- [x] Update Header.tsx to use existing Thailand images for Thailand tours/destination
- [x] Search for and add Bali temple/beach images for Bali tours/destination
- [x] Search for and add Philippines beach/lagoon images for Philippines tours/destination
- [x] Copied bali-temple.jpg, bali-beach.webp, philippines-beach.jpg, philippines-lagoon.jpg to public folder
- [x] Updated all image paths in Header.tsx to use correct filenames

## Update Main Navigation
- [x] Remove About from main navigation menu
- [x] Make Destinations, Tours, and Deals stand out with visual styling (background, border, or size)
- [x] Added bg-accent/50 background with rounded corners to Destinations, Tours, and Deals
- [x] Made buttons font-bold instead of font-medium
- [x] Added hover states with bg-primary/10
- [x] Ensure navigation remains clean and uncluttered

## Add Trust Widget to Mobile Menu
- [x] Add Trustpilot reviews widget to mobile navigation menu
- [x] Display 4.9 rating with stars and "Trusted by 500+ travellers" text
- [x] Position prominently at top of mobile menu (first item)
- [x] Make widget clickable linking to Trustpilot page
- [x] Styled with bg-accent/30 background and border
- [x] Shows large 4.9 rating, Excellent text, and 5 green Trustpilot stars

## Color-Code Navigation Items
- [x] Style Destinations and Tours with light blue/cyan background and darker blue text
- [x] Style Deals with light pink background and dark pink text
- [x] Add icons to navigation items (MapPin for Destinations, Compass for Tours, Tag for Deals)
- [x] Ensure colors match brand identity (cyan/teal and pink/magenta)
- [x] Used bg-cyan-50/text-cyan-600 for Destinations/Tours
- [x] Used bg-pink-50/text-pink-600 for Deals
- [x] Added hover states with darker shades (cyan-100/700, pink-100/700)

## Match Navigation Cyan to Logo Color
- [x] Extract exact cyan/teal color from ACE logo (#44c5c3)
- [x] Update Destinations and Tours navigation buttons to use logo cyan
- [x] Ensure light and dark shades match brand identity
- [x] Used #44c5c3/10 for light background, #44c5c3 for text
- [x] Used #44c5c3/20 for hover background, #2a7a79 for darker text

## Change Destinations to Neutral Color
- [x] Update Destinations button from cyan to neutral gray/slate
- [x] Keep Tours in cyan (#44c5c3) and Deals in pink (#ee2f6d)
- [x] Ensure neutral color is professional and clean
- [x] Used bg-slate-100/text-slate-600 for Destinations (neutral)
- [x] Updated Deals to use exact ACE pink (#ee2f6d) matching logo

## Update Tours Button Default Style
- [x] Swap Tours button default and hover states
- [x] Make darker cyan (#2a7a79) with bg-[#44c5c3]/20 the default
- [x] Ensure Tours button is more prominent from the start
- [x] Default: bg-[#44c5c3]/20 with text-[#2a7a79]
- [x] Hover: bg-[#44c5c3]/30 with text-[#1a5a59] (even darker)

## Build Thailand Island Hopper Tour Page
- [x] Upload Khao Sok lagoon hero image to public folder
- [x] Update Thailand Island Hopper tour data with new hero image (/thailand-island-hopper-hero.webp)
- [x] Add comprehensive highlights section (8 highlights already present)
- [x] Create detailed 21-day itinerary with day-by-day breakdown (6 sections already present)
- [x] Add accommodation section with hostel images
- [x] FAQ accordion automatically displays (shared component)
- [x] Lead capture form automatically displays (no departureDates set)
- [x] Travel Expert contact section automatically displays (shared component)
- [x] Trustpilot badge automatically displays in hero (shared component)
- [ ] Add cross-sell to Thailand Intro ("Want a shorter trip?")
- [x] Move "Want a shorter/longer trip?" cross-sell sections to appear directly under photo gallery on relevant tour pages
- [x] Add authentic highlight and itinerary images to Thailand Island Hopper tour page from user-provided content
- [x] Add departure dates to Thailand Island Hopper (all 2026 and 2027 dates with correct pricing)
- [x] Add social media links to footer (Instagram, TikTok, Facebook, Email)
- [x] Fix menu dropdown gap causing menu to close when moving mouse to submenu
- [x] Add destination images to Thailand Island Hopper day-by-day itinerary from pasted content
- [x] Fix 'Want a shorter trip?' cross-sell section image
- [x] Review and fix tours page mobile design overlaps and spacing issues
- [x] Create white versions of ACE Travel logos and update website branding
- [x] Update header to use colored blue ACE logo
- [x] Update header to use full ACE Travel Experiences logo with black text
- [x] Add payment calculator to tour page with monthly payment schedule and 2-month pre-departure deadline
- [x] Fix mobile header visibility issue
- [x] Increase padding/spacing in tour page hero headers for better visual hierarchy
- [x] Revert mobile header to use blue/black logo (ace-logo-full.png)
- [x] Fix mobile header bar visibility (logo and menu not showing)
- [x] Add mobile hamburger menu icon
- [x] Create hidden welcome pack download page for Thailand Island Hopper (noindex, PDF cover image, download button)
- [x] Add XML sitemap at /sitemap.xml covering all public pages (excluding noindex pages)
- [x] Update FAQ page with comprehensive content from pasted_content_15.txt (general, tour-specific, high-conversion FAQs)
- [x] Add curated Ace Moments photo gallery section to homepage bottom
- [x] Convert Ace Moments from masonry to modern uniform grid with Load More button
- [x] Build Bali Island Hopper tour page with authentic images, itinerary, highlights, departure dates, and payment calculator
- [ ] Build complete Bali Island Hopper tour page with authentic content, images, dates, highlights, itinerary
- [x] Fix Bali Island Hopper map image to use correct bali-island-hopper-map.webp
- [x] Reduce hero banner height on Bali Island Hopper page
- [x] Fix Day by Day itinerary styling on all tours to match Thailand Intro format
- [x] Remove photo gallery section from all tour pages

## Payment Calendar Popup
- [x] Payment calendar: each departure date opens a popup modal showing full £ payment schedule (today as start, final payment 2 months before departure)
- [x] Remove photo gallery section from all tour pages (already done for Thailand, ensure Philippines also has no gallery)
- [x] Build Blogs, Vlogs & Frogs page (Vlogs first, Blogs second, Frogs at bottom)
- [x] Add blog/vlogs link to header nav and footer
- [x] Redesign About Us page with Jay & Ruby, inspired by Intro Travel

## Contact Page Redesign
- [x] Redesign Contact page inspired by Intro Travel layout
- [x] Add quick-action cards: Chat/WhatsApp, FAQs, Manage Booking
- [x] Add enquiry type dropdown (General, Booking, Tour Info, etc.)
- [x] Add contact form with name, email, phone, message fields
- [x] Add contact detail cards (email, phone, response time)
- [x] Use admin@acetravelexperiences.com and +44 7450 996 347

## How It Works Page - Real Photography
- [x] Replace icon-based layout with real photography sections
- [x] Add full-width image panels between steps
- [x] Source real travel group photos for each step

## About Page & Header Fixes
- [ ] Change About page tagline from "Real adventures. Real friendships. Real memories." to something unique to ACE
- [ ] Rename "What Makes Us Different" section to "What Makes Us ACE"
- [ ] Fix Jay and Ruby team photos (wrong person showing)
- [ ] Remove Vlogs & Blogs link from header nav (keep only in footer)

## Responsive Fixes & FAQ Redesign (Mar 2026)
- [x] Fix payment plan popup on mobile - needs proper spacing, backdrop, and scrollable content
- [x] Fix phone number text overflow/cut-off on mobile (Tours page CTA)
- [x] Fix stats bar "800+" clipping on homepage hero mobile
- [x] Fix booking card "Book Now" button pushed off-screen on mobile
- [x] Redesign FAQ page with vibrant Gen Z-focused visual design
- [x] Add Vlogs/Blogs/Frogs link to footer (currently missing)

## Deal Cards, Frog Images & How It Works (Mar 2026)
- [x] Fix gap top/bottom on deal card images (Card py-6 override with py-0 gap-0)
- [x] Replace non-frog images on Vlogs/Blogs/Frogs page with verified frog photos (CDN uploaded)
- [x] Improve "Take the Leap" CTA on Vlogs page - frog-themed banner with Book Now button
- [x] Update How It Works page from 4 steps to 5 steps matching live site (added DMs step, welcome pack step, trip manager, arrive in paradise)
- [x] Unify vlogs feed - remove per-tour splitting, all vlogs in one grid

## New Info Dropdown Nav + Missing Pages (Mar 2026)
- [ ] Scrape live Payments page content
- [ ] Scrape live Flight Support page content
- [x] Build Payments page
- [x] Build Flight Support page
- [ ] Add new Info/More dropdown to header nav (FAQ, About Us, Reviews, Vlogs/Blogs/Frogs, How It Works, Payments, Flight Support)
- [ ] Register /payments and /flight-support routes in App.tsx
- [ ] Ensure new dropdown is fully responsive on mobile

## Multi-Currency Selector (Mar 2026)
- [ ] Create CurrencyContext with GBP/EUR toggle and conversion hook
- [ ] Add currency selector (GBP/EUR toggle) to header
- [ ] Wire all tour prices through useCurrency hook (Tours, TourDetail, Home, Deals, Payments)
- [ ] Wire deposit amount (£60/€70) through currency context
- [ ] Persist selected currency in localStorage
- [x] Add trust signals (Trustpilot-style rating + talk to a real person) to mobile menu Info section
- [x] Build per-tour welcome pages from PDF content (robots blocked, off-menu, shareable link)
- [ ] Thailand Island Hopper welcome page
- [ ] Thailand Intro welcome page
- [ ] Bali Explorer welcome page
- [ ] Bali Island Hopper welcome page
- [ ] Philippines Paradise welcome page
- [ ] Remove currency selector and revert all prices to hardcoded GBP

## Currency Removal
- [x] Remove currency selector from Header navigation
- [x] Remove CurrencyProvider from main.tsx
- [x] Revert all formatPrice() calls to hardcoded GBP strings across all pages and components

## Scuba Diving Add-On
- [x] Update FAQ scuba diving section to use generic partner names
- [x] Create bones Scuba Diving add-on page (to be populated later)
- [x] Add route for /add-ons/scuba-diving in App.tsx
- [x] Add scuba diving add-on section to Thailand Intro tour page (Basic Diver £100, Open Water £350)
- [x] Add scuba diving add-on section to Bali Island Hopper tour page (Basic Diver £100, Open Water £350)

## Scuba Diving Page - Full Content Population
- [ ] Extract underwater photos from PDF and upload to CDN
- [ ] Build full Scuba Diving page with Six Reasons section, course breakdowns, FAQs, and 20% hostel perk

## CMS Build (Node.js, portable for 20i hosting)
- [x] Design database schema for all CMS content models (tours, deals, FAQs, reviews, pages, images, site settings)
- [x] Build CMS auth system (username/password, JWT sessions, no Manus OAuth dependency)
- [x] Build backend CRUD procedures for all content types
- [x] Build image upload and management (S3 or local file storage, swappable for 20i)
- [x] Build page builder with template blocks (hero, text, image, gallery, pricing, CTA, FAQ, reviews)
- [x] Build CMS admin dashboard UI
- [x] Build tour editor (all fields: name, description, price, dates, highlights, itinerary, images)
- [x] Build deals editor
- [x] Build FAQ editor
- [x] Build reviews editor
- [x] Build site settings editor (homepage hero text, stats, footer content)
- [x] Build page manager (create/edit/delete custom pages with block builder)
- [x] Wire frontend to CMS data (replace hardcoded content with DB-driven content)
- [x] Ensure all Manus-specific dependencies are removable for 20i deployment

## Frontend CMS Wiring
- [x] Seed CMS database with all existing hardcoded tour content
- [x] Seed CMS database with all existing hardcoded FAQ content
- [x] Seed CMS database with all existing hardcoded reviews
- [x] Seed CMS database with all existing hardcoded deals
- [x] Wire Tours list page to CMS data
- [x] Wire TourDetail page to CMS data
- [x] Wire FAQ page to CMS data
- [x] Wire Reviews section to CMS data
- [x] Wire Deals page to CMS data

## Payment Due Date Fix
- [ ] Update PaymentCalculator.tsx: "2 months before departure" → "4 weeks before departure"
- [ ] Update PaymentCalculator.tsx footer note: "Full payment due 2 months before departure" → "4 weeks before departure"
- [ ] Update Payments.tsx FAQ answer: "2 months (8 weeks)" → "4 weeks"
- [ ] Update Payments.tsx step card: "Full balance 2 months before" → "Full balance 4 weeks before"
- [ ] Update HowItWorks.tsx: "60 days before" → "4 weeks before"
- [ ] Update TourDetail.tsx: "30 days before departure" → "4 weeks before departure"
- [ ] Update TermsConditions.tsx: "30 days before departure" → "4 weeks before departure"
- [ ] Update FAQ.tsx: "6 weeks before departure" → "4 weeks before departure"

## Admin CMS Improvements
- [ ] Audit existing CMS admin pages for usability issues
- [ ] Improve CMS dashboard with quick stats and recent activity
- [ ] Polish tour editor with inline image upload, itinerary builder, highlights editor
- [ ] Polish deals editor with all fields
- [ ] Polish FAQs editor with drag-to-reorder
- [ ] Polish reviews editor with star rating picker
- [ ] Polish site settings editor (homepage hero, stats, contact info)
- [ ] Add media library with drag-and-drop image upload
- [ ] Ensure CMS uses Manus OAuth for admin login (no separate password needed)

## CMS Full Audit & Completion
- [ ] Add departure_dates column to tours schema and push migration
- [ ] Add departure dates editor to CMS tours (add/remove/edit dates with badge support)
- [ ] Wire TourDetail.tsx departure dates to CMS (fallback to hardcoded if not in DB)
- [ ] Add contact details to site settings (phone, WhatsApp, email, social URLs)
- [ ] Wire Footer and Contact page to CMS site settings for contact/social info
- [ ] Add About page section to CMS settings (team members, tagline, values)
- [ ] Add flight info editor to CMS (fly-in/fly-out per tour)
- [ ] Wire FlightSupport.tsx to CMS data
- [x] Add scuba add-on pricing to CMS settings
- [x] Wire ScubaDiving.tsx and TourDetail scuba section to CMS settings
- [x] Wire About.tsx team members to CMS settings (about_team_member1/2/3 name/role/bio/image)
- [x] Confirmed session_file CDN URLs are permanent (not expiring) — no re-upload needed
- [ ] Add About page whyACE values (6 items) to CMS settings and wire About.tsx
- [ ] Wire FlightSupport.tsx to CMS data (fly-in/fly-out airports per tour)
- [ ] Wire HowItWorks.tsx page text to CMS settings

## CMS Audit & Bug Fixes (Apr 2026)
- [x] Fix tour save error: highlights schema was z.array(z.string()) but editor sends Highlight objects — updated to z.union([z.string(), z.object({...})])
- [x] Fix itinerary schema to accept optional image field in z.object
- [x] Verify all CMS sections load correctly: Tours, Deals, FAQs, Reviews, Media, Site Settings, Pages, CMS Users
- [x] Wire TourDetail scuba prices to CMS settings (scuba_basic_price, scuba_open_water_price, scuba_basic_description, scuba_open_water_description)
- [x] Confirm session_file CDN URLs are permanent — no re-upload needed
- [x] Update CMS login screen: show ACE Travel Experiences logo and replace "ACE Travel CMS" with "ACE Travel Experiences"

## CMS Redesign (Apr 2026)
- [x] Restyle CMS admin to clean light theme with ACE brand colours (teal accent, white bg, proper spacing)
- [x] Fix all image URL fields to include inline upload (no separate Media Library step needed)
- [x] Replace manual tour text input in Reviews editor with dropdown of tours from DB
- [x] Replace manual tour text input in Deals editor with dropdown of tours from DB
- [x] Apply dropdown-from-DB logic to any other place a tour/deal is referenced in CMS forms

## Unsaved Changes Warning (Apr 2026)
- [ ] Build useUnsavedChanges hook (tracks dirty state, blocks browser navigation, exposes confirm dialog)
- [ ] Build UnsavedChangesDialog component (shown when user tries to navigate away with unsaved edits)
- [ ] Wire unsaved changes warning into CmsTours editor dialog
- [ ] Wire unsaved changes warning into CmsDeals editor dialog
- [ ] Wire unsaved changes warning into CmsFaqs editor dialog
- [ ] Wire unsaved changes warning into CmsReviews editor dialog
- [ ] Wire unsaved changes warning into CmsSettings (per-section save)
- [ ] Wire unsaved changes warning into CmsUsers editor dialog
- [ ] Wire browser beforeunload event to warn on tab close/refresh

## CMS Dialog Spacing Polish (Apr 2026)
- [ ] Add top padding between dialog title and tab bar in CmsTours editor
- [ ] Increase vertical gap between form field rows (currently too tight)
- [ ] Ensure consistent label-to-input spacing across all CMS dialogs
- [ ] Add horizontal padding inside dialog content area
- [ ] Apply same spacing fixes to CmsDeals, CmsFaqs, CmsReviews, CmsUsers dialogs

## CMS Improvements Round 2 (Apr 2026)
- [ ] Fix Media Library: populate from all images already in DB (tour galleries, deal images, review photos, settings images)
- [ ] Rebuild Pages CMS: list all site pages with template type, keep custom page builder
- [ ] Add SEO meta title + description fields to Tours editor
- [ ] Add SEO meta title + description fields to Deals editor
- [ ] Add SEO meta title + description fields to Settings (global defaults)
- [ ] Add unsaved changes warning to CmsTours (was missed in previous round)
- [ ] Fix dialog spacing in CmsTours to match new polished style

## Footer Navigation Fix
- [x] Fix footer links to scroll to top of page on navigation (ScrollToTop component added to App.tsx)

## Blogs/Vlogs CMS Management
- [x] Add blogs_vlogs DB table to drizzle schema
- [x] Add CMS backend procedures (list, create, update, delete, listPublic)
- [x] Build CmsBlogs admin page with CRUD, inline image upload, tour dropdown, YouTube embed support
- [x] Add CmsBlogs to CMS sidebar navigation
- [x] Update BlogsVlogs frontend to pull from CMS, remove dummy data, hide section when empty
- [ ] Add JSON-LD BlogPosting schema to blog post pages

## CMS Content Sync & SEO (Apr 2026)
- [ ] Seed all 12 existing vlogs (Libby's series) into CMS blogs_vlogs table
- [ ] Add seoTitle + seoDescription columns to tours schema, push migration
- [ ] Add SEO tab to CmsTours editor
- [ ] Seed optimal SEO meta for all 4 tours in DB
- [ ] Add react-helmet-async for per-page meta tags
- [ ] Add SEO meta (title, description, canonical, og:) to all public pages
- [ ] Fix "2 months before departure" to "4 weeks before departure" in PaymentCalculator.tsx
- [ ] Fix "2 months before departure" to "4 weeks before departure" in Payments.tsx
- [ ] Fix "60 days before" to "4 weeks before" in HowItWorks.tsx
- [ ] Fix "30 days before departure" to "4 weeks before departure" in TourDetail.tsx
- [ ] Fix "30 days before departure" to "4 weeks before departure" in TermsConditions.tsx
- [ ] Fix "6 weeks before departure" to "4 weeks before departure" in FAQ.tsx

## CMS Pages Restructure
- [x] Restructure CmsPages: list all site pages at top with edit buttons, custom pages below

## Sitemap
- [x] Add dynamic /sitemap.xml Express endpoint (static pages + tour slugs + blog slugs from DB)
- [x] Add /robots.txt endpoint referencing the sitemap
- [x] Set SITE_URL=https://www.acetravelexperiences.com for production sitemap URLs

## Media Library Fix
- [x] Update CMS upload procedure to register every upload in the media table
- [x] Backfill all existing images from tours/deals/reviews/blogs/settings into media table

## Mac/Safari Viewport Fix (Apr 2026)
- [x] Fix hero section h-screen clipping on Mac/Safari (use 100dvh with h-screen fallback)
- [x] Check all other full-height sections for the same issue

## Mobile Menu Fix (Apr 2026)
- [x] Fix mobile menu panel height clipping on Mac/Safari — Info item cut off below Deals

## Open Graph Images (Apr 2026)
- [x] Fetch all tour data (slug, name, hero image, description) from DB
- [x] Generate branded 1200x630 OG image for each tour
- [x] Upload OG images to CDN and record URLs
- [x] Wire OG image URLs into SEO meta tags on TourDetail page
- [x] Add site-wide fallback OG image for homepage and other pages

## Mobile Menu Scroll Fix (Apr 2026)
- [x] Fix mobile menu nav not scrolling on Mac/Safari — overflow-y-auto not triggering due to unconstrained height
