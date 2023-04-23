import styles from './home.module.scss'
import Head from 'next/head'
import { SubscribeButton } from '@/components/SubscribeButton'
import { GetServerSideProps, GetStaticProps } from 'next'
import { stripe } from '@/services/stripe'

interface HomeProps {
  product: {
    productId: string
    amount: number
  }
}

// CSR client-side chamada a api dentro do component react carregada por acao
// SSR server-side GetServerSideProps faz a chamada usando o server do next
// SSG static site generation GetStaticProps faz a chamada no server e cria um arquivo statico

// POST DO BLOG - SSG
// COMENTARIOS - CSR

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Início | ig.News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span>React</span> world
          </h1>
          <p>
            Get access to all publications <br />
            <span>
              For{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(product.amount)}{' '}
              month
            </span>
          </p>

          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1MzRbnFZ27igKCUJfwHCAvav', {
    expand: ['product'],
  })

  const product = {
    productId: price.id,
    amount: price.unit_amount ? price.unit_amount / 100 : null,
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 horas
  }
}
