export default function WhyChooseUs() {
  return (
    <section className="mt-20 bg-gray-100 py-16 text-center">
      <h2 className="text-3xl font-semibold mb-8">Why Choose ReviewBlog?</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col items-center">
          <i className="fas fa-book-open text-4xl text-indigo-600 mb-4"></i>
          <h3 className="font-medium text-xl mb-2">Track Your Books</h3>
          <p className="text-gray-700">
            Easily keep track of books you’ve read or want to read.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-users text-4xl text-indigo-600 mb-4"></i>
          <h3 className="font-medium text-xl mb-2">Join the Community</h3>
          <p className="text-gray-700">
            Connect with fellow book enthusiasts and share your reviews.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-star text-4xl text-indigo-600 mb-4"></i>
          <h3 className="font-medium text-xl mb-2">
            Personalized Recommendations
          </h3>
          <p className="text-gray-700">
            Get book suggestions based on your preferences and reviews.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-comments text-4xl text-indigo-600 mb-4"></i>
          <h3 className="font-medium text-xl mb-2">Open Source</h3>
          <p className="text-gray-700">
            Contribute to a growing platform built for book lovers, by book
            lovers.
          </p>
        </div>
      </div>
    </section>
  );
}
