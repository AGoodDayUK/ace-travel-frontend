import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const sections = [
  {
    title: "1. Booking & Payments",
    content: (
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
        <p><strong>1.1 Deposit & Sign-Up</strong> – To secure a place, a non-refundable deposit (e.g. <strong>£60 / €70</strong>) is required.</p>
        <p><strong>1.2 Payment Plans</strong> – Balance is due no later than <strong>30 days before departure</strong>, unless you are on a pre-agreed instalment plan.</p>
        <p><strong>1.3 Failure to Pay</strong> – If you miss a payment, we may suspend your booking. If unresolved, your booking may be cancelled without refund.</p>
        <p><strong>1.4 Currency</strong> – All payments are processed in GBP (£) unless otherwise agreed.</p>
      </div>
    ),
  },
  {
    title: "2. What's Included & Not Included",
    content: (
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
        <p>2.1 Inclusions are listed in your chosen trip itinerary (e.g. accommodation, some meals, excursions, transfers, tour leader).</p>
        <p>2.2 Exclusions usually include flights, travel insurance, visas, vaccinations, personal spending money, optional extras, and meals not listed.</p>
        <p>2.3 Third-party activities (diving, excursions, etc.) are at your own risk and subject to the supplier's own terms.</p>
      </div>
    ),
  },
  {
    title: "3. Amendments by You",
    content: (
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
        <p>3.1 Date or trip changes may be requested up to <strong>45 days before departure</strong>, subject to availability and a <strong>£50 admin fee</strong>.</p>
        <p>3.2 Bookings are not transferable to another person without our written approval.</p>
      </div>
    ),
  },
  {
    title: "4. Cancellations by You",
    content: (
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
        <p>If for any reason you are no longer able to attend or you decide you no longer want to, it is important to let one of the reps know as soon as conveniently possible.</p>
        <p>If you have paid £60 or more of the total package price you may have the option to carry your place over to another trip date along with any funds paid after the initial £60.</p>
        <p>The decision to allow your place to be carried over will be at our discretion and any such requests MUST be made at least 2 months before your arrival date.</p>
        <p>Please note that due to commitments to our accommodation partners we cannot offer any refunds on payments made towards your package once the terms and conditions have been accepted, except in cases where a mistake has been made on our part or for duplicate payments.</p>
        <p>A booking cancellation can be made at any time via the website Dashboard under the My Package section by clicking "Cancel My Place" and following the instructions.</p>
        <p>If you have secured your place and decide to cancel for any reason you will be liable for a cancellation fee of up to £60, this cancellation fee can be charged to your account at any time after the cancellation request without prior notice.</p>
        <p>This fee goes some way to cover admin and rep costs and if you have paid off £60 or more of your total package price you will not be liable to pay any cancellation fee.</p>
      </div>
    ),
  },
  {
    title: "5. Cancellations or Changes by Us",
    content: (
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
        <p>5.1 We may occasionally need to adjust itineraries or activities. Minor changes (e.g. hotel substitution, time shifts) do not entitle refunds.</p>
        <p>5.2 If we cancel your trip for reasons within our control, you will receive a full refund or the option to rebook.</p>
        <p>5.3 If cancellation is due to circumstances outside our control (see Force Majeure), refunds or rebookings will depend on what we can recover from suppliers.</p>
      </div>
    ),
  },
  {
    title: "6. Behaviour & Conduct",
    content: (
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
        <p>6.1 Our tours are social, group-based experiences. We expect respectful behaviour at all times.</p>
        <p>6.2 Abuse, violence, illegal drug use, harassment, or behaviour that endangers yourself or others may result in immediate removal from the trip at your expense, with no refund.</p>
        <p>6.3 You are responsible for any damage caused to property or accommodation.</p>
      </div>
    ),
  },
  {
    title: "7. Force Majeure (Unforeseen Events)",
    content: (
      <div className="text-gray-700 text-sm leading-relaxed">
        <p>We are not liable for disruptions caused by events beyond our control, including but not limited to natural disasters, pandemics, war, political unrest, terrorism, border closures, or extreme weather.</p>
      </div>
    ),
  },
  {
    title: "8. Travel Requirements",
    content: (
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
        <p><strong>8.1 Visas</strong> – You are responsible for arranging correct visas and entry permits for your trip. We provide guidance but cannot guarantee approval.</p>
        <p><strong>8.2 Passports</strong> – Must be valid for at least <strong>6 months beyond your return date</strong>.</p>
        <p><strong>8.3 Vaccinations & Health</strong> – You must meet health requirements (vaccines, medications). Guidance is available from your local health authority.</p>
        <p>8.4 If you are denied entry to a country, we accept no liability and no refund will be given.</p>
      </div>
    ),
  },
  {
    title: "9. Travel Insurance",
    content: (
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
        <p>9.1 Comprehensive travel insurance covering medical treatment, repatriation, theft, cancellation, and personal liability is <strong>mandatory</strong>.</p>
        <p>9.2 Proof of insurance must be provided before departure.</p>
      </div>
    ),
  },
  {
    title: "10. Liability",
    content: (
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
        <p>10.1 We will take reasonable care to deliver services as described.</p>
        <p>10.2 Our liability is limited to the amount you have paid for the trip.</p>
        <p>10.3 We are not liable for:</p>
        <ul className="ml-4 space-y-1 list-disc">
          <li>Loss, theft, or damage to personal belongings.</li>
          <li>Injuries, illnesses, or deaths caused by activities outside the scope of the itinerary.</li>
          <li>Delays or cancellations beyond our control.</li>
        </ul>
        <p>10.4 Nothing in these Terms limits liability for fraud or negligence resulting in death or personal injury.</p>
      </div>
    ),
  },
  {
    title: "11. Complaints",
    content: (
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
        <p>If you have a complaint:</p>
        <ul className="ml-4 space-y-1 list-disc">
          <li>Inform your tour leader immediately so we can resolve it.</li>
          <li>If unresolved, submit your complaint in writing within <strong>28 days</strong> of returning.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "12. Marketing & Media",
    content: (
      <div className="text-gray-700 text-sm leading-relaxed">
        <p>By joining a tour, you consent to photos and videos being taken by ATE staff or other participants for promotional use (unless you request otherwise in writing).</p>
      </div>
    ),
  },
  {
    title: "13. Data Protection & Privacy",
    content: (
      <div className="text-gray-700 text-sm leading-relaxed">
        <p>We collect and store your personal data (e.g. passport details, contact info, health/insurance information) solely for operational and safety purposes. Data is handled in compliance with UK GDPR standards.</p>
      </div>
    ),
  },
  {
    title: "14. Covid-19 Cover",
    content: (
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
        <p>To ensure that our members are protected, in the event their arrival date is cancelled due to government-imposed Covid-19 related travel restrictions we have introduced Covid Cover.</p>
        <p>Should your arrival date be confirmed as cancelled by our accommodation provider(s) you will receive a credit note for the full balance paid towards your existing working holiday. This can be redeemed against a new travel experience package for the same or following season (subject to availability).</p>
        <p>If you reside in a country/region and due to local travel restrictions you are unable to attend your arrival, you will also be eligible to receive a credit note.</p>
        <p><strong>Please note:</strong> Covid Cover applies only where it would be impossible for you to arrive on your scheduled arrival date. We will not be held accountable if you choose not to travel where the option is available. The option to offer a credit note is at the discretion of Ace Travel Experiences.</p>
      </div>
    ),
  },
  {
    title: "15. Governing Law",
    content: (
      <div className="text-gray-700 text-sm leading-relaxed">
        <p>These Terms are governed by the laws of England & Wales. Any disputes will be subject to the exclusive jurisdiction of the English courts.</p>
      </div>
    ),
  },
];

function AccordionItem({ title, content, isOpen, onToggle }: { title: string; content: React.ReactNode; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left hover:text-[#e91e8c] transition-colors"
      >
        <span className="font-semibold text-gray-900 text-base pr-4">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#e91e8c] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6">
          {content}
        </div>
      )}
    </div>
  );
}

export default function TermsConditions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gray-50 border-b border-gray-200 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900">Terms & Conditions</h1>
          <p className="mt-3 text-gray-500 text-sm">Last updated 03/10/2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="border-t border-gray-200">
          {sections.map((section, i) => (
            <AccordionItem
              key={i}
              title={section.title}
              content={section.content}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
