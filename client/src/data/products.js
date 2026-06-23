export const arknBenchMatProduct = {
  id: "mock-arkn-silicone-bench-mat",
  title: "ARKN Silicone Bench Mat",
  handle: "arkn-silicone-bench-mat",
  price: {
    amount: 49,
    currencyCode: "GBP",
    display: "£49.00",
    isPlaceholder: true
  },
  description:
    "A premium silicone layer for lifters who want a cleaner, more consistent bench setup without adding noise to their kit.",
  benefits: [
    {
      title: "Grip-first",
      text: "Textured silicone helps create a repeatable contact point between lifter and bench."
    },
    {
      title: "Clean",
      text: "Creates a personal wipe-clean layer on shared bench pads."
    },
    {
      title: "Quiet",
      text: "Minimal kit for serious sessions without loud training gimmicks."
    }
  ],
  features: [
    {
      title: "Consistent feel",
      text: "Bring the same bench contact surface to home gyms, commercial gyms, and meets."
    },
    {
      title: "Simple maintenance",
      text: "Silicone keeps the routine straightforward: wipe it down, roll it, pack it."
    },
    {
      title: "Training bag ready",
      text: "Built around one job: a stable, personal surface for pressing sessions without wasted bulk."
    }
  ],
  faq: [
    {
      question: "What is the ARKN Silicone Bench Mat for?",
      answer: "It creates a personal, grippy, wipe-clean contact surface for bench pressing."
    },
    {
      question: "Is the mat suitable for commercial gyms?",
      answer: "Yes. It is intended as a portable layer for shared benches, home gyms, and meet prep."
    },
    {
      question: "How do I clean it?",
      answer: "Wipe the silicone surface after training and let it dry before rolling or packing it."
    }
  ],
  images: [
    {
      id: "bench-mat-hero",
      src: "/assets/bench-mat-hero.png",
      alt: "Black silicone bench mat on a dark studio surface",
      role: "hero"
    },
    {
      id: "bench-mat-detail-placeholder",
      src: "/assets/bench-mat-detail-placeholder.png",
      alt: "Close-up placeholder for the ARKN Silicone Bench Mat texture",
      role: "detail"
    }
  ],
  variant: {
    id: "mock-variant-default",
    title: "Default mat",
    sku: "ARKN-BENCH-MAT-MOCK",
    availableForSale: false,
    selectedOptions: [
      {
        name: "Color",
        value: "Black"
      }
    ]
  }
};

export const products = [arknBenchMatProduct];

export function getProductByHandle(handle) {
  return products.find((product) => product.handle === handle);
}
