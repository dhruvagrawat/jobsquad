"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/Home/Pricecards"
import { Button } from "@/components/Home/PriceButton"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

type PricingSwitchProps = {
  onSwitch: (value: string) => void
}

type PricingCardProps = {
  isYearly?: boolean
  title: string
  monthlyPrice?: number
  yearlyPrice?: number
  description: string
  features: string[]
  actionLabel: string
  popular?: boolean
  exclusive?: boolean
}

const PricingHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="text-xl pt-1">{subtitle}</p>
    <br />
  </section>
)

const PricingCard = ({ isYearly, title, monthlyPrice, yearlyPrice, description, features, actionLabel, popular, exclusive }: PricingCardProps) => (
  <Card
    className={cn(`w-72 flex flex-col justify-between py-1 border-custom-blue mx-auto sm:mx-0`, {
      "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
        exclusive,
    })}>
    <div>
      <CardHeader className="pb-8 pt-4">
        {isYearly && yearlyPrice !== undefined && monthlyPrice !== undefined ? (
          <div className="flex justify-between">
            <CardTitle className="text-zinc-700 text-lg">{title}</CardTitle>
            <div
              className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black  ", {
                "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ": popular,
              })}>
              Save ${monthlyPrice * 12 - yearlyPrice}
            </div>
          </div>
        ) : (
          <CardTitle className="text-zinc-700  text-lg">{title}</CardTitle>
        )}
        <div className="flex gap-0.5">
          <h3 className="text-3xl font-bold">{"$" + monthlyPrice}</h3>
          <span className="flex flex-col justify-end text-sm mb-1">{yearlyPrice && isYearly ? "/year" : monthlyPrice !== undefined ? "/month" : null}</span>
        </div>
        <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature: string) => (
          <CheckItem key={feature} text={feature} />
        ))}
      </CardContent>
    </div>
    <CardFooter className="mt-2">
      <Button className="relative inline-flex w-full items-center justify-center rounded-md bg-custom-blue text-white  px-6 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-custom-blue2 focus:ring-offset-2 ">
        <a href="https://www.app.jobsquad.info">
          <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
          {actionLabel}
        </a>
      </Button>
    </CardFooter>
  </Card>
)

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-zinc-700  text-sm">{text}</p>
  </div>
)

export default function Page() {
  const plans = [
    {
      title: "Free",
      monthlyPrice: 0,
      description: "Get started",
      features: [
        "Apply once per day",
        "One Job Profile",
        "Access first job page"
      ],
      actionLabel: "Get Started",
    },
    {
      title: "Monthly",
      monthlyPrice: 9.99,
      description: "Perfect for Saving time",
      features: [
        "Unlimited applications",
        "Unlimited Job Profiles",
        "Access all LinkedIn job pages"
      ],
      actionLabel: "Get Started",
      popular: true,
    },
  ]

  return (
    <div className="py-8">
      <PricingHeader title="Pricing Plans" subtitle="Choose the plan that's right for you" />
      <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
        {plans.map((plan) => {
          return <PricingCard key={plan.title} {...plan} />
        })}
      </section>
    </div>
  )
}
