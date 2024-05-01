import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { BiyaIcon } from "@/components/Icon";

interface FeatureItemProps {
  title: string,
  description: string,
  icon: string,
  comingSoon?: boolean,
  id?: number
}

export default function LandingPage () {
  const features: FeatureItemProps[] = [
    {
        id: 1,
        title: 'Upload CSV',
        description: 'Upload all numbers you want to recharge to Biya',
        icon: 'bulk-upload'
    },
    {
        id: 2,
        title: 'Schedule Recharges',
        description: 'Set up automatic recharges for your upload',
        icon: 'clock',
        comingSoon: true
    },
    {
        id: 3,
        title: 'Track Your Spend',
        description: 'Keep track of how much you spend on biya',
        icon: 'tracker'
    }
]

  return (
    <div className="p-0 m-auto w-full">
      <Head>
        <title>Biya Business</title>
        <meta name="description" content="Biya for businesses" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      {/* NavBar Start */}
      <nav className="bg-[#F5FAFD] fixed top-0 left-0 right-0 z-10">
        <div className="max-w-[1440px] m-auto py-9 px-16 w-full flex items-center justify-between max-lg:p-5">
          <Link href={"/"}>
            <Image
              src={"/images/logo-dark.svg"}
              height={0}
              width={0}
              alt="Biya"
              className="w-[120px] h-auto"
            />
          </Link>
          <div className="flex justify-end flex-1">
            <Link href={"/auth/login"} className="text-normal text-primary bg-transparent py-3 px-7 border border-primary rounded-md mr-5 max-lg:mr-0">
              Login
            </Link>
            <Link href={"https://biya.com.ng"} className="text-lg text-white bg-primary py-3 px-7 rounded-md max-lg:hidden">
              Home
            </Link>
          </div>
        </div>
      </nav>
      {/* NavBar End */}

      {/* Hero Header Start */}
      <header>
        <div className="bg-[#F5FAFD] text-primary h-screen min-h-[700px] max-h-[900px] text-center pt-[170px] pb-[100px] flex flex-col items-center">
          <h1 className="text-[70px] font-bold max-w-[700px] mb-5 lg:text-[36px]">Easy Bulk Recharges, Anytime</h1>
          <p className="text-[24px] mb-8">Automate data and airtime top-ups with Biya Business</p>
          <Link href={"/auth/signup"} className="text-[16px] text-white bg-primary py-4 px-11 rounded-md">
            Get Started
          </Link>
        </div>
        <div className="flex flex-col items-center translate-y-[-240px]">
          <div>
            <Image
              src={"/images/dashboard.png"}
              alt="Biya Business Dashboard"
              priority={true}
              height={480}
              width={480}
              className="w-auto h-auto"
            />
          </div>
        </div>
      </header>
      {/* Hero Header End */}

      {/* Features Start */}
        <section className="max-w-[1210px] m-auto max-lg:pt-80">
          <h2 className="text-[40px] text-primary font-semibold text-center m-0">
            Need help keeping your business lines running?
            <span className="text-secondary block">
              That’s where Biya Business comes in.
            </span>
          </h2>
          <div className="flex justify-between items-center mt-[98px] mb-[125px] flex-wrap max-lg:flex-col max-lg:my-[40px]">
            {features.map(feature => <FeatureItem {...feature} key={feature.id} />)}
          </div>
        </section>
      {/* Features End */}

      {/* Summary Section Start */}
        <section className="bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className="flex items-center justify-between pl-[145px] max-w-[1400px] my-0 mx-auto">
            <div>
              <h2 className="text-5xl max-w-[350px] font-semibold text-primary">All your recharges in one place</h2>
              <p className="text-3xl max-w-[440px] my-10">No need to go to a physical office or join a long queue before your bills are paid. Join the community of Biya users who pay their bills easily and stress free simply by chatting.</p>
              <Link href={"/auth/signup"}>
                Get Started
              </Link>
            </div>
            <div className="max-lg:hidden">
              <Image src={"/images/places.jpg"} alt="all places" width={790} height={790} className="w-auto h-auto" priority />
            </div>
          </div>
        </section>
      {/* Summary Section End */}

      {/* Footer Start */}
        <footer className="bg-primary text-white py-9 px-[72px] max-lg:p-5">
          <div className="flex justify-between items-center max-w-[1340px] my-0 mx-auto max-lg:block">
            <div className="flex items-center">
              <Link href={"/"} className="mr-6">
                <Image
                  src={"/images/logo-light.svg"}
                  alt="Biya"
                  height={80}
                  width={80}
                />
              </Link>
              <ul className="flex list-none m-0 p-0">
              <li className="mr-5">
                  <Link href="/register">
                      Get Started
                  </Link>
                </li>
                <li className="mr-5">
                    <Link href="https://biya.com.ng/terms" target="_blank">
                        Terms and Conditions
                    </Link>
                </li>
                <li className="mr-5">
                    <Link href="https://biya.com.ng/privacy" target="_blank">
                        Privacy Policy
                    </Link>
                </li>
              </ul>
            </div>
            <ul className="flex list-none m-0 p-0">
              <li className="mr-5">
                  <Link href="https://facebook.com/biyabot">
                      <Image
                        src={"/icons/facebook.svg"}
                        alt="facebook"
                        width={40}
                        height={40}
                        className="w-auto h-auto"
                      />
                  </Link>
              </li>
              <li className="mr-5">
                  <Link href="https://twitter.com/biyabot" target="_blank">
                  <Image
                        src={"/icons/twitter.svg"}
                        alt="twitter"
                        width={40}
                        height={40}
                        className="w-auto h-auto"
                      />
                  </Link>
              </li>
              <li className="mr-5">
                  <Link href="https://instagram.com/biyabot/" target="_blank">
                  <Image
                        src={"/icons/instagram.svg"}
                        alt="instagram"
                        width={40}
                        height={40}
                        className="w-auto h-auto"
                      />
                  </Link>
              </li>
            </ul>
          </div>
        </footer>
      {/* Footer End */}
    </div>
  )
}

const FeatureItem = ({title, description, icon, comingSoon = false}: FeatureItemProps) => {
  return (
    <article className="pt-[50px] pb-[46px] px-10 bg-[#F5FAFA] border-2 border-[#2F96D7] rounded-mg w-[350px] relative">
      {comingSoon && <span className="absolute right-10 bg-secondary text-white pt-1 pb-2 px-3 text-[14px] rounded-sm max-lg:right-5">coming soon</span>}
        <Image
          src={`/icons/${icon}.svg`}
          alt="feature icon"
          width={50}
          height={50}
        />
      <h3 className="mt-[86px] mb-4 text-[#2F96D7] text-2xl font-bold max-lg:mt-10 max-lg:mb-4">{title}</h3>
      <p className="text-lg">{description}</p>
    </article>
  )
}
