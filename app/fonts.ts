import { Chau_Philomene_One, Noto_Sans } from "next/font/google"

export const chauPhilomeneOne = Chau_Philomene_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chau-philomene-one",
})

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans",
})
