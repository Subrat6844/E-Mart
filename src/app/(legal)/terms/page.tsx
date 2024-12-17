import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Our terms and conditions for using our services.',
}

export default function TermsAndConditions() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Terms and Conditions</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing or using our services, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Use of Services</h2>
        <p>Our services are intended for personal and non-commercial use. You may not use our services for any illegal or unauthorized purpose.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. User Accounts</h2>
        <p>When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Intellectual Property</h2>
        <p>The content, features, and functionality of our services are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Limitation of Liability</h2>
        <p>We shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Changes to Terms</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms on this page.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at: legal@example.com</p>
      </section>
    </div>
  )
}

