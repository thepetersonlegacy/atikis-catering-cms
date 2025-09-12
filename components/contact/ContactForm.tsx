"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/spinner'
import ErrorMessage from '@/components/ui/error-message'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  eventDate: z.date({
    required_error: "Please select a date",
  }),
  wheelsUpTime: z.string().min(1, { message: 'Please select a wheels up time' }),
  specialRequests: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Generate time options in 30-minute intervals
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? 'AM' : 'PM';
      const time12 = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
      times.push({ value: time24, label: time12 });
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      wheelsUpTime: '',
      specialRequests: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // Format the form data for email
      const subject = encodeURIComponent('Aviation Catering Inquiry')
      const emailBody = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Event Date: ${data.eventDate.toDateString()}
Wheels Up Time: ${data.wheelsUpTime}
Special Requests: ${data.specialRequests || 'None'}

Please respond to this inquiry at your earliest convenience.

Thank you,
${data.name}
      `.trim()
      
      const body = encodeURIComponent(emailBody)

      // Try PHP endpoint first (for GoDaddy), then Netlify Function as fallback
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        eventDate: data.eventDate.toISOString(),
        wheelsUpTime: data.wheelsUpTime,
        specialRequests: data.specialRequests || ''
      }

      const endpoints = ['/contact-submit.php', '/.netlify/functions/contact-submit']
      for (const ep of endpoints) {
        try {
          const resp = await fetch(ep, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          if (resp.ok) {
            setIsSubmitted(true)
            setSubmitError(null)
            form.reset()
            return
          }
        } catch (e) {
          // try next endpoint
        }
      }

      // Fallback: open email client via mailto
      // TODO(DEMO): For production, consider posting to a serverless/API endpoint or a form service
      // (e.g., Netlify Forms, Resend, AWS SES) instead of relying on a mailto link. This
      // ensures submissions are captured even if the user lacks a default mail client.
      const mailtoLink = `mailto:order@atikismn.com?subject=${subject}&body=${body}`

      // Open email client
      window.location.href = mailtoLink

      // Show success message
      setIsSubmitted(true)
      setSubmitError(null)
      form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError("We couldn't open your email client. Please email order@atikismn.com directly and we'll follow up promptly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
      <h2 className="font-montserrat text-2xl font-bold mb-6">Ready to elevate your next flight?</h2>
      
      {submitError && (
        <ErrorMessage message={submitError} />
      )}

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="font-montserrat text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
          <p className="text-green-700 mb-4">
            Your inquiry has been received. We&apos;ll contact you as soon as possible.
          </p>
          <Button 
            variant="outline" 
            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Inquiry
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} className="border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} className="border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} className="border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-gray-700">Delivery Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal border-gray-300",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="wheelsUpTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Wheels Up Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select wheels up time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60">
                      {timeOptions.map((time) => (
                        <SelectItem key={time.value} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Special Requests/Dietary Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about any special requirements or dietary restrictions" 
                      className="resize-none border-gray-300 min-h-[150px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#B69121] text-white font-semibold py-3"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner size={18} />
                  Submitting...
                </span>
              ) : 'Submit Inquiry'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default ContactForm