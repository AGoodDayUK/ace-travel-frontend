import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const sections = [
  {
    title: "1. Personal Data We Collect",
    content: (
      <div className="space-y-3 text-gray-700">
        <p>We collect the following personal information to facilitate and ensure the safety of your participation in our trips:</p>
        <ul className="space-y-2 list-none">
          <li><strong>Passport Information:</strong> We collect your passport details for the purpose of booking transportation, ferries, and activities through third-party travel providers.</li>
          <li><strong>Travel Insurance Information:</strong> We collect the name of your travel insurance provider, policy number, and emergency contact number to ensure you meet the insurance requirements for participation in our trips.</li>
          <li><strong>Emergency Contact Information:</strong> We collect the name, phone number, email address, and relationship to you of an emergency contact, which will only be used in case of an emergency during the trip.</li>
          <li><strong>Health Information:</strong> We collect information about pre-existing health conditions, any medications, allergies, and dietary requirements. This information is used to ensure your safety and well-being during the trip. Dietary and allergy information may be shared with accommodation providers and food service providers to meet your needs.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "2. Legal Basis for Data Processing",
    content: (
      <div className="space-y-3 text-gray-700">
        <p>We process your personal data on the following legal bases under the General Data Protection Regulation (GDPR):</p>
        <ul className="space-y-2 list-none">
          <li><strong>Contractual Necessity:</strong> We process your passport, travel insurance, and emergency contact information as it is necessary to fulfil our contractual obligations to you as a trip participant.</li>
          <li><strong>Legitimate Interests:</strong> We process your health information to ensure your safety and well-being during the trip, which is in both your and our legitimate interests.</li>
          <li><strong>Consent:</strong> Where we collect data beyond what is strictly necessary, we will seek your explicit consent.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "3. How We Use Your Data",
    content: (
      <div className="space-y-3 text-gray-700">
        <p>Your personal data is used solely for the following purposes:</p>
        <ul className="space-y-2 list-none">
          <li><strong>Passport Information:</strong> Used to book transportation, ferries, and activities with third-party travel providers.</li>
          <li><strong>Travel Insurance Information:</strong> Used to verify that you meet the insurance requirements for participation in our trips and to contact your insurer in the event of an emergency.</li>
          <li><strong>Emergency Contact Information:</strong> Used only in the event of an emergency during the trip to contact your designated emergency contact.</li>
          <li><strong>Health Information:</strong> Used to ensure your safety and well-being during the trip and to communicate dietary and allergy requirements to accommodation and food service providers.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "4. Data Security",
    content: (
      <div className="space-y-3 text-gray-700">
        <p>We take the security of your personal data seriously and have implemented appropriate technical and organisational measures to protect it from unauthorised access, loss, or disclosure. These measures include:</p>
        <ul className="space-y-2 list-none">
          <li>Secure storage of personal data in encrypted systems.</li>
          <li>Limiting access to your personal data to only those staff members who need it to perform their duties.</li>
          <li>Regular review of our data security practices to ensure they remain effective.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "5. Data Retention",
    content: (
      <div className="space-y-3 text-gray-700">
        <p>We will retain your personal data for no longer than necessary to fulfil the purposes for which it was collected. Specifically:</p>
        <ul className="space-y-2 list-none">
          <li><strong>Passport and Travel Insurance Information:</strong> We will retain this data for <strong>six months after the end of your trip</strong> in case of any complications or issues that arise during your onward travel.</li>
          <li><strong>Health Information and Emergency Contacts:</strong> This information will also be retained for <strong>six months</strong> after the trip in case of emergencies or follow-up.</li>
        </ul>
        <p>After this period, we will securely delete your personal data from our systems.</p>
      </div>
    ),
  },
  {
    title: "6. Data Sharing and Third-Party Providers",
    content: (
      <div className="space-y-3 text-gray-700">
        <p>We will share your data only when necessary:</p>
        <ul className="space-y-2 list-none">
          <li><strong>Passport Information:</strong> Shared with third-party travel providers for the purpose of booking transportation and activities.</li>
          <li><strong>Dietary and Allergy Information:</strong> May be shared with accommodations and food service providers to meet your needs.</li>
        </ul>
        <p>We do not sell, rent, or otherwise disclose your personal data to any third parties except as required to provide the services outlined above.</p>
      </div>
    ),
  },
  {
    title: "7. Your Rights Under GDPR",
    content: (
      <div className="space-y-3 text-gray-700">
        <p>Under the General Data Protection Regulation (GDPR), you have the following rights:</p>
        <ul className="space-y-2 list-none">
          <li><strong>Right to Access:</strong> You can request a copy of the personal data we hold about you.</li>
          <li><strong>Right to Rectification:</strong> You can request that we correct any inaccurate or incomplete information.</li>
          <li><strong>Right to Erasure:</strong> You have the right to request the deletion of your personal data ("right to be forgotten"), subject to legal or safety requirements.</li>
          <li><strong>Right to Restrict Processing:</strong> You can ask us to limit the processing of your personal data in certain situations.</li>
          <li><strong>Right to Data Portability:</strong> You can request that your data be transferred to another organisation or directly to you in a structured, commonly used, and machine-readable format.</li>
          <li><strong>Right to Object:</strong> You have the right to object to the processing of your personal data in certain circumstances.</li>
        </ul>
        <p>If you wish to exercise any of these rights, please contact us using the contact details provided below.</p>
      </div>
    ),
  },
  {
    title: "8. Data Breach Notification",
    content: (
      <div className="text-gray-700">
        <p>In the unlikely event of a data breach that affects your personal data, we will notify you and the relevant data protection authority within <strong>72 hours</strong> of becoming aware of the breach, in accordance with GDPR.</p>
      </div>
    ),
  },
  {
    title: "9. Contact Information for Data Protection",
    content: (
      <div className="space-y-3 text-gray-700">
        <p>If you have any questions, concerns, or requests regarding your personal data or this Privacy Policy, please contact:</p>
        <div>
          <p><strong>Data Protection Officer</strong></p>
          <p>Ace Travel Experiences</p>
          <p><a href="mailto:admin@acetravelexperiences.com" className="text-[#e91e8c] hover:underline">admin@acetravelexperiences.com</a></p>
          <p>07938 411298</p>
        </div>
        <p>You also have the right to lodge a complaint with a supervisory authority, such as the <strong>UK Information Commissioner's Office (ICO)</strong>, if you believe that your data has been mishandled.</p>
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
        <div className="pb-6 text-sm leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
}

export default function PrivacyPolicy() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gray-50 border-b border-gray-200 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-3 text-gray-500 text-sm">Last Updated 03/10/2025</p>
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
