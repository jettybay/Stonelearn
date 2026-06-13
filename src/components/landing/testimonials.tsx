interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

const testimonialsData: Testimonial[] = [
  {
    quote: "StoneLearn has transformed my learning journey. The courses are engaging, and the instructors are top-notch. Highly recommended!",
    author: "Alice Johnson",
    title: "Student at StoneLearn",
  },
  {
    quote: "The flexibility and quality of content on StoneLearn are unparalleled. I've gained valuable skills that have directly impacted my career.",
    author: "Bob Williams",
    title: "Software Engineer",
  },
  {
    quote: "As an educator, I appreciate the well-structured curriculum and the interactive platform. It's a fantastic resource for continuous learning.",
    author: "Carol Davis",
    title: "University Professor",
  },
  {
    quote: "I was skeptical at first, but StoneLearn exceeded all my expectations. The support team is also incredibly helpful.",
    author: "David Brown",
    title: "Freelance Designer",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 sm:py-28" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#722F37]">What our learners say</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by thousands of students worldwide
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hear from individuals who have achieved their learning goals with StoneLearn.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5"
            >
              <blockquote className="text-lg leading-8 text-gray-900">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                {/* You could add an avatar image here */}
                <div className="text-base">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="mt-1 text-gray-500">{testimonial.title}</div>
                </div>
              </figcaption>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
