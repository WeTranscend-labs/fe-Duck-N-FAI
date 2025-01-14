'use client';

export function StatsSection() {
  return (
    <section id="stats" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            DuckStrike Community
          </h2>
          <p className="text-muted-foreground">
            Join the early adopters of DuckStrike&apos;s revolutionary
            transaction platform
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-muted rounded-lg transform transition-transform group-hover:scale-105" />
            <div className="relative p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">$50K+</div>
              <div className="text-muted-foreground">DuckStrike Volume</div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-muted rounded-lg transform transition-transform group-hover:scale-105" />
            <div className="relative p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">DuckStrike Users</div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-muted rounded-lg transform transition-transform group-hover:scale-105" />
            <div className="relative p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">2K+</div>
              <div className="text-muted-foreground">Chain Transactions</div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-muted rounded-lg transform transition-transform group-hover:scale-105" />
            <div className="relative p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">
                Growing Network
              </h3>
              <p className="text-muted-foreground">
                Our DuckStrike community is expanding rapidly, with new users
                joining daily to experience the future of crypto transactions.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-muted rounded-lg transform transition-transform group-hover:scale-105" />
            <div className="relative p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">
                Active Development
              </h3>
              <p className="text-muted-foreground">
                Continuous improvements and updates ensure DuckStrike remains at
                the forefront of blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
