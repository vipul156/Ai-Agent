import { Outfit } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ReactFlowProvider } from "@xyflow/react";
import PreviewProvider from "@/context/PreviewContext";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "ToolChain",
  description: "Create Agents with ToolChain",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <html lang="en">
        <body
          className={`${outfit.className} antialiased`}
        >
          <ReactFlowProvider>
            <PreviewProvider>
              {children}
            </PreviewProvider>
          </ReactFlowProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
