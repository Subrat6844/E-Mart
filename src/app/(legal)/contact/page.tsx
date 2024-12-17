import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us for any questions or concerns.',
}

export default function ContactUs() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p>We&rsquo;d love to hear from you. Please fill out the form below or use our contact information.</p>
      
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <Input type="text" id="name" name="name" required className="mt-1" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <Input type="email" id="email" name="email" required className="mt-1" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <Textarea id="message" name="message" rows={4} required className="mt-1" />
        </div>
        <Button type="submit">Send Message</Button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Other Ways to Reach Us</h2>
        <div className="space-y-2">
          <p><strong>Email:</strong> support@example.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Address:</strong> 123 Main St, Anytown, ST 12345</p>
        </div>
      </div>
    </div>
  )
}


