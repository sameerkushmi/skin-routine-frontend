import Link from "next/link";

export default function ShippingReturnsPage() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen font-sans text-stone-800">
      {/* Decorative Top Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-stone-200 via-rose-100 to-stone-200" />

      <section className="max-w-5xl mx-auto px-6 py-20">
        {/* Header Section */}
        <header className="mb-20 border-b border-stone-200 pb-12">
          <nav className="mb-8">
            <Link
              href="/"
              className="text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-rose-500 transition-colors"
            >
              &larr; Back to Boutique
            </Link>
          </nav>
          <h1 className="text-5xl md:text-6xl font-serif italic text-stone-900 mb-6">
            Shipping & Returns
          </h1>
          <p className="text-stone-500 max-w-xl leading-relaxed">
            We ensure every formulation reaches you with the same care it was created.
            Below are our logistics standards and exchange protocols.
          </p>
        </header>

        <div className="space-y-24">
          {/* Section 01: Logistics */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <aside>
              <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold">01. Logistics</span>
              <h2 className="text-xl font-medium text-stone-900 mt-2">Delivery Standards</h2>
            </aside>
            <div className="lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="py-4 text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Service</th>
                      <th className="py-4 text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Timeline</th>
                      <th className="py-4 text-[10px] uppercase tracking-widest text-stone-400 font-semibold text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-stone-600">
                    <tr className="border-b border-stone-100">
                      <td className="py-6 font-medium text-stone-900">Standard Domestic</td>
                      <td className="py-6">3—7 Business Days</td>
                      <td className="py-6 text-right">$8.00</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="py-6 font-medium text-stone-900">Express Courier</td>
                      <td className="py-6">1—3 Business Days</td>
                      <td className="py-6 text-right">$25.00</td>
                    </tr>
                    <tr className="border-b border-stone-100">
                      <td className="py-6 font-medium text-stone-900">International Atelier</td>
                      <td className="py-6">7—21 Business Days</td>
                      <td className="py-6 text-right">Calculated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-xs italic text-stone-400">
                * Complimentary standard shipping is extended to all domestic orders exceeding $100.
              </p>
            </div>
          </section>

          {/* Section 02: Processing Timeline */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <aside>
              <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold">02. Fulfillment</span>
              <h2 className="text-xl font-medium text-stone-900 mt-2">Order Journey</h2>
            </aside>
            <div className="lg:col-span-2 bg-white p-8 border border-stone-200 rounded-sm">
              <div className="flex flex-col md:flex-row justify-between gap-8 relative">
                {/* Visual Connector Line */}
                <div className="hidden md:block absolute top-4 left-0 w-full h-[1px] bg-stone-100 z-0" />

                {[
                  { label: "Placement", desc: "Order confirmation received" },
                  { label: "Preparation", desc: "24-hour fulfillment window" },
                  { label: "Transit", desc: "Tracking credentials issued" }
                ].map((step, i) => (
                  <div key={i} className="relative z-10 flex md:flex-col gap-4 md:gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-stone-200 flex items-center justify-center text-[10px] font-serif italic text-stone-400">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900">{step.label}</h4>
                      <p className="text-xs text-stone-500 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 03: Returns */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-stone-100 pt-16">
            <aside>
              <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold">03. Policy</span>
              <h2 className="text-xl font-medium text-stone-900 mt-2">Returns & Exchanges</h2>
            </aside>
            <div className="lg:col-span-2">
              <p className="text-stone-600 leading-relaxed mb-8">
                Your satisfaction is paramount. Given the artisanal nature of our skincare,
                we accept returns on products that remain in their <strong>original, unopened
                  state</strong> within 14 days of delivery.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  "14-day return window from delivery",
                  "Items must be unused and sealed",
                  "Refunds processed within 7 business days",
                  "Original shipping costs are non-refundable"
                ].map((point, i) => (
                  <div key={i} className="flex gap-3 text-sm text-stone-600 items-center">
                    <span className="h-1 w-1 bg-rose-400 rounded-full shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Footer */}
          <footer className="mt-32 border-t border-stone-200 pt-16 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-serif italic text-stone-900 mb-4">Assistance Required?</h3>
              <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                If you wish to initiate a return or have inquiries regarding a delayed shipment,
                please contact our dedicated concierge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`} className="bg-stone-900 text-white px-8 py-4 text-[10px] uppercase tracking-widest hover:bg-stone-800 transition-all">
                  Contact Concierge
                </a>
                <Link href="/contact" className="border border-stone-300 text-stone-600 px-8 py-4 text-[10px] uppercase tracking-widest hover:bg-stone-50 transition-all">
                  Visit Support Center
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}