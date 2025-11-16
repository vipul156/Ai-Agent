import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Pricing() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem'}}>
        <h2 className='text-3xl font-bold my-10 text-center'>Pricing Plans</h2>
      <PricingTable />
    </div>
  )
}

export default Pricing
