import styles from './home.module.scss'
import Head from 'next/head'
import { SubscribeButton } from '@/components/SubscribeButton'
import { GetServerSideProps } from 'next'
import { stripe } from '@/services/stripe'

interface HomeProps {
  product: {
    productId: string
    amount: number
  }
}

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

export const getServerSideProps: GetServerSideProps = async () => {
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
  }
}
