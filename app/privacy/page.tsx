import React from 'react'

export const metadata = {
  title: 'Privacy Policy | Atikis',
}

export default function PrivacyPage(): JSX.Element {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

      <p className="text-gray-700">Atikis Minnesota Aviation Catering (&quot;Atikis&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and when you contact us to request services.</p>

      <h2 className="mt-8 text-2xl font-semibold">Information We Collect</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li><span className="font-medium">Contact Information:</span> name, email address, phone number.</li>
        <li><span className="font-medium">Order Details:</span> event/flight date, wheels up time, delivery location/FBO, passenger counts, and any dietary notes.</li>
        <li><span className="font-medium">Website Interactions:</span> basic server logs (e.g., IP address, browser type) used for security and diagnostics. We do not run third-party analytics or advertising trackers.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">How We Use Your Information</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>To respond to inquiries and provide quotes.</li>
        <li>To prepare, deliver, and support catering services you request.</li>
        <li>To improve our website, services, and customer experience.</li>
        <li>To maintain the security and integrity of our systems.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">Sharing of Information</h2>
      <p className="text-gray-700">We do not sell your personal information. We may share limited information with trusted service providers (e.g., email or hosting providers) to operate our website and process inquiries. These providers are bound to protect your information and may only use it to perform services for us. We may also disclose information if required by law or to protect our rights.</p>

      <h2 className="mt-8 text-2xl font-semibold">Data Retention</h2>
      <p className="text-gray-700">We retain personal information only as long as necessary to fulfill the purposes outlined above and to comply with legal obligations. When no longer needed, we securely delete or anonymize the data.</p>

      <h2 className="mt-8 text-2xl font-semibold">Your Choices and Rights</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>You may request access to, correction of, or deletion of your personal information by contacting us.</li>
        <li>You may choose not to provide certain information; however, this may limit our ability to deliver services.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">Security</h2>
      <p className="text-gray-700">We use reasonable administrative, technical, and physical safeguards designed to protect your information. No method of transmission or storage is perfectly secure; therefore, we cannot guarantee absolute security.</p>

      <h2 className="mt-8 text-2xl font-semibold">Children&apos;s Privacy</h2>
      <p className="text-gray-700">Our services are intended for professional aviation catering and are not directed to children. We do not knowingly collect personal information from children.</p>

      <h2 className="mt-8 text-2xl font-semibold">International Visitors</h2>
      <p className="text-gray-700">If you access our website from outside the United States, please note that your information may be processed in the U.S., where data protection laws may differ from those in your country.</p>

      <h2 className="mt-8 text-2xl font-semibold">Changes to This Policy</h2>
      <p className="text-gray-700">We may update this Privacy Policy from time to time. The updated version will be indicated by an updated Last updated date. Your continued use of the site after any update indicates your acceptance.</p>

      <h2 className="mt-8 text-2xl font-semibold">Contact Us</h2>
      <p className="text-gray-700">For questions about this Privacy Policy or our data practices, please contact us at <a href="mailto:order@atikismn.com" className="text-[#D4AF37] underline">order@atikismn.com</a> or call <a href="tel:6516474940" className="text-[#D4AF37] underline">(651) 647-4940</a>.</p>
    </main>
  )
}

