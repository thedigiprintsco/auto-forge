const testimonials = [
  {
    body: "EtherForge's Solopreneur OS is the first system that actually stuck. I went from juggling five different apps to running my entire agency from one Notion page. It's a game-changer for my sanity.",
    author: {
      name: "Sarah K.",
      handle: "Founder of GrowthSync",
    },
  },
  {
    body: "The AI Marketing Power-Pack paid for itself in 48 hours. The prompts are miles ahead of the generic stuff you find online. My LinkedIn engagement has tripled since I started using their hooks.",
    author: {
      name: "Marcus J.",
      handle: "Content Creator & Ghostwriter",
    },
  },
  {
    body: "As someone with ADHD, most productivity tools are too rigid. The ADHD Focus System is flexible, visual, and actually fun to use. I'm finally checking off my 'Big Three' every single day.",
    author: {
      name: "Leo T.",
      handle: "Independent Developer",
    },
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-deep-space relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-ai-teal">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
            Forged in the Real World.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-white sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author.name} className="flex flex-col gap-6 rounded-2xl bg-forge-gray/50 p-8 border border-white/5 backdrop-blur-sm">
              <blockquote className="text-silver-slate italic">
                <p>{`“${testimonial.body}”`}</p>
              </blockquote>
              <div className="mt-auto flex items-center gap-x-4">
                <div>
                  <div className="font-semibold">{testimonial.author.name}</div>
                  <div className="text-ai-teal">{testimonial.author.handle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
