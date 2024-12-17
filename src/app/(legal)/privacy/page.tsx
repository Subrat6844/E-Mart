import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicy() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
        <p>Welcome to our Privacy Policy. This policy describes how we collect, use, and handle your personal information when you use our services.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Name and contact information</li>
          <li>Payment information</li>
          <li>Communication history with us</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send you technical notices, updates, security alerts, and support messages</li>
          <li>Respond to your comments, questions, and customer service requests</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect the security of your personal information.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. Please contact us to exercise these rights.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Contact Us</h2>
        <p>If you have any questions about this privacy policy, please contact us at: privacy@example.com</p>
      </section>
    </div>
  )
}

