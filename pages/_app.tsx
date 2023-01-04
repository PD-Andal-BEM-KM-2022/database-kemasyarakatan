import "@core/styles/globals.css";
// import { Montserrat } from '@next/font/google'
import { SessionProvider } from "next-auth/react";

// const font = Montserrat({ subsets: ['latin'] })

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // <main className={font.className}>
      <SessionProvider session={session}>
         <Component {...pageProps} />
      </SessionProvider>
    // </main>
    
  );
}

export default MyApp;
