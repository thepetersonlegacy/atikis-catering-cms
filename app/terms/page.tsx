import React from 'react'

export const metadata = {
  title: 'Terms of Service | Atikis',
}

export default function TermsPage(): JSX.Element {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-semibold mb-4">Terms of Service</h1>
      <p className="text-gray-700 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

      <p className="text-gray-700">Welcome to Atikis Minnesota Aviation Catering (&quot;Atikis&quot;). By accessing or using our website and services, you agree to these Terms of Service. If you do not agree, please do not use our site or services.</p>

      <h2 className="mt-8 text-2xl font-semibold">1. Services</h2>
      <p className="text-gray-700">We provide aviation catering services for private and corporate flights. Availability may vary by location, date, and requested items.</p>

      <h2 className="mt-8 text-2xl font-semibold">2. Orders & Quotes</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Orders may be initiated by email or our contact form. We will confirm details including delivery time, airport/FBO, and special requirements.</li>
        <li>Quotes are estimates and may change based on final menu selections, quantities, and delivery conditions.</li>
        <li>Allergies and dietary restrictions must be disclosed at the time of ordering.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">3. Pricing & Payment</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Prices are provided upon request and may include delivery fees or surcharges.</li>
        <li>Applicable taxes will be added where required by law.</li>
        <li>Payment terms will be specified in your quote/confirmation (e.g., credit card on file, invoice terms for approved accounts).</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">4. Cancellations & Changes</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Changes and cancellations must be requested as soon as possible. Short-notice changes may not be possible.</li>
        <li>Orders canceled within a defined window may incur fees to cover costs already incurred. The applicable window will be communicated with your order.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">5. Allergens & Dietary Needs</h2>
      <p className="text-gray-700">We make reasonable efforts to accommodate allergies and dietary needs. However, cross-contact may occur; we cannot guarantee an allergen-free environment.</p>

      <h2 className="mt-8 text-2xl font-semibold">6. Intellectual Property</h2>
      <p className="text-gray-700">All content on this site, including logos, images, and text, is owned by Atikis or our licensors and is protected by law. You may not use our marks or content without permission.</p>

      <h2 className="mt-8 text-2xl font-semibold">7. Limitation of Liability</h2>
      <p className="text-gray-700">To the fullest extent permitted by law, Atikis is not liable for indirect, incidental, special, or consequential damages arising from your use of the site or services.</p>

      <h2 className="mt-8 text-2xl font-semibold">8. Indemnification</h2>
      <p className="text-gray-700">You agree to indemnify and hold harmless Atikis from claims arising out of your use of the site or services or your violation of these terms.</p>

      <h2 className="mt-8 text-2xl font-semibold">9. Governing Law</h2>
      <p className="text-gray-700">These terms are governed by the laws of the State of Minnesota, without regard to conflict of law principles.</p>

      <h2 className="mt-8 text-2xl font-semibold">10. Changes to These Terms</h2>
      <p className="text-gray-700">We may update these terms from time to time. The updated version will be indicated by an updated &quot;Last updated&quot; date.</p>

      <h2 className="mt-8 text-2xl font-semibold">11. Contact</h2>
      <p className="text-gray-700">Questions about these terms? Contact us at <a href="mailto:order@atikismn.com" className="text-[#D4AF37] underline">order@atikismn.com</a> or call <a href="tel:6516474940" className="text-[#D4AF37] underline">(651) 647-4940</a>.</p>
    </main>
  )
}

